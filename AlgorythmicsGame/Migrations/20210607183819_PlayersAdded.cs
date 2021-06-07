using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AlgorythmicsGame.Migrations
{
    public partial class PlayersAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "PlayersWaiting",
                table: "Matches",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "player1",
                table: "Matches",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "player2",
                table: "Matches",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Algorithms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Description = table.Column<string>(maxLength: 1000, nullable: true),
                    Type = table.Column<byte>(type: "tinyint", nullable: false),
                    Icon = table.Column<string>(nullable: false),
                    Url = table.Column<string>(nullable: false),
                    AlgorithmPicture = table.Column<string>(nullable: true),
                    AlgorithmNickname = table.Column<string>(maxLength: 50, nullable: false),
                    IsPublished = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Algorithms", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Algorithms");

            migrationBuilder.DropColumn(
                name: "player1",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "player2",
                table: "Matches");

            migrationBuilder.AlterColumn<int>(
                name: "PlayersWaiting",
                table: "Matches",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint");
        }
    }
}
