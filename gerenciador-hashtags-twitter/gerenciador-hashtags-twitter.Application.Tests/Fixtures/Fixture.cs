using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Application.Tests.Fixtures.Repositories;
using gerenciador_hashtags_twitter.Application.Tests.Fixtures.Securities;
using gerenciador_hashtags_twitter.Data.InMemoryDb;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Factories;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using gerenciador_hashtags_twitter.Securities.Application;
using System.Linq;

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

        public readonly IUser UserLarissa;
        public readonly IUser UserJohn;

        public readonly IHashtag HashtagDevelopment;
        public readonly IHashtag HashtagPets;

        public readonly ISecurityService SecurityServiceWithLarissaAuthenticated;
        public readonly ISecurityService SecurityServiceWithJohnAuthenticated;
        public readonly ISecurityService SecurityServiceAnonimous;

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

            UserLarissa = dbContext.Users.FirstOrDefault(c => c.Username.Equals("larissamartins"));
            UserJohn = dbContext.Users.FirstOrDefault(c => c.Username.Equals("John08"));

            HashtagDevelopment = dbContext.Hashtags.FirstOrDefault(h => h.Content.Equals("#Development"));
            HashtagPets = dbContext.Hashtags.FirstOrDefault(h => h.Content.Equals("#Pets"));

            SecurityServiceAnonimous = new SecurityServiceFake();
            SecurityServiceWithJohnAuthenticated = new SecurityServiceFake(UserJohn);
            SecurityServiceWithLarissaAuthenticated = new SecurityServiceFake(UserLarissa);
        }
    }
}
