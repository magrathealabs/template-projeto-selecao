using gerenciador_hashtags_twitter.Domain.Models.Contracts;

namespace gerenciador_hashtags_twitter.Domain.Factories
{
    public interface IUserFactory
    {
        IUser CreateUser(string username);
    }
}
