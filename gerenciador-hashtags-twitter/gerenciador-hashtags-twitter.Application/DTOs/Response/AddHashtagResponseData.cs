using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response
{
    public sealed class AddHashtagResponseData
    {
        public Guid Id { get; }
        public string Content { get; }
        public Guid UserId { get; }
    }
}
