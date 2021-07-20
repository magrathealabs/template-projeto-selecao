using RepoTag.Application.ViewModels;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Application.Interfaces
{
    public interface IUserAppService
    {
        UserReadViewModel Create(UserCreateViewModel userCreateViewModel);
        UserReadViewModel Get(string email, string password);
        UserReadViewModel Get(string userEmail);
    }
}
