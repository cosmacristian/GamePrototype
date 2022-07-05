using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AlgorythmicsGame.Context;
using AlgorythmicsGame.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace AlgorythmicsGame.Controllers
{
    [Authorize()]
    public class ProfileController : Controller
    {

        private readonly GameDbContext _context;
        private ApplicationUser _loggedUser;
        private readonly IStringLocalizer _stringLocalizer;

        public ProfileController(GameDbContext context/*,IStringLocalizer<AlgorithmsController> stringLocalizer*/)
        {
            _context = context;
            /*_stringLocalizer = stringLocalizer;*/
        }


        public IActionResult Index()
        {
            var loggedUserId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            _loggedUser = _context.Users.Where(x => x.Id == loggedUserId).FirstOrDefault();


            /*List<CourseProgressByUser> startedCoursesFromDb = _context.CourseProgressByUser
                .Include(c => c.Course).ThenInclude(t=>t.Translations)
                .Include(c => c.Course.LearningSteps).ThenInclude(t => t.Translations)
                .Where(x => x.UserId == loggedUserId && x.Type == Models.Enums.LogEntryType.Step)
                .OrderBy(x => x.LearningStepNumber)
                .ToList();

            List<CourseProgressViewModel> startedCourses = new List<CourseProgressViewModel>();
            string selectedCulture = CultureInfo.CurrentCulture.TwoLetterISOLanguageName;
            foreach (var startedCourse in startedCoursesFromDb)
            {
                bool isNew = false;
                CourseProgressViewModel viewModel;
                if (startedCourses.Where(x => x.Course.Id == startedCourse.Course.Id && x.Date == startedCourse.Date).Any())
                {
                    viewModel = startedCourses.Where(x => x.Course.Id == startedCourse.Course.Id && x.Date == startedCourse.Date).First();
                }
                else
                {
                    viewModel = GetCourseProgressViewModel(startedCourses, new LocalizedCourse(startedCourse.Course, selectedCulture), startedCourse.Date);
                    isNew = true;
                }
                viewModel.LearningStepNumber = startedCourse.LearningStepNumber;
                viewModel.Points += startedCourse.Value;

                viewModel.Progress = (int)Math.Floor((viewModel.LearningStepNumber * 100) / (double)startedCourse.Course.LearningSteps.Count());


                //if (!startedCourses.Where(x => x.Course == viewModel.Course && x.Date == viewModel.Date).Any())
                if (isNew)
                    startedCourses.Add(viewModel);
            }*/

            Profile profile = new Profile()
            {
                User = _loggedUser,
                //StartedCourses = startedCourses
            };
            return View(profile);
        }

        /*private CourseProgressViewModel GetCourseProgressViewModel(List<CourseProgressViewModel> viewModels, LocalizedCourse course, DateTime date)
        {
            var viewModel = viewModels.Where(x => x.Course == course && x.Date == date).FirstOrDefault();
            if (viewModel == null)
            {

                return new CourseProgressViewModel()
                {
                    Course = course,
                    Date = date,
                    Progress = 0
                };
            }
            else
            {
                return viewModel;
            }
        }*/


    }
}