using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Users
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public User Create(string name, string email, string password, string hostingPlatformUsername)
        {
            var newUser = new User(name, email, password, hostingPlatformUsername);
            _unitOfWork.Users.Add(newUser);
            return newUser;
        }
    }
}
