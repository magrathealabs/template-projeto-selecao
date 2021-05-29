using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Repositories
{
    public class TweetRepositoryTests
    {
        [Fact]
        public async void AddSuccess()
        {
            var dbContext = GetDbContext();
            var hashtag = dbContext.Hashtags.FirstOrDefault();
            string message = $"I Love this {hashtag.Content}";
            var newTweet = new Tweet(message, "martinslm_", DateTime.Now, hashtag.Id);
            var tweetList = new List<ITweet>() { newTweet };
            var repository = new TweetRepository(dbContext);

            await repository.Add(tweetList);

            var existsInDbCollection = dbContext.Tweets.Contains(newTweet);
            Assert.True(existsInDbCollection);

        }

        [Fact]
        public async void GetSuccess()
        {
            var dbContext = GetDbContext();
            var hashtag = dbContext.Hashtags
                                  .Where(c =>
                                  c.Content == "#Development")
                                  .FirstOrDefault();
            var repository = new TweetRepository(dbContext);

            var tweets = await repository.Get(hashtag);

            var containsOthersHashtags = tweets.Any(h => h.HashtagId != hashtag.Id);
            Assert.NotNull(tweets);
            Assert.NotEmpty(tweets);
            Assert.False(containsOthersHashtags);
        }

        private InMemoryDbContext GetDbContext()
        {
            var dbContext = new InMemoryDbContext();
            dbContext.SeedUsers();
            dbContext.SeedHashtag();
            dbContext.SeedTweet();

            return dbContext;
        }
    }
}
