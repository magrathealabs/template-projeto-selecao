using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response
{
    public sealed class GetTweetsResponseDataItem
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public string Author { get; set; }
        public DateTime PublishDate { get; set; }
        public string HashtagName { get; set; }
    }
}
