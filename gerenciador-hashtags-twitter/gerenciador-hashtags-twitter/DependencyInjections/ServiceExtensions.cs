using gerenciador_hashtags_twitter.Application.APIServices;
using gerenciador_hashtags_twitter.Application.BackgroundServices;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace gerenciador_hashtags_twitter.DependencyInjections
{
    public static class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IHashtagService, HashtagService>();
            services.AddScoped<ITweetService, TweetService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IJWTService, JWTService>();
            services.AddScoped<ISecurityService, SecurityService>();
            services.AddScoped<ITweetBackgroundService, TweetBackgroundService>();
        }
    }
}
