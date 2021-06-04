using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Domain.Repositories
{
    public interface IHashtagRepository
    {
        Task Add(IHashtag hashtag);
        Task Remove(IHashtag hashtag);
        Task<IReadOnlyCollection<IHashtag>> Get(IUser user);
        Task<IReadOnlyCollection<string>> GetAllContents();
        Task<IHashtag> Find(Guid id);
    }
}
