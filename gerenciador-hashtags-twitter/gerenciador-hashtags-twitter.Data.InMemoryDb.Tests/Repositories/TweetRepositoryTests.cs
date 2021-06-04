using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Fixtures;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Repositories
{
    public class TweetRepositoryTests
    {
        private readonly Fixture _fixture;

        public TweetRepositoryTests()
        {
            _fixture = new Fixture();
        }

        [Fact]
        public async void AddSuccess()
        {
            var hashtag = _fixture.DbContext.Hashtags.FirstOrDefault();
            string message = $"I Love this {hashtag.Content}";
            var newTweet = new Tweet(message, "martinslm_", DateTime.Now, hashtag.Content);
            var tweetList = new List<ITweet>() { newTweet };
            var repository = new TweetRepository(_fixture.DbContext);

            await repository.Add(tweetList);

            var existsInDbCollection = _fixture.DbContext.Tweets.Contains(newTweet);
            Assert.True(existsInDbCollection);

        }

        [Fact]
        public async void GetSuccess()
        {
            var hashtag = _fixture.DbContext.Hashtags
                                  .Where(c =>
                                  c.Content == "#Development")
                                  .FirstOrDefault();
            var repository = new TweetRepository(_fixture.DbContext);

            var tweets = await repository.Get(hashtag);

            var containsOthersHashtags = tweets.Any(h => h.HashtagContent != hashtag.Content);
            Assert.NotNull(tweets);
            Assert.NotEmpty(tweets);
            Assert.False(containsOthersHashtags);
        }
    }
}
