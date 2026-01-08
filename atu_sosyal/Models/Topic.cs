using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace atu_sosyal.Models
{
    public class Topic
    {
        [Key]
        public int topicId { get; set; }

        [Required(ErrorMessage = "Başlık zorunludur.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Kategori zorunludur.")]
        public string Category { get; set; }

        [Required(ErrorMessage = "İçerik zorunludur.")]
        public string Content { get; set; }

        [ValidateNever]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [ValidateNever]
        public int authorId { get; set; }


        [ValidateNever] 
        public virtual List<Comment> Comments { get; set; } = new List<Comment>();
    }
}