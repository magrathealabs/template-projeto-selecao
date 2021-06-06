using gerenciador_hashtags_twitter.Application.DTOs.Request.Service;
using gerenciador_hashtags_twitter.Application.DTOs.Response.Service;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Interfaces
{
    public interface IUserService 
    {
        public Task<CreateUserResponseData> Create(CreateUserRequestData requestData);
    }
}
