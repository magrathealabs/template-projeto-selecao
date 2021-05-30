using gerenciador_hashtags_twitter.Data.InMemoryDb;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Tests.Fixtures.Repositories
{
    public sealed class TweetRepositoryFake :
        ITweetRepository
    {
        private readonly InMemoryDbContext _dbContext;
        public TweetRepositoryFake(InMemoryDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Task Add(IEnumerable<ITweet> tweets)
        {
            return Task.CompletedTask;
        }

        public Task<IReadOnlyCollection<ITweet>> Get(IHashtag hashtag)
        {
            var tweets = _dbContext.Tweets.Where(t =>
                                           t.HashtagId.Equals(hashtag.Id))
                                           .ToList();

            return Task.FromResult((IReadOnlyCollection<ITweet>)tweets);
        }
    }
}
