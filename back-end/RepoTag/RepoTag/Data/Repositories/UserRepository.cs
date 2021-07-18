using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepoTag.Data.Repositories
{
    internal class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepoTagDbContext context): base(context)
        {
        }

        public User GetByEmail(object email)
        {
            return Db.Users.FirstOrDefault(u => u.Email.Equals(email));
        }

        public User GetByEmailAndPassword(string email, string password)
        {
            return Db.Users.FirstOrDefault(u => u.Email.Equals(email) && u.Password.Equals(password));
        }
    }
}
