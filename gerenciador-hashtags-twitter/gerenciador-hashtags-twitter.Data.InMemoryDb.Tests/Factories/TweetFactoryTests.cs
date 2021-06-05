using gerenciador_hashtags_twitter.Data.InMemoryDb.Factories;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using System;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Factories
{
    public sealed class TweetFactoryTests
    {
        [Fact]
        public async void Sucess()
        {
            var factory = new TweetFactory();

            var tweet = factory.Create("I love my #pets", "twitter", DateTime.Now, "#pets");

            var isCorrectType = tweet.GetType() == typeof(Tweet);
            Assert.True(isCorrectType);
        }
    }
}
