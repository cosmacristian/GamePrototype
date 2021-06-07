using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AlgorythmicsGame.Models;
using AlgorythmicsGame.Context;
using Microsoft.EntityFrameworkCore;

namespace AlgorythmicsGame.Controllers
{
    public class HomeController : Controller
    {
        private readonly GameDbContext _context;
        public HomeController(GameDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            List<OrganizedMatch> runningMatches = await _context.Matches.ToListAsync();
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
