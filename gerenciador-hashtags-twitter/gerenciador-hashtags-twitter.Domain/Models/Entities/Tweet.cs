using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;

namespace gerenciador_hashtags_twitter.Domain.Models.Entities
{
    public abstract class Tweet :
        ITweet
    {
        public Guid Id { get; }
        public string Message { get; }
        public string Author { get; }
        public DateTime PublishDate { get; }
        public Guid HashtagId { get; }

        public Tweet(
            string message, 
            string author, 
            DateTime publishDate,
            Guid hashtagId)
        {
            Id = new Guid();
            Message = message;
            Author = author;
            PublishDate = publishDate;
            HashtagId = hashtagId;
        }
    }
}
