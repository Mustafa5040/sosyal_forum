using System.ComponentModel.DataAnnotations;

namespace atu_sosyal.Models
{
    public class Etkinlik
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Etkinlik başlığı zorunludur.")]
        [Display(Name = "Etkinlik Adı")]
        public string Baslik { get; set; } = string.Empty;

        [Required(ErrorMessage = "Konum bilgisi girilmelidir.")]
        public string Konum { get; set; } = string.Empty;

        [Required(ErrorMessage = "Tarih seçiniz.")]
        public DateTime Tarih { get; set; } = DateTime.Now;

        [Range(5, 100, ErrorMessage = "Kontenjan 5 ile 100 kişi arasında olmalıdır.")]
        public int Kontenjan { get; set; }
    }
}