using gerenciador_hashtags_twitter.Domain.Exceptions;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Properties;
using System;

namespace gerenciador_hashtags_twitter.Domain.Models.Entities
{
    public abstract class Hashtag :
        IHashtag
    {
        public Guid Id { get; }
        public string Content { get; }
        public Guid UserId { get; }

        public Hashtag(string content, Guid userId)
        {
            ValidateProperties(content, userId);

            Id = Guid.NewGuid();
            Content = GetFormatedContent(content);
            UserId = userId;
        }

        private void ValidateProperties(string content, Guid userId)
        {
            ValidateContent(content);
            ValidateUserId(userId);
        }

        private void ValidateContent(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                throw new DomainEntityException(Resources.HashtagCannotBeNull);
        }

        private void ValidateUserId(Guid userId)
        {
            if (userId == Guid.Empty)
                throw new DomainEntityException(Resources.UserIdIsInvalid);
        }

        private string GetFormatedContent(string content)
        {
            if (content.Contains("#"))
                return content.Trim();
            else
                return $"#{content.Trim()}";

        }
    }
}
