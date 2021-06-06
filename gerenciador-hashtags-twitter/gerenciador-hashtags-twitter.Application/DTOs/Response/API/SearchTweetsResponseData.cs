using gerenciador_hashtags_twitter.Application.DTOs.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.API
{
    [JsonObject]
    public class SearchTweetsResponseData :
        IResponseData
    {
        [JsonProperty("data")]
        public List<SearchTweetsResponseDataItem> Tweets { get; set; }

        [JsonProperty("includes")]
        public IncludesResponseData Includes { get; set; }
    }
}
