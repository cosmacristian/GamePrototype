using AlgorythmicsGame.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{
    public class GameBadges
    {
        [Key]
        public int BadgeId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "The name should be less then 50 characters")]
        public string Name { get; set; }

        [Display(Name = "Algorithm description")]
        [StringLength(1000, ErrorMessage = "The description should be less then 1000 characters")]
        public string Description { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Condititon { get; set; }
    }
}
