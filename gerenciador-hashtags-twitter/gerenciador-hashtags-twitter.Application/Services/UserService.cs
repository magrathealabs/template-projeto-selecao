using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.DTOs.Response;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Services
{
    public sealed class UserService :
        IUserService
    {
        private readonly IUserFactory _userFactory;
        private readonly IUserRepository _userRepository;
        public UserService(IUserFactory userFactory, IUserRepository userRepository)
        {
            _userFactory = userFactory;
            _userRepository = userRepository;
        }
        public Task<CreateUserResponseData> Create(CreateUserRequestData requestData)
        {
            throw new System.NotImplementedException();
        }

        public Task<GetAcessTokenResponseData> GetAcessToken(GetAcessTokenRequestData requestData)
        {
            throw new System.NotImplementedException();
        }
    }
}
