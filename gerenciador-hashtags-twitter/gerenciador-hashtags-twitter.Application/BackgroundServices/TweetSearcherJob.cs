using gerenciador_hashtags_twitter.Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Diagnostics;
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
                   // await service.SearchTweets();
                    Debug.WriteLine($"Oi {DateTime.Now}");
                    await Task.Delay(TimeSpan.FromSeconds(15));
                }
                //Do something here
            }
        }
    }
}
