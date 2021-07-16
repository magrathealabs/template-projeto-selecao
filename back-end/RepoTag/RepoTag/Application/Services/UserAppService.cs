using RepoTag.Application.Interfaces;
using RepoTag.Domain;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Application.Services
{
    public class UserAppService : IUserAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;

        public UserAppService(IUnitOfWork unitOfWork, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
        }

        public User Create(string name, string email, string password, string hostingPlatformUsername)
        {
            if (string.IsNullOrEmpty(name)) throw new ArgumentException("Nome é obrigatório para criar usuário.", "name");
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("Email é obrigatório para criar usuário.", "email");
            if (string.IsNullOrEmpty(password)) throw new ArgumentException("Senha é obrigatória para criar usuário.", "password");
            if (string.IsNullOrEmpty(hostingPlatformUsername)) throw new ArgumentException("Usuário da plataforma de hospedagem é obrigatório para criar usuário.", "hostingPlatformUsername");

            var userCreated = _userService.Create(name, email, password, hostingPlatformUsername);
            _unitOfWork.SaveChanges();
            return userCreated;
        }

        public User Get(string email, string password)
        {
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("Email é obrigatório para pegar o usuário.", "email");
            if (string.IsNullOrEmpty(password)) throw new ArgumentException("Senha é obrigatória para pegar o usuário.", "password");

            var user = _unitOfWork.Users.GetByEmailAndPassword(email, password);
            return user;
        }
    }
}
