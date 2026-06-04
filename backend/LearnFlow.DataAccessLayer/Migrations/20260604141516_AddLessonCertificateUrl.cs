using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearnFlow.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddLessonCertificateUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CertificateUrl",
                table: "Lessons",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 6, 4, 14, 15, 16, 161, DateTimeKind.Utc).AddTicks(4392));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CertificateUrl",
                table: "Lessons");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 6, 4, 14, 2, 7, 973, DateTimeKind.Utc).AddTicks(3204));
        }
    }
}
