using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.DTOs.Response;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Services
{
    public sealed class HashtagService :
        IHashtagService
    {
        private readonly IHashtagRepository _hashtagRepository;
        private readonly IHashtagFactory _hashtagFactory;
        public HashtagService(IHashtagRepository hashtagRepository, IHashtagFactory hashtagFactory)
        {
            _hashtagRepository = hashtagRepository;
            _hashtagFactory = hashtagFactory;
        }
        public Task<AddHashtagResponseData> Add(AddHashtagRequestData requestData)
        {
            throw new System.NotImplementedException();
        }

        public Task<GetHashtagResponseData> Get(GetHashtagRequestData requestData)
        {
            throw new System.NotImplementedException();
        }

        public Task Remove(RemoveHashtagRequestData requestData)
        {
            throw new System.NotImplementedException();
        }
    }
}
