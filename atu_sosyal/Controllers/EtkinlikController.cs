using atu_sosyal.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace atu_sosyal.Controllers
{
    public class EtkinlikController : Controller
    {
        public static List<Etkinlik> etkinlikler = new List<Etkinlik>
        {
            new Etkinlik { Id = 1, Baslik = "Hackathon 2025", Konum = "Müh. Fak. B Blok", Tarih = DateTime.Now.AddDays(5), Kontenjan = 50 },
            new Etkinlik { Id = 2, Baslik = "Linux 101 Eğitimi", Konum = "Online (Discord)", Tarih = DateTime.Now.AddDays(2), Kontenjan = 20 },
            new Etkinlik { Id = 3, Baslik = "Tanışma Kahvaltısı", Konum = "Kampüs Kantin", Tarih = DateTime.Now.AddDays(7), Kontenjan = 100 }
        };

        public IActionResult Index()
        {
            return View(etkinlikler);
        }

        [HttpGet]
        public IActionResult Olustur()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Olustur(Etkinlik yeniEtkinlik)
        {
            if (ModelState.IsValid)
            {
                yeniEtkinlik.Id = etkinlikler.Count + 1;
                etkinlikler.Add(yeniEtkinlik);
                return RedirectToAction("Index");
            }
            return View(yeniEtkinlik);
        }
    }
}