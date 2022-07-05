using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AlgorythmicsGame.Migrations
{
    public partial class SinglePlayerMatchesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Matches",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "bestTimeRecord",
                table: "Matches",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "bestTimeRecord",
                table: "Matches");
        }
    }
}
