using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Repositories
{
    public sealed class UserRepository :
        IUserRepository
    {
        private readonly List<User> _usersContext;

        public UserRepository(InMemoryDbContext context)
        {
            _usersContext = context.Users;
        }

        public Task Add(IUser user)
        {
            _usersContext.Add((User)user);
            return Task.CompletedTask;
        }

        public Task<IUser> Find(string username)
        {
            var user = _usersContext.SingleOrDefault(u => u.Username.Equals(username));
            return Task.FromResult((IUser)user);
        }

        public Task<IUser> Find(Guid id)
        {
            var user = _usersContext.SingleOrDefault(u => u.Id.Equals(id));
            return Task.FromResult((IUser)user);
        }
    }
}
