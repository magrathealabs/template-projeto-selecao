using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.Service
{
    public sealed class AddHashtagResponseData
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public Guid UserId { get; set; }
    }
}
