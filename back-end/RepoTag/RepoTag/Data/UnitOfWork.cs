using RepoTag.Domain;
using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        public IUserRepository Users { get; }
        public ITagRepository Tags { get; }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void Rollback()
        {
            throw new NotImplementedException();
        }
    }
}
