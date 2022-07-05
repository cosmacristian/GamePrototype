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
            List<OrganizedMatch> runningMatches = await _context.Matches.ToListAsync();

            List<GameBadgesForPlayers> notificationsToShow = null;
            if (_signInManager.IsSignedIn(User)) {
                notificationsToShow = _context.GameBadgesForPlayers.Include(x=>x.Badge)
                    .Where(x => x.UserWasNotified == false).ToList();
            }
            if(notificationsToShow!=null)
                ViewData["Notifications"] = notificationsToShow;

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
