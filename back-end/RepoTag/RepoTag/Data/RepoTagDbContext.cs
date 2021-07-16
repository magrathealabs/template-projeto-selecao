using Microsoft.EntityFrameworkCore;
using RepoTag.Data.Mappings;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace RepoTag.Data
{
    public class RepoTagDbContext : DbContext
    {
        private static string _connectionString;

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
