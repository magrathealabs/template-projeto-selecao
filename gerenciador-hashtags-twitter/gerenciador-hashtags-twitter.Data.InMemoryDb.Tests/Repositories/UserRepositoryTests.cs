using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Fixtures;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Repositories
{
    public class UserRepositoryTests
    {
        private readonly Fixture _fixture;

        public UserRepositoryTests()
        {
            _fixture = new Fixture();
        }

        [Fact]
        public async void AddSuccess()
        {
            var newUser = new User("dev123");
            var repository = new UserRepository(_fixture.DbContext);

            await repository.Add(newUser);

            var existsInDbCollection = _fixture.DbContext.Users.Contains(newUser);
            Assert.True(existsInDbCollection);

        }

        [Fact]
        public async void FindSuccess()
        {
            var repository = new UserRepository(_fixture.DbContext);
            var newUsername = "larissamartins";

            var user = await repository.Find(newUsername);

            Assert.NotNull(user);
            Assert.Equal(user.Username, newUsername);
        }

        [Fact]
        public async void FindByIdSuccess()
        {
            var repository = new UserRepository(_fixture.DbContext);

            var user = await repository.Find(_fixture.Larissa.Id);

            Assert.NotNull(user);
            Assert.Equal(user.Id, _fixture.Larissa.Id);
        }
    }
}
