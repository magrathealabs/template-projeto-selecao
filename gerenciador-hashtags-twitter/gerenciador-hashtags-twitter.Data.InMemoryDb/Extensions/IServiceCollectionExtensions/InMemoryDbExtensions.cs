using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Factories;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.IServiceCollectionExtensions
{
    public static class InMemoryDbExtensions
    {
        public static void AddInMemoryDb(this IServiceCollection services)
        {
            services.AddSingleton(context =>
            {
                var dbContext = new InMemoryDbContext();
                dbContext.SeedUsers();
                dbContext.SeedHashtag();
                dbContext.SeedTweet();
                return dbContext;
            });

            services.AddScoped<IHashtagFactory, HashtagFactory>();
            services.AddScoped<IUserFactory, UserFactory>();

            services.AddScoped<IHashtagRepository, HashtagRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITweetRepository, TweetRepository>();
        }
    }
}