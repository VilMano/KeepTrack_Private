using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Expenses.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIdOnUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movements_AspNetUsers_UserId",
                table: "Movements");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Movements",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_Movements_AspNetUsers_UserId",
                table: "Movements",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movements_AspNetUsers_UserId",
                table: "Movements");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Movements",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Movements_AspNetUsers_UserId",
                table: "Movements",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
