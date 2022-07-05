using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AlgorythmicsGame.Migrations
{
    public partial class AchievementsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameBadges",
                columns: table => new
                {
                    BadgeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Description = table.Column<string>(maxLength: 1000, nullable: true),
                    Image = table.Column<string>(nullable: false),
                    Condititon = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameBadges", x => x.BadgeId);
                });

            migrationBuilder.CreateTable(
                name: "GameBadgesForPlayers",
                columns: table => new
                {
                    AchievementId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PlayerId = table.Column<string>(nullable: true),
                    BadgeId = table.Column<int>(nullable: false),
                    ReceivedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameBadgesForPlayers", x => x.AchievementId);
                    table.ForeignKey(
                        name: "FK_GameBadgesForPlayers_GameBadges_BadgeId",
                        column: x => x.BadgeId,
                        principalTable: "GameBadges",
                        principalColumn: "BadgeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameBadgesForPlayers_PlayerStatistics_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "PlayerStatistics",
                        principalColumn: "PlayerStatisticsId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameBadgesForPlayers_BadgeId",
                table: "GameBadgesForPlayers",
                column: "BadgeId");

            migrationBuilder.CreateIndex(
                name: "IX_GameBadgesForPlayers_PlayerId",
                table: "GameBadgesForPlayers",
                column: "PlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameBadgesForPlayers");

            migrationBuilder.DropTable(
                name: "GameBadges");
        }
    }
}
