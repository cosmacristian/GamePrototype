using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using AlgorythmicsGame.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlgorythmicsGame.Models
{
    public class Algorithm
    {
        [Required]
        public int Id { get; set; }
        
        [Required]
        [StringLength(50, ErrorMessage = "The name should be less then 50 characters")]
        public string Name { get; set; }

        [Display(Name = "Algorithm description")]
        [StringLength(1000, ErrorMessage = "The description should be less then 1000 characters")]
        public string Description { get; set; }
        
        [Required]
        [Column("Type", TypeName = "tinyint")]
        public AlgorithmType Type { get; set; }

        [Required]
        public string Icon { get; set; }

        [Required]
        public string Url { get; set; }

        public string AlgorithmPicture { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "The nickname should be less then 50 characters")]
        public string AlgorithmNickname { get; set; }

        public bool IsPublished { get; set; }

        //public List<AlgorithmTranslations> Translations { get; set; }
    }
}
