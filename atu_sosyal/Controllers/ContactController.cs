using Microsoft.AspNetCore.Mvc;

namespace atu_sosyal.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Contact()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Contact(string name, string email, string message)
        {
            if (string.IsNullOrWhiteSpace(name) ||
                string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(message))
            {
                ViewBag.Error = "Tüm alanları doldurunuz!";
                return View();
            }

            Console.WriteLine("=== YENİ İLETİŞİM MESAJI ===");
            Console.WriteLine($"Ad: {name}");
            Console.WriteLine($"E-posta: {email}");
            Console.WriteLine($"Mesaj: {message}");
            Console.WriteLine("================================");
            if(name == "atu")
            {
                ViewBag.Success = "Mesajın alındı, " + name +  ". En kısa sürede tarafınızla iletişime geçilecektir. YAŞASIN ATÜ";
            }
            else
            {
                ViewBag.Success = "Mesajın alındı, " + name + ". En kısa sürede tarafınızla iletişime geçilecektir.";
            }
                

            ModelState.Clear();
            return View();
        }
    }
}
