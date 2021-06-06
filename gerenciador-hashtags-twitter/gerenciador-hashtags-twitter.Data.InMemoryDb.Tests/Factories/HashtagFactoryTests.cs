using gerenciador_hashtags_twitter.Data.InMemoryDb.Factories;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Factories
{
    public sealed class HashtagFactoryTests
    {
        [Fact]
        public async void Sucess()
        {
            var factory = new HashtagFactory();
            var user = new User("larissamauricio");

            var hashtag = factory.Create("pets", user);

            var isCorrectType = hashtag.GetType() == typeof(Hashtag);
            Assert.True(isCorrectType);
        }
    }
}
