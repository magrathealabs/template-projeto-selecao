using gerenciador_hashtags_twitter.Application.DTOs.Request.Service;
using gerenciador_hashtags_twitter.Application.DTOs.Response.Service;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Application.Properties;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Services
{
    public sealed class TweetService :
        ITweetService
    {
        private readonly ISecurityService _securityService;
        private readonly IHashtagRepository _hashtagRepository;
        private readonly ITweetRepository _tweetRepository;

        public TweetService(
            ISecurityService securityService,
            IHashtagRepository hashtagRepository,
            ITweetRepository tweetRepository)
        {
            _securityService = securityService;
            _hashtagRepository = hashtagRepository;
            _tweetRepository = tweetRepository;
        }

        public async Task<GetTweetsResponseData> Get(GetTweetsRequestData request)
        {
            var authenticatedUser = _securityService.GetAuthenticatedUser();

            var hashtag = await GetHashtag(request)
                                .ConfigureAwait(false);

            ValidatePermission(hashtag, authenticatedUser);

            var tweets = await _tweetRepository.Get(hashtag)
                                               .ConfigureAwait(false);

            return CreateResponseData(tweets);
        }

        private GetTweetsResponseData CreateResponseData(IReadOnlyCollection<ITweet> tweets)
        {
            var responseDataItens = tweets.Select(tweet => new GetTweetsResponseDataItem()
            {
                Author = tweet.Author,
                HashtagName = tweet.HashtagContent,
                Message = tweet.Message,
                Id = tweet.Id,
                PublishDate = tweet.PublishDate
            }).ToList();

            return new GetTweetsResponseData()
            {
                Tweets = responseDataItens
            };
        }

        private void ValidatePermission(IHashtag hashtag, IUser authenticatedUser)
        {
            var hashtagItsFromUser = hashtag.UserId.Equals(authenticatedUser.Id);

            if (!hashtagItsFromUser)
                throw new ApplicationPermissionDeniedException();
        }

        private async Task<IHashtag> GetHashtag(GetTweetsRequestData request)
        {
            var hashtag = await _hashtagRepository.Find(request.HashtagId)
                                                  .ConfigureAwait(false);

            if (hashtag is null)
                throw new ApplicationInvalidEntityException(Resources.HashtagDoesntExists);

            return hashtag;
        }
    }
}
