using gerenciador_hashtags_twitter.Application.DTOs.Request.Service;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Services;
using gerenciador_hashtags_twitter.Application.Tests.Fixtures;
using Microsoft.Extensions.Configuration;
using System.IO;
using Xunit;

namespace gerenciador_hashtags_twitter.Application.Tests.Services
{
    public sealed class JWTServiceTests
    {
        private readonly Fixture _fixture;
        public JWTServiceTests()
        {
            _fixture = new Fixture();
        }

        [Fact]
        public async void GetAcessTokenSucess()
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            var configuration = new ConfigurationBuilder()
                                .SetBasePath(currentDirectory)
                                .AddJsonFile("jwtconfig.json")
                                .Build();
            var service = new JWTService(
                 configuration,
                _fixture.UserRepository,
                _fixture.Hasher);
            var requestData = new GetAcessTokenRequestData()
            {
                Username = "larissamartins",
                Password = "@123456"
            };

            var response = await service.GetAcessToken(requestData);

            Assert.NotNull(response.Token);
        }

        [Theory]
        [InlineData("larissamartins", "")]
        [InlineData("larissamartins", "098342")]
        [InlineData("", "@123456")]
        [InlineData("john334", "@123456")]
        public async void GetAcessTokenUnauthorized(string user, string password)
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            var configuration = new ConfigurationBuilder()
                                .SetBasePath(currentDirectory)
                                .AddJsonFile("jwtconfig.json")
                                .Build();
            var service = new JWTService(
                            configuration,
                            _fixture.UserRepository,
                            _fixture.Hasher);
            var requestData = new GetAcessTokenRequestData()
            {
                Username = user,
                Password = password
            };

            await Assert.ThrowsAsync<ApplicationUnauthorizedException>(() => service.GetAcessToken(requestData));
        }
    }
}
