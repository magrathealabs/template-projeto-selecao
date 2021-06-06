using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Factories
{
    public sealed class UserFactory :
        IUserFactory
    {
        public IUser Create(string username)
        {
            return new User(username);
        }
    }
}
