using gerenciador_hashtags_twitter.Application.DTOs.Request.API;
using gerenciador_hashtags_twitter.Application.DTOs.Response.API;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.BackgroundServices
{
    public sealed class TweetBackgroundService :
        ITweetBackgroundService
    {
        private IReadOnlyCollection<string> _hashtagsToSearchTweets;

        private const string URL_PATH = "tweets/search/recent";

        private readonly IWebAPIClientService _webApiClientService;
        private readonly IHashtagRepository _hashtagRepository;
        private readonly ITweetFactory _tweetFactory;
        private readonly ITweetRepository _tweetRepository;

        public TweetBackgroundService(
            IHashtagRepository hashtagRepository,
            IWebAPIClientService webApiClientService,
            ITweetFactory tweetFactory,
            ITweetRepository tweetRepository)
        {
            _hashtagRepository = hashtagRepository;
            _webApiClientService = webApiClientService;
            _tweetFactory = tweetFactory;
            _tweetRepository = tweetRepository;
        }

        private async Task SearchHashtags()
        {
            _hashtagsToSearchTweets = await _hashtagRepository.GetAllContents()
                                                              .ConfigureAwait(false);
        }

        public async Task SearchTweets()
        {
            await SearchHashtags();
            foreach (var hashtag in _hashtagsToSearchTweets)
            {
                await UpdateTweets(hashtag);
            }
        }

        private async Task UpdateTweets(string hashtag)
        {
            var responseData = await SearchByHashtagOnTwitter(hashtag);

            var tweetsFiltered = RemoveRetweets(responseData.Tweets);

            var tweets = await ConvertForTweetObject(tweetsFiltered,
                                                responseData.Includes,
                                                hashtag);

            await _tweetRepository.Add(tweets);
        }

        private async Task<List<ITweet>> ConvertForTweetObject(
            List<SearchTweetsResponseDataItem> tweetsFiltered,
            IncludesResponseData includes,
            string hashtag)
        {
            var tweets = new List<ITweet>();
            foreach (var tweet in tweetsFiltered)
            {
                var author = GetAuthor(includes, tweet);

                if (await TweetExistsInDatabase(tweet, author))
                    continue;

                var tweetObject = _tweetFactory.Create(
                                            tweet.Text,
                                            author.Username,
                                            tweet.CreatedAt,
                                            hashtag);

                tweets.Add(tweetObject);
            }

            return tweets;
        }

        private async Task<bool> TweetExistsInDatabase(
            SearchTweetsResponseDataItem tweet,
            UserResponseDataItem author)
        {
            return await _tweetRepository.Exists(
                                        author.Username,
                                        tweet.Text)
                                       .ConfigureAwait(false);
        }

        private UserResponseDataItem GetAuthor(
            IncludesResponseData includes,
            SearchTweetsResponseDataItem tweet)
        {
            return includes.Users
                           .Where(u =>
                           u.Id.Equals(tweet.AuthorId))
                           .FirstOrDefault();
        }

        private List<SearchTweetsResponseDataItem> RemoveRetweets(List<SearchTweetsResponseDataItem> tweets)
        {
            var filteredTweets = tweets.Where(x => !x.Text.StartsWith("RT "))
                                       .ToList();

            return filteredTweets;
        }

        private async Task<SearchTweetsResponseData> SearchByHashtagOnTwitter(string hashtag)
        {
            var requestData = new SearchTweetsRequestData(hashtag);
            var responseData = await _webApiClientService
                                .Get<SearchTweetsRequestData, SearchTweetsResponseData>(URL_PATH, requestData)
                                .ConfigureAwait(false);

            return responseData;
        }
    }
}
