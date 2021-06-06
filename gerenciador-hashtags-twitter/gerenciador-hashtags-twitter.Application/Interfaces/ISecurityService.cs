using gerenciador_hashtags_twitter.Domain.Models.Contracts;

namespace gerenciador_hashtags_twitter.Application.Interfaces
{
    public interface ISecurityService
    {
        public IUser GetAuthenticatedUser();

    }
}
