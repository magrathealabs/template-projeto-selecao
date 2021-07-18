using Microsoft.EntityFrameworkCore;
using RepoTag.Data.Mappings;
using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace RepoTag.Data
{
    public class RepoTagDbContext : DbContext
    {
        private static string _connectionString;

        public DbSet<User> Users { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Repository> Repositories { get; set; }
        public DbSet<RepositoryTag> RepositoryTags { get; set; }

        public RepoTagDbContext()
        {
            Database.SetCommandTimeout((int)TimeSpan.FromMinutes(5).TotalSeconds);
            //Database.Migrate();
        }

        public RepoTagDbContext([NotNull] DbContextOptions options) : base(options)
        {
        }

        public static void SetConnectionString(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connectionString, x => x.MigrationsHistoryTable("__EFMigrationsHistory", "RepoTag"));
            }

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("RepoTag");
            //modelBuilder.Ignore<Event>();

            //foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            //{
            //    relationship.DeleteBehavior = DeleteBehavior.Restrict;
            //}

            modelBuilder.ApplyConfiguration(new UserMapping());
            modelBuilder.ApplyConfiguration(new TagMapping());
            modelBuilder.ApplyConfiguration(new RepositoryMapping());
            modelBuilder.ApplyConfiguration(new RepositoryTagMapping());
        }
    }
}
