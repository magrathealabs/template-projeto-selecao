using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Fixtures.Securities;
using gerenciador_hashtags_twitter.Securities.Application;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Fixtures
{
    public sealed class Fixture
    {
        public readonly IHasher Hasher;
        public readonly InMemoryDbContext DbContext;

        public Fixture()
        {
            Hasher = new HasherServiceFake();

            DbContext = new InMemoryDbContext();
            DbContext.SeedUsers(Hasher);
            DbContext.SeedHashtag();
            DbContext.SeedTweet();
        }
    }
}
