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
        public Guid HashtagId { get; }

        public Tweet(
            string message, 
            string author, 
            DateTime publishDate,
            Guid hashtagId)
        {
            ValidateProperties(message, author, publishDate, hashtagId);

            Id = Guid.NewGuid();
            Message = message;
            Author = author;
            PublishDate = publishDate;
            HashtagId = hashtagId;
        }

        private void ValidateProperties(string message, string author, DateTime publishDate, Guid hashtagId)
        {
            ValidateMessage(message);
            ValidateAuthor(author);
            ValidatePublishDate(publishDate);
            ValidateHashtagId(hashtagId);
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

        private void ValidateHashtagId(Guid hashtagId)
        {
            if(Guid.Empty.Equals(hashtagId))
                throw new DomainEntityException(Resources.InvalidHashtagId);
        }
    }
}
