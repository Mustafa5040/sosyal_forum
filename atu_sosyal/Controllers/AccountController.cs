using atu_sosyal.Data;
using atu_sosyal.Models;
using atu_sosyal.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace atu_sosyal.Controllers
{
    public class AccountController : Controller
    {
        private readonly AppDbContext _context;

        public AccountController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register(User model)
        {
            if (ModelState.IsValid)
            {
                var userExists = _context.Users.Any(x => x.Username == model.Username);
                if (userExists)
                {
                    ViewBag.ErrorRegister = "Bu kullanıcı adı zaten alınmış.";
                    return View("Login", model);
                }

                _context.Users.Add(model);
                _context.SaveChanges();

                ViewBag.SuccessRegister = "Kayıt başarılı! Lütfen giriş yapınız.";
                return View("Login");
            }

            return View("Login", model);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> LoginAuth(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username == username && x.Password == password);

            if (user != null)
            {
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim("FullName", user.FullName),
            new Claim(ClaimTypes.NameIdentifier, user.userId.ToString())
        };

                var claimsIdentity = new ClaimsIdentity(claims, "CookieAuth");

                await HttpContext.SignInAsync(
                    "CookieAuth",                          
                    new ClaimsPrincipal(claimsIdentity)
                );

                return RedirectToAction("Index", "Home");
            }

            ViewBag.ErrorLogin = "Kullanıcı adı veya şifre hatalı!";
            return View("Login");
        }
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("CookieAuth");
            return RedirectToAction("Login");
        }
        [HttpGet]
        [Authorize] 
        public IActionResult Profile()
        {
            var username = User.Identity.Name;


            var user = _context.Users.FirstOrDefault(x => x.Username == username);

            if (user == null) return RedirectToAction("Login");

            var model = new UserEditViewModel
            {
                Id = user.userId,
                Username = user.Username,
                FullName = user.FullName,
                Phone = user.Phone
            };

            return View(model);
        }
        [HttpPost]
        [Authorize]
        public IActionResult Profile(UserEditViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }


            var user = _context.Users.FirstOrDefault(x => x.userId == model.Id);

            if (user == null) return RedirectToAction("Login");

            if (user.Username != User.Identity.Name)
            {
                return Forbid();
            }
            if (user.Password != model.CurrentPassword)
            {
                ModelState.AddModelError("CurrentPassword", "Mevcut şifreniz hatalı!");
                return View(model);
            }

            user.FullName = model.FullName;
            user.Phone = model.Phone;
            if (!string.IsNullOrEmpty(model.NewPassword))
            {
                user.Password = model.NewPassword;
            }

            _context.SaveChanges();

            ViewBag.SuccessMessage = "Profiliniz başarıyla güncellendi!";
            return View(model);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> DeleteAccount(int userId)
        {
            var user = _context.Users.FirstOrDefault(x => x.userId == userId);

            if (user != null && user.Username == User.Identity.Name)
            {
              
                var userTopics = _context.Topics.Where(t => t.authorId == user.userId);
                _context.Topics.RemoveRange(userTopics);

                _context.Users.Remove(user);
                _context.SaveChanges();

                await HttpContext.SignOutAsync("CookieAuth");

                return RedirectToAction("Login");
            }

            return RedirectToAction("Profile");
        }
    }
}