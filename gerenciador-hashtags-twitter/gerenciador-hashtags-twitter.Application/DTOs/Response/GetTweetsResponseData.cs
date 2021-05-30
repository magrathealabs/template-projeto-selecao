using System;
using System.Collections.Generic;
using System.Text;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response
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
