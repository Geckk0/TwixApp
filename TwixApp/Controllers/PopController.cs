using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAll(int userId)
        {
            List<Pop> popList = await _context.Pops.Where(x => x.UserId.Equals(userId)).ToListAsync();

            if(popList.Count == 0) return Ok("No pops found");
            
            return Ok(popList);
        }

        //[HttpGet("{userId}/{popSeries}")]
        //public Pop[] GetSeries(int userId, string popSeries)
        //{
        //    Pop[] pops = Pops.Where(x => x.Series.Equals(popSeries)).ToArray();

        //    return pops;
        //}
    }
}
