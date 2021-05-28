using System;

namespace gerenciador_hashtags_twitter.Domain.Models.Contracts
{
    public interface IHashtag
    {
        public Guid Id { get; }
        public string Content { get; }
        public Guid UserId { get; }
    }
}
