using System;

namespace gerenciador_hashtags_twitter.Domain.Models.Contracts
{
    public interface ITweet
    {
        public Guid Id { get; }
        public string Message { get; }
        public string Author { get;  }
        public DateTime PublishDate { get; }
        public string HashtagContent { get; }
    }
}
