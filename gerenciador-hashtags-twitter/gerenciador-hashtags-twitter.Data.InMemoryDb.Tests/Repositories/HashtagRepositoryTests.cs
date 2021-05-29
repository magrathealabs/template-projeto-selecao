using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Repositories
{
    public sealed class HashtagRepositoryTests
    {
        [Fact]
        public async void AddSuccess()
        {
            var dbContext = GetDbContext();
            var user = dbContext.Users.FirstOrDefault();
            var newHashtag = new Hashtag("dev", user.Id);
            var repository = new HashtagRepository(dbContext);

            await repository.Add(newHashtag);

            var existsInDbCollection = dbContext.Hashtags.Contains(newHashtag);
            Assert.True(existsInDbCollection);

        }

        [Fact]
        public async void RemoveSuccess()
        {
            var dbContext = GetDbContext();
            var hashtagToDelete = dbContext.Hashtags.FirstOrDefault();
            var repository = new HashtagRepository(dbContext);

            await repository.Remove(hashtagToDelete);

            var existsInDbCollection = dbContext.Hashtags.Contains(hashtagToDelete);
            Assert.False(existsInDbCollection);
        }

        [Fact]
        public async void GetSuccess()
        {
            var dbContext = GetDbContext();
            var user = dbContext.Users
                                  .Where(c =>
                                  c.Username == "John08")
                                  .FirstOrDefault();
            var repository = new HashtagRepository(dbContext);

            var hashtags = await repository.Get(user);

            var contaisDevelopment = dbContext.Hashtags.Any(h => h.Content.Equals("#Development"));
            Assert.NotNull(hashtags);
            Assert.NotEmpty(hashtags);
            Assert.True(contaisDevelopment);
        }

        private InMemoryDbContext GetDbContext()
        {
            var dbContext = new InMemoryDbContext();
            dbContext.SeedUsers();
            dbContext.SeedHashtag();

            return dbContext;
        }
    }
}
