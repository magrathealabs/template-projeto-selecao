using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions
{
    public static class UsersSeed
    {
        public static void SeedUsers(this InMemoryDbContext context)
        {
            SeedLarissa(ref context);
            SeedJohn(ref context);
        }

        private static void SeedJohn(ref InMemoryDbContext context)
        {
            var user = new User("John08");
            context.Users.Add(user);
        }

        private static void SeedLarissa(ref InMemoryDbContext context)
        {
            var user = new User("larissamartins");
            context.Users.Add(user);
        }
    }
}
