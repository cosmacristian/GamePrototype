using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AlgorythmicsGame.Context;
using AlgorythmicsGame.Models;
using AlgorythmicsGame.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace AlgorythmicsGame.Controllers
{
    public class MatchCreateController : Controller
    {
        private readonly GameDbContext _dataContext;

        public MatchCreateController(GameDbContext context)
        {
            _dataContext = context;
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
                OrganizedMatch newMatch = new OrganizedMatch();
                newMatch.AlgorithmId = model.SelectedAlgorithmId.Value;
                newMatch.Animation = model.Animation;
                newMatch.ArraySize = model.ArraySize;
                newMatch.InputType = model.InputType;
                newMatch.TeacherInput = model.TeacherInput;
                newMatch.SearchTarget = model.SearchTarget;
                var storedMatch = _dataContext.Matches.Add(newMatch);

                int i = await _dataContext.SaveChangesAsync();
                return RedirectToAction("Index", "Game", new { id = newMatch.MatchId });
            }
            else
            {
                model.AvailableAlgorithms = _dataContext.Algorithms.ToList();

                return View("Index", model);
            }
        }
    }
}