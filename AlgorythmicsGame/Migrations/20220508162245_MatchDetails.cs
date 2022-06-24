using Microsoft.EntityFrameworkCore.Migrations;

namespace AlgorythmicsGame.Migrations
{
    public partial class MatchDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "DisplayMode",
                table: "Matches",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "InputType",
                table: "Matches",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SearchTarget",
                table: "Matches",
                maxLength: 3,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TeacherInput",
                table: "Matches",
                maxLength: 30,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayMode",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "InputType",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "SearchTarget",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "TeacherInput",
                table: "Matches");
        }
    }
}
