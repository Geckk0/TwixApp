using Microsoft.AspNetCore.Mvc;
using System.Web;

namespace TwixApp.Controllers
{
    [ApiController]
    [Route("/pop")]
    public class PopController : ControllerBase
    {
        private readonly PopBaseContext _context;
        public PopController(PopBaseContext context)
        {
            _context = context;
        }

        [HttpPost("{popName}/{number}/{series}/{imgUrl}/{userId}")]
        public async Task<IActionResult> CreatePop(string popName, int number, string series, string imgUrl, int userId)
        {
            if(string.IsNullOrEmpty(popName) || string.IsNullOrEmpty(series) || string.IsNullOrEmpty(imgUrl)) return StatusCode(400, "All fields Required");
            if (userId == 0) return StatusCode(201, "No user signed in");

            string cleanUrl = HttpUtility.UrlDecode(imgUrl);

            //Get user
            User user = _context.Users.First(x => x.Id == userId);

            //Create new pop
            Pop newPop = new Pop();
            newPop.Name = popName;
            newPop.Number = number;
            newPop.Series = series;
            newPop.ImgUrl = cleanUrl;
            newPop.UserId = user.Id;

            //Connect editions to pop(to be added)

            _context.Pops.Add(newPop);
            _context.SaveChanges();

            return Ok(newPop);
        }
    }
}
