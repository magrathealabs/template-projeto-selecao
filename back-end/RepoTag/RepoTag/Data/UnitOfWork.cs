using Microsoft.EntityFrameworkCore;
using RepoTag.Data.Repositories;
using RepoTag.Domain;
using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepoTag.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly RepoTagDbContext Db;

        public IUserRepository Users { get; }
        public ITagRepository Tags { get; }

        public UnitOfWork()
        {
            Db = new RepoTagDbContext();

            Users = new UserRepository(Db);
            Tags = new TagRepository(Db);
        }

        public void SaveChanges()
        {
            Db.SaveChanges();
        }

        public void Rollback()
        {
            var changedEntries = Db.ChangeTracker.Entries()
                .Where(x => x.State != EntityState.Unchanged).ToList();

            foreach (var entry in changedEntries)
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                        entry.CurrentValues.SetValues(entry.OriginalValues);
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Unchanged;
                        break;
                }
            }
        }
    }
}
