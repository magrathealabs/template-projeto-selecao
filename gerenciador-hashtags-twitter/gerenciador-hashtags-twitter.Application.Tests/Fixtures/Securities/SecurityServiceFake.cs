using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;

namespace gerenciador_hashtags_twitter.Application.Tests.Fixtures.Securities
{
    public sealed class SecurityServiceFake :
        ISecurityService
    {
        private readonly IUser _user;
        public SecurityServiceFake(IUser user)
        {
            _user = user;
        }
        public SecurityServiceFake()
        {
        }

        public IUser GetAuthenticatedUser()
        {
            if (_user is null)
                throw new ApplicationUnauthorizedException();

            return _user;
        }
    }
}
