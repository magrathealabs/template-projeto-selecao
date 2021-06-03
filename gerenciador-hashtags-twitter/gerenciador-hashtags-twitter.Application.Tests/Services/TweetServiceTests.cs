using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Services;
using gerenciador_hashtags_twitter.Application.Tests.Fixtures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace gerenciador_hashtags_twitter.Application.Tests.Services
{
    public sealed class TweetServiceTests
    {
        private readonly Fixture _fixture;
        public TweetServiceTests(Fixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async void GetSucess()
        {
            var countTweetsWhitDevelopmentHashtagInMemory = 2;
            var requestData = new GetTweetsRequestData()
            {
                HashtagId = _fixture.HashtagDevelopment.Id
            };
            var service = new TweetService();

            var responseData = await service.Get(requestData);

            Assert.NotNull(responseData);
            Assert.NotEmpty(responseData.Tweets);
            var sameQuantity = responseData.Tweets.Count() == countTweetsWhitDevelopmentHashtagInMemory;
            Assert.True(sameQuantity);
        }

        [Fact]
        public async void GetInvalidEntity()
        {
            var requestData = new GetTweetsRequestData()
            {
                HashtagId = Guid.NewGuid()
            };
            var service = new TweetService();

           await Assert.ThrowsAsync<ApplicationInvalidEntityException>(() => service.Get(requestData));
        }

        [Fact]
        public async void GetUnauthorized()
        {
            var requestData = new GetTweetsRequestData()
            {
                HashtagId = Guid.NewGuid()
            };
            var service = new TweetService();

            await Assert.ThrowsAsync<ApplicationUnauthorizedException>(() => service.Get(requestData));
        }

        public async void GerPermissionDenied()
        {
            var requestData = new GetTweetsRequestData()
            {
                HashtagId = _fixture.HashtagDevelopment.Id
            };
            var service = new TweetService();

            await Assert.ThrowsAsync<ApplicationPermissionDeniedException>(() => service.Get(requestData));
        }
    }
}
