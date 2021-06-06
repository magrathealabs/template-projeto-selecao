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
            var hashtagContent = "#Cats";

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, _dateNow, hashtagContent));
        }

        [Theory]
        [InlineData("   ")]
        [InlineData("")]
        [InlineData(null)]
        public async void InvalidAuthor(string author)
        {
            var message = "I love my #Cats";
            var hashtagContent = "#Cats";

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, _dateNow, hashtagContent));
        }


        [Fact]
        public async void InvalidMinDate()
        {
            var author = "larissa";
            var message = "I love my #Cats";
            var hashtagContent = "#Cats";

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, _minDate, hashtagContent));
        }

        [Fact]
        public async void InvalidDateBiggerThanCurrentOne()
        {
            var author = "larissa";
            var message = "I love my #Cats";
            var hashtagContent = "#Cats";
            var date = _dateNow.AddMinutes(1);

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, date, hashtagContent));
        }

        [Fact]
        public async void InvalidHashtagId()
        {
            var author = "larissa";
            var message = "I love my #Cats";
            var hashtagContent = string.Empty;

            Assert.Throws<DomainEntityException>(() => new Tweet(message, author, _dateNow, hashtagContent));
        }

        [Fact]
        public void Sucess()
        {
            var author = "larissa";
            var message = "I love my #Cats";
            var hashtagContent = "#Cats";

            var tweet = new Tweet(message, author, _dateNow, hashtagContent);

            Assert.Equal(author, tweet.Author);
            Assert.Equal(message, tweet.Message);
            Assert.Equal(hashtagContent, tweet.HashtagContent);
        }
    }
}
