using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AlgorythmicsGame.Models;
using AlgorythmicsGame.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace AlgorythmicsGame.Controllers
{
    public class HomeController : Controller
    {
        private readonly GameDbContext _context;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public HomeController(GameDbContext context, SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Index()
        {
            List<OrganizedMultiMatch> runningMatches = await _context.MultiPlayerMatches.ToListAsync();

            List<GameBadgesForPlayers> notificationsToShow = null;
            if (_signInManager.IsSignedIn(User))
            {
                string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                notificationsToShow = _context.GameBadgesForPlayers.Include(x=>x.Badge)
                    .Where(x => x.PlayerId == userId && x.UserWasNotified == false).ToList();
                foreach (var notification in notificationsToShow)
                {
                    notification.UserWasNotified = true;
                }
            }
            if (notificationsToShow != null) { 
                ViewData["Notifications"] = notificationsToShow;
                await _context.SaveChangesAsync();
            }

            return View(runningMatches);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
