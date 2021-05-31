using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Fixtures;
using System.Linq;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Repositories
{
    public sealed class HashtagRepositoryTests
    {
        private readonly Fixture _fixture;

        public HashtagRepositoryTests()
        {
            _fixture = new Fixture();   
        }

        [Fact]
        public async void AddSuccess()
        {
            var user = _fixture.DbContext.Users.FirstOrDefault();
            var newHashtag = new Hashtag("dev", user.Id);
            var repository = new HashtagRepository(_fixture.DbContext);

            await repository.Add(newHashtag);

            var existsInDbCollection = _fixture.DbContext.Hashtags.Contains(newHashtag);
            Assert.True(existsInDbCollection);

        }

        [Fact]
        public async void RemoveSuccess()
        {
            var hashtagToDelete = _fixture.DbContext.Hashtags.FirstOrDefault();
            var repository = new HashtagRepository(_fixture.DbContext);

            await repository.Remove(hashtagToDelete);

            var existsInDbCollection = _fixture.DbContext.Hashtags.Contains(hashtagToDelete);
            Assert.False(existsInDbCollection);
        }

        [Fact]
        public async void GetSuccess()
        {
            var user = _fixture.DbContext.Users
                                  .Where(c =>
                                  c.Username == "John08")
                                  .FirstOrDefault();
            var repository = new HashtagRepository(_fixture.DbContext);

            var hashtags = await repository.Get(user);

            var contaisDevelopment = _fixture.DbContext.Hashtags.Any(h => h.Content.Equals("#Development"));
            Assert.NotNull(hashtags);
            Assert.NotEmpty(hashtags);
            Assert.True(contaisDevelopment);
        }
    }
}
