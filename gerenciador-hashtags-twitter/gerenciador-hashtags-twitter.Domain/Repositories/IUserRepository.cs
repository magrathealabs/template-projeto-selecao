using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Domain.Repositories
{
    public interface IUserRepository
    {
        Task Add(IUser user);
        Task<IUser> Find(string username); 
    }
}
