using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories;
using System.Linq;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Repositories
{
    public class UserRepositoryTests
    {
        [Fact]
        public async void AddSuccess()
        {
            var dbContext = GetDbContext();
            var newUser = new User("dev123");
            var repository = new UserRepository(dbContext);

            await repository.Add(newUser);

            var existsInDbCollection = dbContext.Users.Contains(newUser);
            Assert.True(existsInDbCollection);

        }

        [Fact]
        public async void FindSuccess()
        {
            var dbContext = GetDbContext();
            var repository = new UserRepository(dbContext);
            var newUsername = "larissamartins";

            var user = await repository.Find(newUsername);

            Assert.NotNull(user);
            Assert.Equal(user.Username, newUsername);
        }

        private InMemoryDbContext GetDbContext()
        {
            var dbContext = new InMemoryDbContext();
            dbContext.SeedUsers();

            return dbContext;
        }
    }
}
