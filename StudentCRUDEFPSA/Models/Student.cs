using System.ComponentModel.DataAnnotations;

namespace StudentCRUDEFPSA.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }


        [Required]
        public string Name { get; set; }


        public int Age { get; set; }


        public string Course { get; set; }
    }
}
