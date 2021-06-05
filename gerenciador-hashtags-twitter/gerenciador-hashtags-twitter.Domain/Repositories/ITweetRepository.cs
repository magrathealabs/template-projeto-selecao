using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Domain.Repositories
{
    public interface ITweetRepository
    {
        Task Add(IEnumerable<ITweet> tweets);
        Task<IReadOnlyCollection<ITweet>> Get(IHashtag hashtag);
        Task<bool> Exists(string author, string message);
    }
}
