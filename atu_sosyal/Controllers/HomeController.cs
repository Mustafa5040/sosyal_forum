using atu_sosyal.Data;
using atu_sosyal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace atu_sosyal.Controllers;

using atu_sosyal.ViewModels;

[Authorize]
public class HomeController : Controller
{
    private readonly AppDbContext _context;

    public HomeController(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var viewModels = await _context.Topics
        .OrderByDescending(t => t.CreatedDate)
        .Select(t => new TopicViewModel()
    {
        topicId = t.topicId,
        Title = t.Title,
        Content = t.Content,
        Category = t.Category,
        CreatedDate = t.CreatedDate,
        user = _context.Users.FirstOrDefault(u => u.userId.ToString() == t.authorId.ToString())
    })
    .ToListAsync();

        return View(viewModels);
    }
}