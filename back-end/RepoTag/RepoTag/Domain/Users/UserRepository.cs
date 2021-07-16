using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Users
{
    public static class UserRepository
    {
        public static User Get(string email, string password)
        {
            return new User("User test", "email.test@test.net", "Random123", "eusougztest");
        }
    }
}
