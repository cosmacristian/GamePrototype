using AlgorythmicsGame.Models;
using AlgorythmicsGame.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{

    public class OrganizedMatch
    {
        [Required]
        [Key]
        public int MatchId { get; set; }

        public int AlgorithmId { get; set; }

        [Required]
        [Column("Type", TypeName = "tinyint")]
        public int Status { get; set; }

        [Required]
        [Column("PlayersWaiting", TypeName = "tinyint")]
        public int PlayersWaiting { get; private set; }

        [Required]
        [Column("ArraySize", TypeName = "tinyint")]
        public int ArraySize { get; set; }
        
        [Column("DisplayMode", TypeName = "tinyint")]
        public DisplayMode? Animation { get; set; }

        [Column("InputType", TypeName = "tinyint")]
        public InputType? InputType { get; set; }

        [Display(Name = "Teacher input")]
        [StringLength(30, ErrorMessage = "The input should be less then 30 characters")]
        [RegularExpression("^([0-9]+,)*[0-9]+$|^([0-9]+ )*[0-9]+ *$", ErrorMessage = "The numbers must be separated with comma or space. For Example: '1,2,3,4' or '1 2 3 4'")]
        public string TeacherInput { get; set; }

        [Display(Name = "Teacher input")]
        [StringLength(3, ErrorMessage = "The input should be less then 3 characters")]
        [RegularExpression("(^0$)|(^[-+]?[1-9][0-9]*$)", ErrorMessage = "The number must be an integer!")]
        public string SearchTarget { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "HostPlayerId")]
        [StringLength(50, ErrorMessage = "The name should be less then 50 characters")]
        public string player1 { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "GuestPlayerId")]
        [StringLength(50, ErrorMessage = "The name should be less then 50 characters")]
        public string player2 { get; set; }

        public OrganizedMatch()
        {
            Status = 0;
            PlayersWaiting = 0;
        }

        public OrganizedMatch(string OrganizerPlayerId, int ArraySizeToSort)
        {
            Status = 1;
            player1 = OrganizerPlayerId;
            PlayersWaiting = 1;
            ArraySize = ArraySizeToSort;
        }

        public void joinMatch(string PlayerId)
        {
            if (PlayersWaiting == 0)
            {
                player1 = PlayerId;
                PlayersWaiting += 1;
                Status = 1;
            }
            else
            {
                if (PlayersWaiting == 1)
                {
                    player2 = PlayerId;
                    PlayersWaiting += 1;
                    Status = 2;
                }
                else
                {
                    throw new OperationCanceledException("Player limit reached!");
                }
            }
        }

        public void finishMatch()
        {
            Status = 3;
        }
    }
}
