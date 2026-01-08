using atu_sosyal.Data;
using atu_sosyal.Models;
using atu_sosyal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace atu_sosyal.Controllers
{
    public class TopicController : Controller
    {
        private readonly AppDbContext _context;

        public TopicController(AppDbContext context)
        {
            _context = context;
        }

        private string GetCurrentUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {    
                return null;
         
            }
            return userId;
        }

        [HttpGet("{topicId:int}")] 
        public async Task<IActionResult> Topic(int topicId)
        {
            
            var topic = await _context.Topics             
                .Include(t => t.Comments)                     
                .FirstOrDefaultAsync(t => t.topicId == topicId);

            if (topic == null)
                return NotFound();
            var topicAuthor = _context.Users.FirstOrDefault(u => u.userId == topic.authorId);
            var viewModel = new TopicViewModel
            {
                topicId = topic.topicId,
                Title = topic.Title,
                Content = topic.Content,
                Category = topic.Category,
                CreatedDate = topic.CreatedDate,
                user = _context.Users.FirstOrDefault(u => u.userId == topic.authorId),
                Comments = topic.Comments
                    .OrderBy(c => c.CreatedDate)
                    .Select(c => new RecentCommentViewModel
                    {
                        Content = c.Content,
                        TopicId = topic.topicId,
                        authorId = c.UserId,
                        CreatedDate = c.CreatedDate,
                        AuthorUsername = _context.Users.FirstOrDefault(u => u.userId == c.UserId).Username,
                    })
                    .ToList()
            };
            
            ViewBag.TopicId = topicId; 
            return View(viewModel);
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddComment(string content, int topicId)
        {
            if (!string.IsNullOrWhiteSpace(content))
            {
                var currentUserId = GetCurrentUserId();

                if (currentUserId != null)
                {
                    var comment = new Comment
                    {
                        Content = content,
                        TopicId = topicId,
                        UserId = int.Parse(currentUserId),
                        CreatedDate = DateTime.Now
                    };

                    _context.Comments.Add(comment);
                    await _context.SaveChangesAsync();
                }
            }
            return RedirectToAction("Topic", new { topicId = topicId });
        }

        

[HttpPost]
[Authorize]
public async Task<IActionResult> CreateTopic(Topic topic)
        {
            var currentUserId = GetCurrentUserId();

            if (string.IsNullOrEmpty(currentUserId))
            {
                return Content("Hata: Kullanıcı ID'si alınamadı. Oturum açılmamış olabilir.");
            }

            topic.authorId = int.Parse(currentUserId);
            topic.CreatedDate = DateTime.Now;

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return Content("Doğrulama Hatası: " + string.Join(", ", errors));
            }

            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> EditTopic(int topicId)
        {
            var topic = await _context.Topics.FindAsync(topicId);
            var currentUserId = GetCurrentUserId();

            if (topic != null && currentUserId != null && topic.authorId.ToString() == currentUserId)
            {
                return View(topic);
            }

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Edit(Topic topic)
        {
            var existingTopic = await _context.Topics.FindAsync(topic.topicId);
            var currentUserId = GetCurrentUserId();

            if (existingTopic != null && currentUserId != null && existingTopic.authorId.ToString() == currentUserId)
            {
                existingTopic.Title = topic.Title;
                existingTopic.Category = topic.Category;
                existingTopic.Content = topic.Content;

                await _context.SaveChangesAsync();
                return RedirectToAction("Topic", new { topicId = topic.topicId });
            }

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var topic = await _context.Topics.FindAsync(id);
            var currentUserId = GetCurrentUserId();

            if (topic != null && currentUserId != null && topic.authorId.ToString() == currentUserId)
            {
                _context.Topics.Remove(topic);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public async Task<IActionResult> RecentComments()
        {

            var comments = await _context.Comments
                .Include(c => c.Topic) 
                .Include(c => c.User) 
                .OrderByDescending(c => c.CreatedDate)
                .Take(50)
                .ToListAsync();
           
            var viewModel = comments.Select(c => new RecentCommentViewModel
            {
                Content = c.Content,
                CreatedDate = c.CreatedDate,
                TopicId = c.TopicId,
                TopicTitle = c.Topic?.Title ?? "Silinmiş Konu",
                AuthorUsername = _context.Users.FirstOrDefault(u => u.userId == c.UserId).Username
            }).ToList();

            return View(viewModel);
        }
    }
}