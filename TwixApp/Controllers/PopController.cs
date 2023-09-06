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

        [HttpPost("{popName}/{number}/{series}/{rating}/{imgUrl}/{userId}/{userToken}")]
        public async Task<IActionResult> CreatePop(string popName, int number, string series, int rating, int userId, string userToken, string imgUrl)
        {
            if(string.IsNullOrEmpty(popName) || string.IsNullOrEmpty(series) || string.IsNullOrEmpty(imgUrl)) return StatusCode(400, "All fields Required");
            if (userId == 0) return StatusCode(401, "No user signed in");

            if (!AuthHandler.VerifyToken(userToken, userId)) return StatusCode(401, "Bad token");

            string cleanUrl = HttpUtility.UrlDecode(imgUrl);

            //Get user
            User user = _context.Users.First(x => x.Id == userId);

            //Create new pop
            Pop newPop = new Pop();
            newPop.Name = popName;
            newPop.Number = number;
            newPop.Series = series;
            newPop.Rating = rating;
            newPop.ImgUrl = cleanUrl;
            newPop.UserId = user.Id;

            //Connect editions to pop(to be added)

            _context.Pops.Add(newPop);
            _context.SaveChanges();

            newPop.User = null;

            return StatusCode(201, newPop);
        }

        [HttpPut("{popId}/{userId}/{userToken}")]
        public async Task<IActionResult> ArchivePop(int popId, int userId, string userToken)
        {
            if (userId == 0) return StatusCode(401, "No user signed in");

            if (!AuthHandler.VerifyToken(userToken, userId)) return StatusCode(401, "Bad token");

            Pop pop = _context.Pops.Where(x => x.Id == popId && x.UserId == userId).FirstOrDefault();

            if (pop == null) return StatusCode(404, "No pop found");

            if (pop.DeletedAt == null) pop.DeletedAt = DateTime.Now;
            else pop.DeletedAt = null;

            _context.Pops.Update(pop);
            _context.SaveChanges();

            return StatusCode(200, "Pop updated");
        }

        [HttpDelete("{popId}/{userId}/{userToken}")]
        public async Task<IActionResult> DeletePop(int popId, int userId, string userToken)
        {
            if (userId == 0) return StatusCode(401, "No user signed in");

            if (!AuthHandler.VerifyToken(userToken, userId)) return StatusCode(401, "Bad token");

            Pop pop = _context.Pops.Where(x => x.Id == popId && x.UserId == userId).FirstOrDefault();
            
            if (pop == null) return StatusCode(404, "No pop found");

            _context.Pops.Remove(pop);
            _context.SaveChanges();

            return StatusCode(410, "Pop removed");
        }
    }
}
