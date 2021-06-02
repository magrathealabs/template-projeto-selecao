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
        public async void AddRemove()
        {
            var hashtagToDelete = _fixture.DbContext.Hashtags.FirstOrDefault();
            var repository = new HashtagRepository(_fixture.DbContext);

            await repository.Remove(hashtagToDelete);

            var existsInDbCollection = _fixture.DbContext.Hashtags.Contains(hashtagToDelete);
            Assert.False(existsInDbCollection);
        }

        [Fact]
        public async void AddGet()
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

        [Fact]
        public async void AddFind()
        {
            var hashtag = _fixture.DbContext.Hashtags
                                  .Where(c =>
                                  c.Content == "#Pets")
                                  .FirstOrDefault();
            var repository = new HashtagRepository(_fixture.DbContext);

            var hashtagRepository = await repository.Find(hashtag.Id);

            Assert.Equal(hashtag.Id, hashtagRepository.Id);
            Assert.Equal(hashtag.UserId, hashtagRepository.UserId);
            Assert.Equal(hashtag.Content, hashtagRepository.Content);
        }
    }
}
