using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;

namespace gerenciador_hashtags_twitter.Domain.Factories
{
    public interface IHashtagFactory
    {
        IHashtag CreateHasgtag(string hashtag, Guid userId);
    }
}
