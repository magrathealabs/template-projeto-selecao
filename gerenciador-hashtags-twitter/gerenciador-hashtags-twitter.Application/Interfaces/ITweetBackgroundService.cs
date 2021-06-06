using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Interfaces
{
    public interface ITweetBackgroundService
    {
        Task SearchTweets();
    }
}
