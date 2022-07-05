using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AlgorythmicsGame.Context;
using AlgorythmicsGame.Models;
using AlgorythmicsGame.Models.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AlgorythmicsGame.Controllers
{
    public class MatchCreateController : Controller
    {
        private readonly GameDbContext _dataContext;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public MatchCreateController(GameDbContext context, SignInManager<ApplicationUser> signInManager)
        {
            _dataContext = context;
            _signInManager = signInManager;
        }

        public IActionResult Index()
        {
            
            MatchCreationViewModel model = new MatchCreationViewModel();
            
            model.Animation = Models.Enums.DisplayMode.Whitebox;
            model.ArraySize = 4;
            model.InputType = Models.Enums.InputType.RandomInput;
            model.TeacherInput = "";

            model.AvailableAlgorithms = _dataContext.Algorithms.Where(x=>x.IsPublished==true).ToList();

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Index(MatchCreationViewModel model)
        {
            if (ModelState.IsValid)
            {
                OrganizedMatch match;
                if (model.IsSinglePlayer)
                {
                    OrganizedSingleMatch newMatch = new OrganizedSingleMatch();
                    newMatch.AlgorithmId = model.SelectedAlgorithmId.Value;
                    newMatch.Animation = model.Animation;
                    newMatch.ArraySize = model.ArraySize;
                    newMatch.InputType = model.InputType;
                    newMatch.TeacherInput = model.TeacherInput;
                    newMatch.SearchTarget = model.SearchTarget;
                    newMatch.bestTimeRecord = new TimeSpan();
                    if (_signInManager.IsSignedIn(User))
                    {
                        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                        var stats = _dataContext.PlayerStatisticsPerAlgorithms.FirstOrDefault(x => x.AlgorithmId == newMatch.AlgorithmId && x.PlayerId == userId);
                        if(stats != null)
                            newMatch.bestTimeRecord = stats.bestTimeRecord;
                    }
                    var storedMatch = _dataContext.SinglePlayerMatches.Add(newMatch);
                    match = newMatch;
                }
                else
                {
                    OrganizedMultiMatch newMatch = new OrganizedMultiMatch();
                    newMatch.AlgorithmId = model.SelectedAlgorithmId.Value;
                    newMatch.Animation = model.Animation;
                    newMatch.ArraySize = model.ArraySize;
                    newMatch.InputType = model.InputType;
                    newMatch.TeacherInput = model.TeacherInput;
                    newMatch.SearchTarget = model.SearchTarget;
                    var storedMatch = _dataContext.MultiPlayerMatches.Add(newMatch);
                    match = newMatch;
                }
                

                int i = await _dataContext.SaveChangesAsync();
                return RedirectToAction("Index", "Game", new { id = match.MatchId });
            }
            else
            {
                model.AvailableAlgorithms = _dataContext.Algorithms.ToList();

                return View("Index", model);
            }
        }
    }
}