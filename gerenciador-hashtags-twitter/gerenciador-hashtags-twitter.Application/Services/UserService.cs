using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.DTOs.Response;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Application.Properties;
using gerenciador_hashtags_twitter.Domain.Exceptions;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using gerenciador_hashtags_twitter.Securities.Application;
using System;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Services
{
    public sealed class UserService :
        IUserService
    {
        private readonly IUserFactory _userFactory;
        private readonly IUserRepository _userRepository;
        private readonly IHasher _hasher;
        public UserService(
            IHasher hasher,
            IUserFactory userFactory, 
            IUserRepository userRepository)
        {
            _hasher = hasher;
            _userFactory = userFactory;
            _userRepository = userRepository;
        }
        public async Task<CreateUserResponseData> Create(CreateUserRequestData requestData)
        {
            try
            {
                var user = CreateUser(requestData.Username, requestData.Password);

                await ValidateDuplicatedKey(user)
                      .ConfigureAwait(false);

                await _userRepository.Add(user)
                                     .ConfigureAwait(false);

                return CreateUserResponseDataObject(user);
            }
            catch(DomainEntityException domainEx)
            {
                throw new ApplicationInvalidDataException(domainEx.Message);
            }
        }

        private IUser CreateUser(string username, string password)
        {
            var user = _userFactory.Create(username);
            var passwordHashed = _hasher.Hash(password);
            user.SetPasswordHash(passwordHashed);

            return user;
        }

        private async Task ValidateDuplicatedKey(IUser user)
        {
            var userInRepository = await _userRepository.Find(user.Username)
                                                        .ConfigureAwait(false);

            if (userInRepository != null)
                throw new ApplicationDuplicatedDataException(Resources.AlreadyExistsUsersWithThisUsername);
        }

        private CreateUserResponseData CreateUserResponseDataObject(IUser user)
        {
            return new CreateUserResponseData()
            {
                Username = user.Username,
                Id = user.Id
            };
        }
    }
}
