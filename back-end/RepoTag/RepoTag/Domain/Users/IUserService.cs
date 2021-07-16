using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Users
{
    public interface IUserService
    {
        User Create(string name, string email, string password, string hostingPlatformUsername);
    }
}
