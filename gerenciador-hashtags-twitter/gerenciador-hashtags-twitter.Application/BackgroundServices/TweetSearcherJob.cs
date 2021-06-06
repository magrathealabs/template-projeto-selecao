using gerenciador_hashtags_twitter.Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.BackgroundServices
{
    public class TweetSearcherJob
        : BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        public TweetSearcherJob(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var service = scope.ServiceProvider.GetRequiredService<ITweetBackgroundService>();
                while (!stoppingToken.IsCancellationRequested)
                {
                    await service.SearchTweets();
                    await Task.Delay(TimeSpan.FromMinutes(5));
                }
            }
        }
    }
}
