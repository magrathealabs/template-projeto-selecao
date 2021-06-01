using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Fixtures.Securities;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Securities.Application;
using System.Linq;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Fixtures
{
    public sealed class Fixture
    {
        public readonly IHasher Hasher;
        public readonly InMemoryDbContext DbContext;

        public readonly IUser Larissa;

        public Fixture()
        {
            Hasher = new HasherServiceFake();

            DbContext = new InMemoryDbContext();
            DbContext.SeedUsers(Hasher);
            DbContext.SeedHashtag();
            DbContext.SeedTweet();

            Larissa = DbContext.Users.FirstOrDefault(c => c.Username == "larissamartins");
        }
    }
}
