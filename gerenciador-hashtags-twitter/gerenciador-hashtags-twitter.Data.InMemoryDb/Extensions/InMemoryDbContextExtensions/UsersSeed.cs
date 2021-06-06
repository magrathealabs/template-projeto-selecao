using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Securities.Application;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions
{
    public static class UsersSeed
    {
        public static void SeedUsers(this InMemoryDbContext context, IHasher hasher)
        {
            SeedLarissa(ref context, ref hasher);
            SeedJohn(ref context, ref hasher);
        }

        private static void SeedJohn(ref InMemoryDbContext context, ref IHasher hasher)
        {
            var user = new User("John08");
            var passwordHash = hasher.Hash("@123456");
            user.SetPasswordHash(passwordHash);
            context.Users.Add(user);
        }

        private static void SeedLarissa(ref InMemoryDbContext context, ref IHasher hasher)
        {
            var user = new User("larissamartins");
            var passwordHash = hasher.Hash("@123456");
            user.SetPasswordHash(passwordHash);
            context.Users.Add(user);
        }
    }
}
