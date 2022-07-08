using AlgorythmicsGame.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Models.ManageViewModels
{
    public class IndexViewModel
    {
        public ApplicationUser User { get; set; }
        public GeneralPlayerStatistics UserStats { get; set; }
        public List<PlayerStatisticsForAlgorithms> PlayedAlgorithms { get; set; }
        //public List<CourseProgressViewModel> StartedCourses { get; set; }
    }
}
