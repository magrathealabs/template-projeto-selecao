using gerenciador_hashtags_twitter.Data.InMemoryDb;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Tests.Fixtures.Repositories
{
    public sealed class HashtagRepositoryFake :
        IHashtagRepository
    {
        private readonly InMemoryDbContext _dbContext;
        public HashtagRepositoryFake(InMemoryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task Add(IHashtag hashtag)
        {
            return Task.CompletedTask;
        }

        public Task<IReadOnlyCollection<IHashtag>> Get(IUser user)
        {
            var hashtags = _dbContext.Hashtags.Where(h =>
                                            h.UserId.Equals(user.Id))
                                            .ToList();

            return Task.FromResult((IReadOnlyCollection<IHashtag>)hashtags);
        }

        public Task Remove(IHashtag hashtag)
        {
            return Task.CompletedTask;
        }
    }
}
