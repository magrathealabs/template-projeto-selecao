using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.DTOs.Response;
using gerenciador_hashtags_twitter.Application.Interfaces;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Services
{
    public sealed class TweetService :
        ITweetService
    {
        public Task<GetTweetsResponseData> Get(GetTweetsRequestData request)
        {
            throw new System.NotImplementedException();
        }
    }
}
