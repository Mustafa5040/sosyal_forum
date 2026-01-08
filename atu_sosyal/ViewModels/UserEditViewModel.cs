using System.ComponentModel.DataAnnotations;

namespace atu_sosyal.ViewModels
{
    public class UserEditViewModel
    {
        public int Id { get; set; }

        [Display(Name = "Kullanıcı Adı")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Ad Soyad zorunludur.")]
        [Display(Name = "Ad Soyad")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Telefon numarası zorunludur.")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Sadece rakam giriniz.")]
        [Display(Name = "Telefon")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Mevcut şifrenizi girmeniz gerekmektedir.")]
        [Display(Name = "Mevcut Şifre")]
        public string CurrentPassword { get; set; }

        [Display(Name = "Yeni Şifre (İsteğe Bağlı)")]
        [MinLength(8, ErrorMessage = "Şifre en az 8 karakter olmalıdır.")]
        public string? NewPassword { get; set; }
    }
}