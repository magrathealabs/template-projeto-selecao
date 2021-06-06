using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Domain.Factories;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Factories
{
    public sealed class TweetFactory :
        ITweetFactory
    {
        public ITweet Create(
            string message, 
            string author,
            DateTime publishDate, 
            string hashtag)
        {
            return new Tweet(
                message,
                author, 
                publishDate, 
                hashtag);
        }
    }
}
