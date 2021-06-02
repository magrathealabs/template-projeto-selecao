using gerenciador_hashtags_twitter.Application.Constants;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using System;

namespace gerenciador_hashtags_twitter.Application.Services
{
    public sealed class SecurityService :
        ISecurityService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public SecurityService(
            IHttpContextAccessor httpContextAccessor,
            IUserRepository userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        private Guid GetUserId()
        {
            var claimValue = GetClaimValue(ClaimsNameConstants.UserId);
            if (!Guid.TryParse(claimValue, out Guid userId))
                throw new ApplicationUnauthorizedException();

            return userId;
        }

        private Guid GetSecurityStamp()
        {
            var claimValue = GetClaimValue(ClaimsNameConstants.SecurityStamp);
            if (!Guid.TryParse(claimValue, out Guid securityStamp))
                throw new ApplicationUnauthorizedException();

            return securityStamp;
        }

        public string GetClaimValue(string keyName)
        {
            var aspnetUser = _httpContextAccessor.HttpContext.User;
            var claim = aspnetUser.FindFirst(c => c.Type == keyName);
            if (claim is null)
                throw new ApplicationUnauthorizedException();

            return claim.Value;
        }

        public IUser GetAuthenticatedUser()
        {
            var userId = GetUserId();

            var user = _userRepository.Find(userId)
                                    .GetAwaiter()
                                    .GetResult();

            if (user is null)
                throw new ApplicationUnauthorizedException();

            var securityStamp = GetSecurityStamp();
            var sameSecurityStamp = user.SecurityStamp.Equals(securityStamp);
            if (!sameSecurityStamp)
                throw new ApplicationUnauthorizedException();

            return user;
        }
    }
}
