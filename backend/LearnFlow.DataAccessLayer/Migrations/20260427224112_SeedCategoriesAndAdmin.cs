using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LearnFlow.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SeedCategoriesAndAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Icon", "Name" },
                values: new object[,]
                {
                    { 1, "Dezvoltare interfete web", "FE", "Frontend" },
                    { 2, "Dezvoltare server-side", "BE", "Backend" },
                    { 3, "Baze de date si SQL", "DB", "Database" },
                    { 4, "Infrastructura si deployment", "DO", "DevOps" },
                    { 5, "Dezvoltare aplicatii mobile", "MB", "Mobile" },
                    { 6, "Inteligenta artificiala si machine learning", "AI", "AI/ML" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "CreatedAt", "Email", "Name", "PasswordHash", "Role" },
                values: new object[] { 1, "AD", new DateTime(2026, 4, 27, 22, 41, 12, 28, DateTimeKind.Utc).AddTicks(6367), "admin@learnflow.md", "Admin", "$2a$11$KZbMz5Y6KOlPjBDmqZ2q3OGF1HjqXMJZV7E6L5KBfHKLdWvKxyKWe", "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
