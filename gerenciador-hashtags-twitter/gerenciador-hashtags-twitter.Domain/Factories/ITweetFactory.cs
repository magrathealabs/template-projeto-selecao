using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;

namespace gerenciador_hashtags_twitter.Domain.Factories
{
    public interface ITweetFactory
    {
        ITweet Create(
            string message, 
            string author,
            DateTime publishDate, 
            string hashtag);
    }
}
