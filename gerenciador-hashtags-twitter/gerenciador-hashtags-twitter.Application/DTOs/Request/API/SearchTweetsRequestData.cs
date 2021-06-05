using gerenciador_hashtags_twitter.Application.DTOs.Interfaces;
using Newtonsoft.Json;

namespace gerenciador_hashtags_twitter.Application.DTOs.Request.API
{
    [JsonObject]
    public sealed class SearchTweetsRequestData :
        IRequestData
    {
        [JsonProperty("query")]
        public string Query { get; set; }

        [JsonProperty("max_results")]
        public int MaxResults { get; set; }

        [JsonProperty("tweet.fields")]
        public string TweetFields { get; set; }

        [JsonProperty("user.fields")]
        public string UserFields { get; set; }

        [JsonProperty("expansions")]
        public string Expansions { get; set; }

        public SearchTweetsRequestData(string query)
        {
            Query = query;
            MaxResults = 100;
            TweetFields = "id,created_at,author_id,text";
            UserFields = "id,name,username,description";
            Expansions = "author_id";
        }
    }
}
