using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response
{
    public sealed class GetTweetsResponseDataItem
    {
        public Guid Id { get; }
        public string Message { get; }
        public string Author { get; }
        public DateTime PublishDate { get; }
        public Guid HashtagId { get; }
    }
}
