using atu_sosyal.Models;
using Microsoft.EntityFrameworkCore;

namespace atu_sosyal.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Etkinlik> Events { get; set; }
    }
}