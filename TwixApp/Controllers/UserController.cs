﻿using Microsoft.AspNetCore.Mvc;

namespace TwixApp.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UserController : ControllerBase
    {
        private readonly PopBaseContext _context;
        public UserController(PopBaseContext context)
        {
            _context = context;
        }

        [HttpGet("{userToken}")]
        public async Task<IActionResult> CheckUserToken(string userToken)
        {
            if (AuthHandler.VerifyToken(userToken, null)) return StatusCode(401, "Unautorised");

            int userId = AuthHandler.GetUserFromToken(userToken);

            User user = await _context.Users.Where(x => x.Id.Equals(userId)).FirstOrDefaultAsync();

            if (user == null) return StatusCode(404, "No user found");

            return Ok();
        }

        [HttpGet("{nameemail}/{password}")]
        public async Task<IActionResult> GetUser(string nameemail, string password)
        {
            User user = new User();

            user = await _context.Users.Include(x => x.Pops).Where(x => x.Email.EndsWith(nameemail) || x.Username.Equals(nameemail)).FirstOrDefaultAsync();

            if(user == null || !PwdHandler.Verify(password, user.Password)) return Unauthorized("Username or Password incorrect");

            if (user.DeletedAt != null) return Ok("Not active account");

            foreach (var x in user.Pops) x.User = null;

            user.Password = AuthHandler.CreateToken(user.Id);

            return Ok(user);
        }

        [HttpPost("{username}/{email}/{password}")]
        public async Task<ObjectResult> RegisterUser(string username, string email, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password)) return StatusCode(400, "All fields Required");
            if (_context.Users.Any(x => x.Email == email)) return StatusCode(409, "Email already used");
            if (_context.Users.Any(x => x.Username == username)) return StatusCode(409, "Username taken");

            User user = new User();

            user.Username = username;
            user.Email = email;
            user.Password = PwdHandler.Hash(password);
            user.CreatedAt = DateTime.Now;

            _context.Users.Add(user);
            _context.SaveChanges();

            return StatusCode(201, "User created");
        }

        [HttpDelete("{userId}/{hard}")]
        public async Task<ObjectResult> SoftDeleteUser(int userId, bool hard)
        {
            User user = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
            
            if (hard)
            {
                _context.Users.Remove(user);
            }
            else
            {
                user.DeletedAt = DateTime.Now;

                _context.Users.Update(user);
            }
            _context.SaveChanges();

            return StatusCode(200, "Deleted");
        }
    }
}
