using Microsoft.EntityFrameworkCore.Migrations;

namespace AlgorythmicsGame.Migrations
{
    public partial class AddedArraySize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "ArraySize",
                table: "Matches",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArraySize",
                table: "Matches");
        }
    }
}
