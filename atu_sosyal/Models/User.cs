using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace atu_sosyal.Models
{
    public class User
    {
        [Key]
        public int userId { get; set; }

        [Required(ErrorMessage = "Ad Soyad zorunludur.")]
        public required string FullName { get; set; }

        [Required(ErrorMessage = "Kullanıcı adı zorunludur.")]
        [MinLength(3, ErrorMessage = "Kullanıcı adı en az 3 karakter olmalı.")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Telefon numarası zorunludur.")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Telefon sadece rakamlardan oluşmalıdır.")]
        public required string Phone { get; set; }

        [Required(ErrorMessage = "Şifre zorunludur.")]
        [MinLength(8, ErrorMessage = "Şifre en az 8 karakter olmalıdır.")]
        public required string Password { get; set; }
    }
}