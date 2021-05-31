using gerenciador_hashtags_twitter.Application.Tests.Fixtures.Repositories;
using gerenciador_hashtags_twitter.Application.Tests.Fixtures.Securities;
using gerenciador_hashtags_twitter.Data.InMemoryDb;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Factories;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Repositories;
using gerenciador_hashtags_twitter.Securities.Application;

namespace gerenciador_hashtags_twitter.Application.Tests.Fixtures
{
    public sealed class Fixture
    {
        public readonly IHashtagRepository HashtagRepository;
        public readonly ITweetRepository TweetRepository;
        public readonly IUserRepository UserRepository;

        public readonly IHashtagFactory HashtagFactory;
        public readonly IUserFactory UserFactory;

        public readonly IHasher Hasher;

        public Fixture()
        {
            Hasher = new HasherServiceFake();

            var dbContext = new InMemoryDbContext();
            dbContext.SeedUsers(Hasher);
            dbContext.SeedHashtag();
            dbContext.SeedTweet();

            HashtagRepository = new HashtagRepositoryFake(dbContext);
            TweetRepository = new TweetRepositoryFake(dbContext);
            UserRepository = new UserRepositoryFake(dbContext);

            HashtagFactory = new HashtagFactory();
            UserFactory = new UserFactory();
        }
    }
}
