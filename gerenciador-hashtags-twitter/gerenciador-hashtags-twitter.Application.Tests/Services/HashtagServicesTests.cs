using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Services;
using gerenciador_hashtags_twitter.Application.Tests.Fixtures;
using System;
using System.Linq;
using Xunit;

namespace gerenciador_hashtags_twitter.Application.Tests.Services
{
    public sealed class HashtagServicesTests
    {
        private readonly Fixture _fixture;
        public HashtagServicesTests()
        {
            _fixture = new Fixture();
        }

        #region Add
        [Theory]
        [InlineData("Pets")]
        [InlineData("ContinuousIntegration")]
        public async void SucessAdd(string name)
        {
            var service = new HashtagService(
                _fixture.SecurityServiceWithJohnAuthenticated,
                _fixture.HashtagRepository,
                _fixture.HashtagFactory);
            var requestData = new AddHashtagRequestData()
            {
                Content = name
            };
            var expectedValue = $"#{name}";

            var newHashtag = await service.Add(requestData);

            var createdWithValidId = !Guid.Empty.Equals(newHashtag.Id);
            Assert.Equal(expectedValue, newHashtag.Content);
            Assert.True(createdWithValidId);
        }

        [Fact]
        public async void AddDuplicatedIndex()
        {
            var service = new HashtagService(
                _fixture.SecurityServiceWithLarissaAuthenticated,
                _fixture.HashtagRepository,
                _fixture.HashtagFactory);
            var requestData = new AddHashtagRequestData()
            {
                Content = "Pets"
            };

            await Assert.ThrowsAsync<ApplicationDuplicatedDataException>(() => service.Add(requestData));
        }

        [Fact]
        public async void AddUnauthorized()
        {
            var service = new HashtagService(
                _fixture.SecurityServiceAnonimous,
                _fixture.HashtagRepository,
                _fixture.HashtagFactory);
            var requestData = new AddHashtagRequestData()
            {
                Content = "Pets"
            };

            await Assert.ThrowsAsync<ApplicationUnauthorizedException>(() => service.Add(requestData));
        }
        #endregion

        #region Remove
        [Fact]
        public async void RemoveSucess()
        {
            var service = new HashtagService(
                _fixture.SecurityServiceWithJohnAuthenticated,
                _fixture.HashtagRepository,
                _fixture.HashtagFactory);
            var requestData = new RemoveHashtagRequestData()
            {
                Id = _fixture.HashtagDevelopment.Id
            };

            await service.Remove(requestData);
        }

        [Fact]
        public async void RemovePermissionDenied()
        {
            var service = new HashtagService(
                 _fixture.SecurityServiceWithLarissaAuthenticated,
                 _fixture.HashtagRepository,
                 _fixture.HashtagFactory);
            var requestData = new RemoveHashtagRequestData()
            {
                Id = _fixture.HashtagDevelopment.Id
            };

            await Assert.ThrowsAsync<ApplicationPermissionDeniedException>(() => service.Remove(requestData));
        }

        [Fact]
        public async void RemoveNotFound()
        {
            var service = new HashtagService(
                            _fixture.SecurityServiceAnonimous,
                            _fixture.HashtagRepository,
                            _fixture.HashtagFactory);
            var requestData = new RemoveHashtagRequestData()
            {
                Id = Guid.NewGuid()
            };

            await Assert.ThrowsAsync<ApplicationNotFoundException>(() => service.Remove(requestData));
        }

        [Fact]
        public async void RemoveUnauthorized()
        {
            var service = new HashtagService(
                            _fixture.SecurityServiceAnonimous,
                            _fixture.HashtagRepository,
                            _fixture.HashtagFactory);
            var requestData = new RemoveHashtagRequestData()
            {
                Id = _fixture.HashtagDevelopment.Id
            };

            await Assert.ThrowsAsync<ApplicationUnauthorizedException>(() =>service.Remove(requestData));
        }

        #endregion

        #region Get
        [Fact]
        public async void GetSucess()
        {
            var service = new HashtagService(
                            _fixture.SecurityServiceWithJohnAuthenticated,
                            _fixture.HashtagRepository,
                            _fixture.HashtagFactory);

            var hashtags = await service.Get();

            var containsOtherUsersHashtags = hashtags.Hashtags
                                            .Any(h => h.Id.Equals(_fixture.HashtagPets.Id));
            Assert.NotNull(hashtags);
            Assert.False(containsOtherUsersHashtags);
        }

        [Fact]
        public async void GetUnauthorizedUserAnonimous()
        {
            var service = new HashtagService(
                            _fixture.SecurityServiceAnonimous,
                            _fixture.HashtagRepository,
                            _fixture.HashtagFactory);


            await Assert.ThrowsAsync<ApplicationUnauthorizedException>(() => service.Get());
        }
        #endregion
    }
}
