using gerenciador_hashtags_twitter.Securities.Application;
using Microsoft.Extensions.DependencyInjection;

namespace gerenciador_hashtags_twitter.DependencyInjections
{
    public static class HasherExtensions
    {
        public static void AddHasher(this IServiceCollection services)
        {
            services.AddScoped<IHasher, SHAHasher>();
        }
    }
}
