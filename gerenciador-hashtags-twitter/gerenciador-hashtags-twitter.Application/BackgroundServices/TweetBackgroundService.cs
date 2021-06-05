using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.BackgroundServices
{
    public sealed class TweetBackgroundService :
        ITweetBackgroundService,
        INotifyHashtagService
    {
        private IReadOnlyCollection<string> _hashtagsToSearchTweets;
        private readonly IHashtagRepository _hashtagRepository;

        public TweetBackgroundService(IHashtagRepository hashtagRepository)
        {
            SearchHashtags();
            _hashtagRepository = hashtagRepository;
        }
        public async Task NofityHashtagChanged()
        {
            SearchHashtags();
        }

        private async Task SearchHashtags()
        {
            _hashtagsToSearchTweets = await _hashtagRepository.GetAllContents()
                                                              .ConfigureAwait(false);
        }

        public Task SearchTweets()
        {
            //tweets/search/recent url

            throw new System.NotImplementedException();
        }
    }
}
