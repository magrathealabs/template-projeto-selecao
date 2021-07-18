using RepoTag.Application.Interfaces;
using RepoTag.Application.ViewModels;
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

        public UserReadViewModel Create(UserCreateViewModel userCreateViewModel)
        {
            if (string.IsNullOrEmpty(userCreateViewModel.Name)) throw new ArgumentException("Nome é obrigatório para criar usuário.", "name");
            if (string.IsNullOrEmpty(userCreateViewModel.Email)) throw new ArgumentException("Email é obrigatório para criar usuário.", "email");
            if (string.IsNullOrEmpty(userCreateViewModel.Password)) throw new ArgumentException("Senha é obrigatória para criar usuário.", "password");
            if (string.IsNullOrEmpty(userCreateViewModel.HostingPlatformUsername)) throw new ArgumentException("Usuário da plataforma de hospedagem é obrigatório para criar usuário.", "hostingPlatformUsername");

            var user = _unitOfWork.Users.GetByEmail(userCreateViewModel.Email);
            if (user != null) throw new ArgumentException("Email indisponível (usuário já existente).");
            
            var userCreated = _userService.Create(userCreateViewModel.Name, userCreateViewModel.Email, userCreateViewModel.Password, userCreateViewModel.HostingPlatformUsername);
            _unitOfWork.SaveChanges();
            return MapUserToViewModels(userCreated);
        }

        public UserReadViewModel Get(string email, string password)
        {
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("Email é obrigatório para pegar o usuário.", "email");
            if (string.IsNullOrEmpty(password)) throw new ArgumentException("Senha é obrigatória para pegar o usuário.", "password");

            var user = _unitOfWork.Users.GetByEmailAndPassword(email, password);
            return MapUserToViewModels(user);
        }

        private UserReadViewModel MapUserToViewModels(User user)
        {
            return new UserReadViewModel()
            {
                Name = user.Name,
                Email = user.Email,
                HostingPlatformUsername = user.HostingPlatformUsername
            };
        }
    }
}
