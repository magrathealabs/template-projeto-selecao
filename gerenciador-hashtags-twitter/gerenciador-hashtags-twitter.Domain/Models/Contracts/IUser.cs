using System;

namespace gerenciador_hashtags_twitter.Domain.Models.Contracts
{
    public interface IUser
    {
        public Guid Id { get; }
        public string Username { get; }
        public Guid SecurityStamp { get; }
        public string PasswordHash { get; }

        void SetPasswordHash(string passwordHash);
    }
}
