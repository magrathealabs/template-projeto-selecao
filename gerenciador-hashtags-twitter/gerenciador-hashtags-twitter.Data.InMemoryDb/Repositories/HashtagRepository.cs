using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories
{
    public sealed class HashtagRepository :
        IHashtagRepository
    {
        private readonly List<Hashtag> _hashtagsContext;
        public HashtagRepository(InMemoryDbContext context)
        {
            _hashtagsContext = context.Hashtags;
        }
        public Task Add(IHashtag hashtag)
        {
            _hashtagsContext.Add((Hashtag)hashtag);
            return Task.CompletedTask;
        }

        public Task<IReadOnlyCollection<IHashtag>> Get(IUser user)
        {
            var hashtags = _hashtagsContext.Where(h => 
                                            h.UserId.Equals(user.Id))
                                            .ToList();

            return Task.FromResult((IReadOnlyCollection<IHashtag>)hashtags);
        }

        public Task Remove(IHashtag hashtag)
        {
            _hashtagsContext.Remove((Hashtag)hashtag);
            return Task.CompletedTask;
        }
    }
}
