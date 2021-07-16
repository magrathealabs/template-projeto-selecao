using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Users
{
    public class User : Entity, IAggregateRoot
    {
        public User(string name, string email, string password, string hostingPlatformUsername)
        {
            Name = name;
            Email = email;
            Password = password;
            HostingPlatformUsername = hostingPlatformUsername;
        }

        public string Name { get; set; }
        public string Email { get; set; }
        public string HostingPlatformUsername { get; set; }
        public string Password { get; set; }
    }
}
