using System;

namespace gerenciador_hashtags_twitter.Application.Interfaces
{
    public interface ISecurityService
    {
        internal Guid GetAuthenticatedUserId();

    }
}
