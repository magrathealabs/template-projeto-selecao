using System.Collections.Generic;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.Service
{
    public sealed class GetTweetsResponseData
    {
        public IReadOnlyCollection<GetTweetsResponseDataItem> Tweets { get; set; }

        public GetTweetsResponseData()
        {
            Tweets = new List<GetTweetsResponseDataItem>();
        }
    }
}
