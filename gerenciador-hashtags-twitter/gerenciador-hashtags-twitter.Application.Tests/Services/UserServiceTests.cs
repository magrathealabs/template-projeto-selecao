using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Services;
using gerenciador_hashtags_twitter.Application.Tests.Fixtures;
using System;
using Xunit;

namespace gerenciador_hashtags_twitter.Application.Tests.Services
{
    public sealed class UserServiceTests
    {
        private readonly Fixture _fixture;
        private readonly UserService _userService;

        public UserServiceTests()
        {
            _fixture = new Fixture();
            _userService = new UserService(_fixture.Hasher, _fixture.UserFactory, _fixture.UserRepository);
        }

        #region Create User
        [Fact]
        public async void CreateUserSucess()
        {
            var requestData = new CreateUserRequestData()
            {
                Username = "Alyson09",
                Password = "@123456"
            };

            var createdUser = await _userService.Create(requestData);

            var createdWithValidId = !Guid.Empty.Equals(createdUser.Id);
            Assert.Equal(requestData.Username, createdUser.Username);
            Assert.True(createdWithValidId);
        }

        [Fact]
        public async void CreateDuplicatedException()
        {
            var requestData = new CreateUserRequestData()
            {
                Username = "larissamartins",
                Password = "@123456"
            };

            await Assert.ThrowsAsync<ApplicationDuplicatedDataException>(() => _userService.Create(requestData));
        }

        [Theory]
        [InlineData("", "@123456")]
        [InlineData("John689", "")]
        public async void CreateInvalidData(string username, string password)
        {
            var requestData = new CreateUserRequestData()
            {
                Username = username,
                Password = password
            };

            await Assert.ThrowsAsync<ApplicationInvalidDataException>(() => _userService.Create(requestData));
        }
        #endregion

    }
}
