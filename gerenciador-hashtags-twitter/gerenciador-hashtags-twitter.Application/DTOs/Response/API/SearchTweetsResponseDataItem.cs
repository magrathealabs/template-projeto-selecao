using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.API
{
    public sealed class SearchTweetsResponseDataItem
    {
        public string author_id { get; set; }
        public string id { get; set; }
        public string text { get; set; }
        public DateTime created_at { get; set; }
    }
}
