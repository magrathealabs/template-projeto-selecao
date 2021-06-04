using gerenciador_hashtags_twitter.Domain.Exceptions;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Properties;
using System;

namespace gerenciador_hashtags_twitter.Domain.Models.Entities
{
    public abstract class Tweet :
        ITweet
    {
        public Guid Id { get; }
        public string Message { get; }
        public string Author { get; }
        public DateTime PublishDate { get; }
        public string HashtagContent { get; }

        public Tweet(
            string message, 
            string author, 
            DateTime publishDate,
            string hashtagContent)
        {
            ValidateProperties(message, author, publishDate, hashtagContent);

            Id = Guid.NewGuid();
            Message = message;
            Author = author;
            PublishDate = publishDate;
            HashtagContent = hashtagContent;
        }

        private void ValidateProperties(string message, string author, DateTime publishDate, string hashtagContent)
        {
            ValidateMessage(message);
            ValidateAuthor(author);
            ValidatePublishDate(publishDate);
            ValidateHashtagId(hashtagContent);
        }

        private void ValidateMessage(string message)
        {
            if (string.IsNullOrWhiteSpace(message))
                throw new DomainEntityException(Resources.TweetMessageCannotBeNull);

            var contaisHashtag = message.Contains("#");

            if(!contaisHashtag)
                throw new DomainEntityException(Resources.TweetMessageMustHaveHashtag);
        }

        private void ValidateAuthor(string author)
        {
            if (string.IsNullOrWhiteSpace(author))
                throw new DomainEntityException(Resources.TweetAuthorCannotBeNull);
        }

        private void ValidatePublishDate(DateTime publishDate)
        {
            if (DateTime.MinValue.Equals(publishDate))
                throw new DomainEntityException(Resources.InvalidPublishDate);

            if(publishDate > DateTime.Now)
                throw new DomainEntityException(Resources.InvalidPublishDate);
        }

        private void ValidateHashtagId(string hashtagContent)
        {
            if (string.IsNullOrWhiteSpace(hashtagContent))
                throw new DomainEntityException(Resources.InvalidHashtagContent);
        }
    }
}
