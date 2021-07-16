using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Data.Repositories
{
    internal class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepoTagDbContext context): base(context)
        {
        }

        public User GetByEmailAndPassword(string email, string password)
        {
            throw new NotImplementedException();
        }
    }
}
