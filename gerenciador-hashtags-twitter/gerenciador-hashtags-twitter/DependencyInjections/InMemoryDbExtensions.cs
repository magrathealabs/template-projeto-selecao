using gerenciador_hashtags_twitter.Data.InMemoryDb;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Factories;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Repositories;
using gerenciador_hashtags_twitter.Securities.Application;
using Microsoft.Extensions.DependencyInjection;

namespace gerenciador_hashtags_twitter.DependencyInjections
{
    public static class InMemoryDbExtensions
    {
        public static void AddInMemoryDb(this IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();
            var hasher = serviceProvider.GetRequiredService<IHasher>();

            services.AddSingleton(context =>
            {
                var dbContext = new InMemoryDbContext();
                dbContext.SeedUsers(hasher);
                dbContext.SeedHashtag();
                dbContext.SeedTweet();

                return dbContext;
            });

            services.AddScoped<IHashtagFactory, HashtagFactory>();
            services.AddScoped<IUserFactory, UserFactory>();
            services.AddScoped<ITweetFactory, TweetFactory>();

            services.AddScoped<IHashtagRepository, HashtagRepository>();
            services.AddScoped<ITweetRepository, TweetRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
