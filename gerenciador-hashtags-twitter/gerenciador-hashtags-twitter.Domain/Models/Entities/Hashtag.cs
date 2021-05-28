using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;

namespace gerenciador_hashtags_twitter.Domain.Models.Entities
{
    public abstract class Hashtag :
        IHashtag
    {
        public Guid Id { get; }
        public string Content { get; }
        public Guid UserId { get; }

        public Hashtag(string content, Guid userId)
        {
            Id = new Guid();
            Content = content;
            UserId = userId;
        }
    }
}
