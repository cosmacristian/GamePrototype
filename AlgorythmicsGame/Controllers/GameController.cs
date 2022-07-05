using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AlgorythmicsGame.Context;
using AlgorythmicsGame.Models;
using AlgorythmicsGame.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace AlgorythmicsGame.Controllers
{
    public class GameController : Controller
    {
        private readonly GameDbContext _context;

        public GameController(GameDbContext context)
        {
            _context = context;
        }

        // GET: Algorithms
        /*
        public async Task<IActionResult> Index(AlgorithmType? filter)
        {
            var model = new CardGroupListViewModel
            {
                Groups = new List<CardGroupViewModel>()
            };

            model.Description = new HtmlString(@"" + _stringLocalizer["algorithms_desc"]);

            if (filter.HasValue)
            {
                var algorithms = await _context.Algorithms.Include(a => a.Translations).Where(a => a.Type == filter.Value && a.IsPublished).ToListAsync();

                var group = new CardGroupViewModel
                {
                    Items = CreateCardsFromAlgorithms(algorithms)
                    // Description = TODO: get the description from Resources
                    // Title - not set in this case
                };

                switch (filter)
                {
                    case AlgorithmType.Sorting:
                        ViewBag.Title = model.Title = _stringLocalizer["algorithms_sorting"];
                        group.Description = new HtmlString(_stringLocalizer["algorithms_sorting_filter_description"]);
                        break;
                    case AlgorithmType.Searching:
                        ViewBag.Title = model.Title = _stringLocalizer["algorithms_search"];
                        group.Description = new HtmlString(_stringLocalizer["algorithms_search_filter_description"]);
                        break;
                    case AlgorithmType.Searching_Backtracking:
                        ViewBag.Title = model.Title = _stringLocalizer["algorithms_backtracking"];
                        group.Description = new HtmlString(_stringLocalizer["algorithms_backtracking_filter_description"]);
                        break;
                }

                model.Groups.Add(group);
            }
            else
            {
                // add three different groups:
                var algorithms = await _context.Algorithms.Include(a => a.Translations).Where(a => a.IsPublished).ToListAsync();

                ViewBag.Title = model.Title = _stringLocalizer["AlgorithmsTitle"];

                model.Groups.Add(new CardGroupViewModel
                {
                    Items = CreateCardsFromAlgorithms(algorithms.Where(a => a.Type == AlgorithmType.Searching)),
                    Description = new HtmlString(_stringLocalizer["algorithms_search_filter_description"]),
                    Title = _stringLocalizer["algorithms_search"]
                });
                model.Groups.Add(new CardGroupViewModel
                {
                    Items = CreateCardsFromAlgorithms(algorithms.Where(a => a.Type == AlgorithmType.Sorting)),
                    Description = new HtmlString(_stringLocalizer["algorithms_sorting_filter_description"]),
                    Title = _stringLocalizer["algorithms_sorting"]
                });
                model.Groups.Add(new CardGroupViewModel
                {
                    Items = CreateCardsFromAlgorithms(algorithms.Where(a => a.Type == AlgorithmType.Searching_Backtracking)),
                    Description = new HtmlString(_stringLocalizer["algorithms_backtracking_filter_description"]),
                    Title = _stringLocalizer["algorithms_backtracking"]
                });

            }
            return View("CardGroupList", model);
        }*/


        // GET: Algorithms/Details/5
        public async Task<IActionResult> Index(int? id)
        {
            OrganizedMatch matchModel = null;
            if (id != null)
            {
                matchModel = await _context.Matches.SingleOrDefaultAsync(m => m.MatchId == id);
            }
            else
            {
                return NotFound();
            }

            var algorithmsModel = await _context.Algorithms.SingleOrDefaultAsync(m => m.Id == matchModel.AlgorithmId);


            if (algorithmsModel == null)
            {
                return NotFound();
            }

            ViewData["EditMode"] = true;
            ViewData["AuhtenticatedUserID"] = User.FindFirstValue(ClaimTypes.NameIdentifier);
            AlgorithmViewModel model = CreateAlgorithmViewModel(algorithmsModel, matchModel);

            return View(model);
        }

        private AlgorithmViewModel CreateAlgorithmViewModel(Algorithm algorithmsModel, OrganizedMatch matchModel)
        {
            var partialViewName = "";
            var learningStepScriptName = "";
            var algorithmScriptName = "";
            if (algorithmsModel.Type.Equals(AlgorithmType.Searching_Backtracking))
            {
                algorithmScriptName = "../backtracking/" + algorithmsModel.AlgorithmNickname + ".js";
            }
            else if (algorithmsModel.Type.Equals(AlgorithmType.Sorting))
            {
                algorithmScriptName = "../sorting/" + algorithmsModel.AlgorithmNickname + ".js";
            }
            else
            {
                algorithmScriptName = "../searching/" + algorithmsModel.AlgorithmNickname + ".js";
            }

            var algorithmPartialName = "../AlgorithmCodes/_" + algorithmsModel.AlgorithmNickname + "Partial.cshtml";

            partialViewName = "~/Views/Game/_CoordinatingPartial.cshtml";
            learningStepScriptName = "inControl.js";

            AlgorithmViewModel model = new AlgorithmViewModel()
            {
                Algorithm = algorithmsModel,
                AnimationModel = new AnimationViewModel()
                {
                    Algorithm = algorithmsModel,
                    PartialViewName = partialViewName,
                    AlgorithmPartialView = algorithmPartialName,
                    Animation = matchModel.Animation,
                    InputType = matchModel.InputType,
                    TeacherInput = matchModel.TeacherInput,
                    SearchTarget = matchModel.SearchTarget
                },
                AlgorithmScriptName = algorithmScriptName,
                LearningStepScriptName = learningStepScriptName,
                PartialViewName = partialViewName,
                ArraySize = matchModel.ArraySize,
                MatchId = matchModel.MatchId
            };
            return model;
        }

        private void AddCookiesToAnimationModel()
        {
            string strUserId = Request.Cookies["PlayerID"];
            if (string.IsNullOrEmpty(strUserId))
            {
                strUserId = Guid.NewGuid().ToString();
            }

            Response.Cookies.Append("PlayerID", JsonConvert.SerializeObject(strUserId));
        }

        /*
        [Route("Algorithms/Details/{algorithmId}/{learningStepNumber}/hints/{hintNumber}")]
        [HttpPost]
        public async Task<IActionResult> ClickedHint(int algorithmId, int learningStepNumber, int hintNumber)
        {
            Algorithm algorithm = await _context.Algorithms.FindAsync(algorithmId);
            Course course = await _context.Courses.SingleOrDefaultAsync(c => c.Algorithm.Id == algorithmId && c.IsDefault == true);

            InsertHintOrError("anonymus", course, learningStepNumber, Algorythmics.Models.Enums.LogEntryType.Hint, hintNumber, 0);

            await _context.SaveChangesAsync();

            return Json(new
            {
                success = true,
                msg = "Course progress has been updated: new hint click."
            });
        }

        [Route("Algorithms/Details/{algorithmId}/{learningStepNumber}/errors/{seriosity}/{errorNumber}")]
        [HttpPost]
        public async Task<IActionResult> ErrorDuringCourse(int algorithmId, int learningStepNumber, int seriosity, int errorNumber)
        {

            Algorithm algorithm = await _context.Algorithms.FindAsync(algorithmId);
            Course course = await _context.Courses.SingleOrDefaultAsync(c => c.Algorithm.Id == algorithmId && c.IsDefault == true);

            InsertHintOrError("anonymus", course, learningStepNumber, Algorythmics.Models.Enums.LogEntryType.Error, errorNumber, seriosity);

            await _context.SaveChangesAsync();

            return Json(new
            {
                success = true,
                msg = "Course progress has been updated: new error occured."
            });
        }

        private void InsertHintOrError(String loggedUser, Course course, int learningStepNumber, Algorythmics.Models.Enums.LogEntryType type, int orderNumber, int seriosity)
        {
            if (!_context.CourseProgressByUser.Where(x => x.UserId == loggedUser && x.Course == course && x.LearningStepNumber == learningStepNumber && x.Type == type && x.OrderNumber == orderNumber).Any())
            {

                var value = 0;
                if (type == Algorythmics.Models.Enums.LogEntryType.Hint)
                {
                    value = (int)Algorythmics.Models.Enums.Points.Hint;
                }
                else
                {
                    if (seriosity == 1)
                    {
                        value = (int)Algorythmics.Models.Enums.Points.Error;

                    }
                    else
                    {
                        value = (int)Algorythmics.Models.Enums.Points.SmallError;
                    }
                }
                _context.CourseProgressByUser.Add(new CourseProgressByUser()
                {
                    Course = course,
                    LearningStepNumber = learningStepNumber,
                    Date = DateTime.UtcNow.Date,
                    Type = type,
                    UserId = loggedUser,
                    Value = value,
                    OrderNumber = orderNumber,
                    Count = 1
                });
            }
            else
            {
                var courseProgressByUser = _context.CourseProgressByUser.Where(x => x.UserId == loggedUser && x.Course == course && x.LearningStepNumber == learningStepNumber && x.Type == type && x.OrderNumber == orderNumber).FirstOrDefault();
                courseProgressByUser.Count++;

            }

            _context.SaveChanges();
        }

        private List<CardViewModel> CreateCardsFromAlgorithms(IEnumerable<Algorithm> algorithms)
        {
            var actionName = nameof(Details);
            string selectedCulture = CultureInfo.CurrentCulture.TwoLetterISOLanguageName;
            return algorithms.Select(a => new CardViewModel
            {
                Image = a.AlgorithmPicture,
                Title = a.Translations.Where(t => t.CultureCode == selectedCulture).FirstOrDefault().Name,
                Description = new HtmlString(a.Translations.Where(t => t.CultureCode == selectedCulture).FirstOrDefault().Description.Abbreviate(150)),
                AlgorithPicture = a.AlgorithmPicture,
                Link = Url.Action(actionName, new { id = a.Id })
            }).ToList();
        }*/
    }
}