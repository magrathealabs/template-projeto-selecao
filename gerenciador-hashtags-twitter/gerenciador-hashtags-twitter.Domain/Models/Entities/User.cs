using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using System;

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
            Id = new Guid();
            Username = username;
            SecurityStamp = new Guid();
        }

        public void SetPasswordHash(string passwordHash)
        {
            PasswordHash = passwordHash;
            SecurityStamp = new Guid();
        }
    }
}
