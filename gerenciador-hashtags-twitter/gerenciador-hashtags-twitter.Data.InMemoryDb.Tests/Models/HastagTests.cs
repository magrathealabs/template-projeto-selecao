using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Domain.Exceptions;
using System;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Models
{
    public sealed class HastagTests
    {
        [Theory]
        [InlineData("   ")]
        [InlineData("")]
        [InlineData(null)]
        public async void InvalidContent(string content)
        {
            var userId = Guid.NewGuid();

            Assert.Throws<DomainEntityException>(() => new Hashtag(content, userId));
        }

        [Fact]
        public async void InvalidUserId()
        {
            var userId = Guid.Empty;
            var content = "Football";

            Assert.Throws<DomainEntityException>(() => new Hashtag(content, userId));
        }

        [Fact]
        public async void Sucess()
        {
            var userId = Guid.NewGuid();
            var content = "       Football";
            var expectedContent = $"#{content.Trim()}";

            var hashtag = new Hashtag(content, userId);

            Assert.Equal(expectedContent, hashtag.Content);
            Assert.Equal(userId, hashtag.UserId);
        }
    }
}
