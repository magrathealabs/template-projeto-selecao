using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Factories
{
    public sealed class HashtagFactory :
        IHashtagFactory
    {
        public IHashtag Create(string hashtag, IUser user)
        {
            return new Hashtag(hashtag, user.Id);
        }
    }
}
