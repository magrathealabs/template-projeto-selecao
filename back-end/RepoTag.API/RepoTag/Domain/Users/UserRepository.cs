using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Users
{
    public static class UserRepository
    {
        public static User Get(string email, string password)
        {
            return new User()
            {
                Name = "User test",
                Email = "email.test@test.net",
                Password = "Random123",
                HostingPlatformUsername = "eusougztest"
            };
        }
    }
}
