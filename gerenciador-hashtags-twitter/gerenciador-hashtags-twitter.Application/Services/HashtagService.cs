using gerenciador_hashtags_twitter.Application.DTOs.Request.Service;
using gerenciador_hashtags_twitter.Application.DTOs.Response.Service;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Application.Properties;
using gerenciador_hashtags_twitter.Domain.Exceptions;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Services
{
    public sealed class HashtagService :
        IHashtagService
    {
        private readonly ISecurityService _securityService;
        private readonly IHashtagRepository _hashtagRepository;
        private readonly IHashtagFactory _hashtagFactory;
        public HashtagService(
            ISecurityService securityService,
            IHashtagRepository hashtagRepository,
            IHashtagFactory hashtagFactory)
        {
            _securityService = securityService;
            _hashtagRepository = hashtagRepository;
            _hashtagFactory = hashtagFactory;
        }
        public async Task<AddHashtagResponseData> Add(AddHashtagRequestData requestData)
        {
            try
            {
                var autheticatedUser = _securityService.GetAuthenticatedUser();

                var newHashtag = _hashtagFactory.Create(
                                                requestData.Content,
                                                autheticatedUser);

                await ValidateDuplicatedKeys(newHashtag, autheticatedUser)
                        .ConfigureAwait(false);

                await _hashtagRepository.Add(newHashtag)
                                        .ConfigureAwait(false);

                return CreateAddHashtagResponseData(newHashtag);
            }
            catch (DomainEntityException ex)
            {
                throw new ApplicationInvalidDataException(ex.Message);
            }
        }

        private AddHashtagResponseData CreateAddHashtagResponseData(IHashtag newHashtag)
        {
            return new AddHashtagResponseData()
            {
                Content = newHashtag.Content,
                Id = newHashtag.Id,
                UserId = newHashtag.UserId
            };
        }

        private async Task ValidateDuplicatedKeys(IHashtag newHashtag, IUser user)
        {
            var userHashtagsInRepository = await GetUserHashtags(user);

            var containAnyHashtagWithSameDecription = userHashtagsInRepository.Any(c =>
                                                        c.Content == newHashtag.Content);

            if (containAnyHashtagWithSameDecription)
                throw new ApplicationDuplicatedDataException(Resources.ExistsHashtagWithThisName);
        }

        private async Task<IReadOnlyCollection<IHashtag>> GetUserHashtags(IUser user)
        {
            return await _hashtagRepository.Get(user)
                                           .ConfigureAwait(false);
        }

        public async Task<GetHashtagResponseData> Get()
        {
            var autheticatedUser = _securityService.GetAuthenticatedUser();

            var userHashtags = await GetUserHashtags(autheticatedUser)
                                     .ConfigureAwait(false);

            return CreateGetHashtagResponseData(userHashtags);
        }

        private GetHashtagResponseData CreateGetHashtagResponseData(IReadOnlyCollection<IHashtag> userHashtags)
        {
            var responseDataItens = userHashtags.Select( c =>
                new GetHashtagResponseDataItem()
                {
                    Content = c.Content,
                    Id = c.Id
                }).ToList();

            return new GetHashtagResponseData()
            {
                Hashtags = responseDataItens
            };
        }

        public async Task Remove(RemoveHashtagRequestData requestData)
        {
            var autheticatedUser = _securityService.GetAuthenticatedUser();

            var hashtag = await FindHashtag(requestData.Id)
                                .ConfigureAwait(false);

            ValidateUserCanRemoveHashtag(hashtag, autheticatedUser);

            await _hashtagRepository.Remove(hashtag)
                                    .ConfigureAwait(false);
        }

        private async Task<IHashtag> FindHashtag(Guid id)
        {
           var hashtag =  await _hashtagRepository.Find(id)
                                                  .ConfigureAwait(false);

            if (hashtag is null)
                throw new ApplicationNotFoundException(id);

            return hashtag;
        }

        private void ValidateUserCanRemoveHashtag(IHashtag hashtag, IUser autheticatedUser)
        {
            var sameUserId = hashtag.UserId.Equals(autheticatedUser.Id);

            if (!sameUserId)
                throw new ApplicationPermissionDeniedException();
        }
    }
}
