using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using AlgorythmicsGame.Context;
using Microsoft.AspNetCore.Identity;

namespace AlgorythmicsGame.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
        public string Studies { get; set; }
        public int Grade { get; set; }
        public DateTime DateofBirth { get; set; }
        public string Gender { get; set; }
        public string ITSkills { get; set; }

        [InverseProperty("Player")]
        public virtual GeneralPlayerStatistics Statistics { get; set; }

        public ApplicationUser()
        {

        }
    }
}
