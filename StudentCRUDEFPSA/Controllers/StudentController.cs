using Microsoft.AspNetCore.Mvc;
using StudentCRUDEFPSA.Data;
using StudentCRUDEFPSA.Models;

namespace StudentCRUDEFPSA.Controllers
{
    public class StudentController : Controller
    {
        private readonly ApplicationDbContext _context;


        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }


        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var students = _context.Students.ToList();
            return Json(students);
        }


        [HttpPost]
        public IActionResult Create(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
            return Json(true);
        }


        [HttpPost]
        public IActionResult Update(Student student)
        {
            _context.Students.Update(student);
            _context.SaveChanges();
            return Json(true);
        }


        [HttpGet]
        public IActionResult GetById(int id)
        {
            var student = _context.Students.FirstOrDefault(x => x.Id == id);
            return Json(student);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var student = _context.Students.Find(id);
            _context.Students.Remove(student);
            _context.SaveChanges();
            return Json(true);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            var student = _context.Students.FirstOrDefault(x => x.Id == id);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var student = _context.Students.FirstOrDefault(x => x.Id == id);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        [HttpPost]
        public IActionResult Edit(Student student)
        {
            _context.Students.Update(student);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        
    }
}
