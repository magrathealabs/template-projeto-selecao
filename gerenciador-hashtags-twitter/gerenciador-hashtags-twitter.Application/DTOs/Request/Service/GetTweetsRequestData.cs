using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Request.Service
{
    public sealed class GetTweetsRequestData
    {
        public Guid HashtagId { get; set; }
    }
}
