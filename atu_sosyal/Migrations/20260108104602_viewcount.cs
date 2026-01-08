using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace atu_sosyal.Migrations
{
    /// <inheritdoc />
    public partial class viewcount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "viewCount",
                table: "Topics",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "viewCount",
                table: "Topics");
        }
    }
}
