using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AlgorythmicsGame.Migrations
{
    public partial class StatisticsCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlayerStatistics",
                columns: table => new
                {
                    PlayerStatisticsId = table.Column<string>(nullable: false),
                    ApplicationUser = table.Column<string>(nullable: true),
                    Points = table.Column<long>(type: "bigint", nullable: false),
                    LastMatchPlayed = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerStatistics", x => x.PlayerStatisticsId);
                    table.ForeignKey(
                        name: "FK_PlayerStatistics_AspNetUsers_ApplicationUser",
                        column: x => x.ApplicationUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlayerStatisticsPerAlgorithms",
                columns: table => new
                {
                    StatisticId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PlayerId = table.Column<string>(nullable: true),
                    AlgorithmId = table.Column<int>(nullable: false),
                    VictoryCount = table.Column<int>(type: "int", nullable: false),
                    LoseCount = table.Column<int>(type: "int", nullable: false),
                    SinglePlayerCount = table.Column<int>(type: "int", nullable: false),
                    LastMatchPlayed = table.Column<DateTime>(type: "date", nullable: false),
                    BestTimeRecord = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerStatisticsPerAlgorithms", x => x.StatisticId);
                    table.ForeignKey(
                        name: "FK_PlayerStatisticsPerAlgorithms_Algorithms_AlgorithmId",
                        column: x => x.AlgorithmId,
                        principalTable: "Algorithms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerStatisticsPerAlgorithms_PlayerStatistics_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "PlayerStatistics",
                        principalColumn: "PlayerStatisticsId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlayerStatistics_ApplicationUser",
                table: "PlayerStatistics",
                column: "ApplicationUser",
                unique: true,
                filter: "[ApplicationUser] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerStatisticsPerAlgorithms_AlgorithmId",
                table: "PlayerStatisticsPerAlgorithms",
                column: "AlgorithmId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerStatisticsPerAlgorithms_PlayerId",
                table: "PlayerStatisticsPerAlgorithms",
                column: "PlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerStatisticsPerAlgorithms");

            migrationBuilder.DropTable(
                name: "PlayerStatistics");
        }
    }
}
