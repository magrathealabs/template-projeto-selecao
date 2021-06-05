using Newtonsoft.Json;
using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.API
{
    [JsonObject]
    public sealed class SearchTweetsResponseDataItem
    {
        [JsonProperty("author_id")]
        public string AuthorId { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}
