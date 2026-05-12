using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearnFlow.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserProgress_UserId",
                table: "UserProgress");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 27, 22, 53, 37, 91, DateTimeKind.Utc).AddTicks(2191));

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProgress_UserId_LessonId",
                table: "UserProgress",
                columns: new[] { "UserId", "LessonId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CreatedAt",
                table: "Notifications",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_Name",
                table: "Categories",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_UserProgress_UserId_LessonId",
                table: "UserProgress");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_CreatedAt",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Categories_Name",
                table: "Categories");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 27, 22, 41, 12, 28, DateTimeKind.Utc).AddTicks(6367));

            migrationBuilder.CreateIndex(
                name: "IX_UserProgress_UserId",
                table: "UserProgress",
                column: "UserId");
        }
    }
}
