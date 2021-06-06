using gerenciador_hashtags_twitter.Application.APIServices;
using gerenciador_hashtags_twitter.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;

namespace gerenciador_hashtags_twitter.DependencyInjections
{
    public static class WebAPIClientExtensions
    {
        public static void AddTweetWebApiClient(this IServiceCollection services)
        {
            services.AddScoped(
                context => new HttpClient()
                {
                    BaseAddress = new Uri(context.GetRequiredService<IConfiguration>()["TwitterAPI:BaseUrl"])
                });

            services.AddScoped<IWebAPIClientService, WebAPIClientService>(
                context => new WebAPIClientService(
                    context.GetRequiredService<HttpClient>(),
                    context.GetRequiredService<IConfiguration>()["TwitterAPI:BearerToken"]
                    ));
        }
    }
}
