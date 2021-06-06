using gerenciador_hashtags_twitter.Application.DTOs.Interfaces;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Interfaces
{
    public interface IWebAPIClientService
    {
        Task<U> Get<T, U>(string uriPath, T requestData)
            where T : IRequestData
            where U : IResponseData;
    }
}
