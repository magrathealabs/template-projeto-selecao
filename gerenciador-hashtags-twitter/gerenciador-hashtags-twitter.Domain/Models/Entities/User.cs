using gerenciador_hashtags_twitter.Domain.Exceptions;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Properties;
using System;
using System.Text.RegularExpressions;

namespace gerenciador_hashtags_twitter.Domain.Models.Entities
{
    public abstract class User :
        IUser
    {
        public Guid Id { get; }
        public string Username { get; }
        public Guid SecurityStamp { get; private set; }
        public string PasswordHash { get; private set; }

        public User(string username)
        {
            ValidateUserName(username);

            Id = Guid.NewGuid();
            Username = username;
            SecurityStamp = Guid.NewGuid();
        }

        private void ValidateUserName(string username)
        {
            var regexInvalidCharacters = @"[^a-zA-Z0-9]";

            if (string.IsNullOrWhiteSpace(username))
                throw new DomainEntityException(Resources.UsernameCannotBeNull);

            var regex = new Regex(regexInvalidCharacters);
            var containInvalidCaracters = regex.IsMatch(username);
            if (containInvalidCaracters)
                throw new DomainEntityException(Resources.UsernameInvalid);
        }

        public void SetPasswordHash(string passwordHash)
        {
            if (string.IsNullOrWhiteSpace(passwordHash))
                throw new DomainEntityException(Resources.PasswordHashInvalid);

            PasswordHash = passwordHash;
            SecurityStamp = Guid.NewGuid();
        }
    }
}
