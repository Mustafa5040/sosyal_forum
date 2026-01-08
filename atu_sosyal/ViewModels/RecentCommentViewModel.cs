namespace atu_sosyal.ViewModels
{
    public class RecentCommentViewModel
    {
        public string Content { get; set; }  
        public string AuthorUsername { get; set; }
        public DateTime CreatedDate { get; set; }  
        public int TopicId { get; set; }    
        public int authorId { get; set; }
        public string TopicTitle { get; set; }     
    }
}