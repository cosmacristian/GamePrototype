using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Models.AccountViewModels
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Studies { get; set; }

        [Required]
        public int Grade { get; set; }

        [Required]
        [Display(Name = "Date of Birth")] 
        public DateTime DateofBirth { get; set; }

        [Required]
        public string Gender { get; set; }

        [Display(Name = "IT Skills")]
        public string ITSkills { get; set; }
    }
}
