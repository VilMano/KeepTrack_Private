using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Expenses.Migrations
{
    /// <inheritdoc />
    public partial class AddCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Movements",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Food" },
                    { 2, "Car" },
                    { 3, "Clothes" },
                    { 4, "Home" },
                    { 5, "NET" },
                    { 6, "Water supply" },
                    { 7, "Electricity" },
                    { 8, "Other" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Movements_CategoryId",
                table: "Movements",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Movements_Categories_CategoryId",
                table: "Movements",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movements_Categories_CategoryId",
                table: "Movements");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Movements_CategoryId",
                table: "Movements");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Movements");
        }
    }
}
