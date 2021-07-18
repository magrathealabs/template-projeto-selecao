using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RepoTag.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "RepoTag");

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "RepoTag",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HostingPlatformUsername = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Repositories",
                schema: "RepoTag",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HostingPlatformRepositoryId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Repositories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Repositories_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "RepoTag",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                schema: "RepoTag",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tags_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "RepoTag",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RepositoryTags",
                schema: "RepoTag",
                columns: table => new
                {
                    RepositoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TagId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepositoryTags", x => new { x.RepositoryId, x.TagId });
                    table.ForeignKey(
                        name: "FK_RepositoryTags_Repositories_RepositoryId",
                        column: x => x.RepositoryId,
                        principalSchema: "RepoTag",
                        principalTable: "Repositories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RepositoryTags_Tags_TagId",
                        column: x => x.TagId,
                        principalSchema: "RepoTag",
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Repositories_UserId",
                schema: "RepoTag",
                table: "Repositories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RepositoryTags_TagId",
                schema: "RepoTag",
                table: "RepositoryTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_UserId",
                schema: "RepoTag",
                table: "Tags",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RepositoryTags",
                schema: "RepoTag");

            migrationBuilder.DropTable(
                name: "Repositories",
                schema: "RepoTag");

            migrationBuilder.DropTable(
                name: "Tags",
                schema: "RepoTag");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "RepoTag");
        }
    }
}
