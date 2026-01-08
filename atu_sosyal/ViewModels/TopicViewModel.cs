using atu_sosyal.Models;
using System.ComponentModel.DataAnnotations;

namespace atu_sosyal.ViewModels
{
    public class TopicViewModel
    {

        [Key]
        public int topicId { get; set; }

        [Required(ErrorMessage = "Başlık zorunludur.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Kategori zorunludur.")]
        public string Category { get; set; }

        [Required(ErrorMessage = "İçerik zorunludur.")]
        public string Content { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public User user { get; set; }

        public virtual List<RecentCommentViewModel> Comments { get; set; } = new List<RecentCommentViewModel>();
    }
}
