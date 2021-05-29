using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Domain.Exceptions;
using System;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Models
{
    public sealed class TweetTests
    {
        private static readonly DateTime _dateNow = DateTime.Now;
        private static readonly DateTime _minDate = DateTime.MinValue;

        [Theory]
        [InlineData("   ")]
        [InlineData("")]
        [InlineData(null)]
        [InlineData("I Love my cats")]
        public async void InvalidMessage(string message)
        {
            var author = "larissa";
            var hastagId = Guid.NewGuid();

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, _dateNow, hastagId));
        }

        [Theory]
        [InlineData("   ")]
        [InlineData("")]
        [InlineData(null)]
        public async void InvalidAuthor(string author)
        {
            var message = "I love my #Cats";
            var hastagId = Guid.NewGuid();

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, _dateNow, hastagId));
        }


        [Fact]
        public async void InvalidMinDate()
        {
            var author = "larissa";
            var message = "I love my #Cats";
            var hastagId = Guid.NewGuid();

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, _minDate, hastagId));
        }

        [Fact]
        public async void InvalidDateBiggerThanCurrentOne()
        {
            var author = "larissa";
            var message = "I love my #Cats";
            var hastagId = Guid.NewGuid();
            var date = _dateNow.AddMinutes(1);

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, date, hastagId));
        }

        [Fact]
        public async void InvalidHashtagId()
        {
            var author = "larissa";
            var message = "I love my #Cats";
            var hastagId = Guid.Empty;

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, _dateNow, hastagId));
        }

        [Fact]
        public void Sucess()
        {
            var author = "larissa";
            var message = "I love my #Cats";
            var hastagId = Guid.NewGuid();

            var tweet = new Tweet(message, author, _dateNow, hastagId);

            Assert.Equal(author, tweet.Author);
            Assert.Equal(message, tweet.Message);
            Assert.Equal(hastagId, tweet.HashtagId);
        }
    }
}
