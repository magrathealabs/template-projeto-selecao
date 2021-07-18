using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Users
{
    public interface IUserRepository : IRepository<User>
    {
        User GetByEmailAndPassword(string email, string password);
        User GetByEmail(object email);
    }
}
