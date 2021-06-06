using gerenciador_hashtags_twitter.Data.InMemoryDb;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Tests.Fixtures.Repositories
{
    public sealed class UserRepositoryFake :
        IUserRepository
    {
        private readonly InMemoryDbContext _dbContext;
        public UserRepositoryFake(InMemoryDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Task Add(IUser user)
        {
            return Task.CompletedTask;
        }

        public Task<IUser> Find(string username)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Username.Equals(username));
            return Task.FromResult((IUser)user);
        }

        public Task<IUser> Find(Guid id)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Id.Equals(id));
            return Task.FromResult((IUser)user);
        }
    }
}
