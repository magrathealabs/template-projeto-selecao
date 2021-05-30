using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response
{
    public sealed class GetHashtagResponseDataItem
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
