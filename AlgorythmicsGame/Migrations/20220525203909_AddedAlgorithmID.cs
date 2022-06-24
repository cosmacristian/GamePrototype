using Microsoft.EntityFrameworkCore.Migrations;

namespace AlgorythmicsGame.Migrations
{
    public partial class AddedAlgorithmID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AlgorithmId",
                table: "Matches",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlgorithmId",
                table: "Matches");
        }
    }
}
