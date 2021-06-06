using System;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Models
{
    public sealed class Hashtag :
        Domain.Models.Entities.Hashtag
    {
        public Hashtag(string content, Guid userId)
            : base(content, userId)
        {
        }
    }
}
