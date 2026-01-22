using Microsoft.EntityFrameworkCore;
using StudentCRUDEFPSA.Models;

namespace StudentCRUDEFPSA.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        { }


        public DbSet<Student> Students { get; set; }
    }
}
