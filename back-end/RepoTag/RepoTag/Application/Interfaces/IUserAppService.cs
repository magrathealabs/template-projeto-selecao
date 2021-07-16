using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Application.Interfaces
{
    public interface IUserAppService
    {
        User Create(string name, string email, string password, string hostingPlatformUsername);
        User Get(string email, string password);
    }
}
