using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain
{
    public interface IUnitOfWork
    {
        IUserRepository Users { get; }
        ITagRepository Tags { get; }

        void SaveChanges();
        void Rollback();
    }
}
