using Microsoft.AspNetCore.Mvc;
using StudentCRUDEFPSA.Data;
using StudentCRUDEFPSA.Models;

namespace StudentCRUDEFPSA.Controllers
{
    public class StuController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StuController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /Stu
        public IActionResult Index()
        {
            return View();
        }

        // GET: /Stu/GetAll
        [HttpGet]
        public IActionResult GetAll()
        {
            var students = _context.Students.ToList();
            return Json(students);
        }

        // POST: /Stu/Create
        [HttpPost]
        public IActionResult Create([FromBody] Student student)
        {
            if (student == null)
                return BadRequest();

            _context.Students.Add(student);
            _context.SaveChanges();
            return Ok();
        }

        // POST: /Stu/Update
        [HttpPost]
        public IActionResult Update([FromBody] Student student)
        {
            if (student == null)
                return BadRequest();

            _context.Students.Update(student);
            _context.SaveChanges();
            return Ok();
        }

        // GET: /Stu/GetById?id=1
        [HttpGet]
        public IActionResult GetById(int id)
        {
            var student = _context.Students.FirstOrDefault(x => x.Id == id);
            if (student == null)
                return NotFound();

            return Json(student);
        }

        // POST: /Stu/Delete
        [HttpPost]
        public IActionResult Delete(int id)
        {
            var student = _context.Students.Find(id);
            if (student == null)
                return NotFound();

            _context.Students.Remove(student);
            _context.SaveChanges();
            return Ok();
        }
    }
}
