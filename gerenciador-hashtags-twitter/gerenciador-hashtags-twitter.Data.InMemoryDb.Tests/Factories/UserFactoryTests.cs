using gerenciador_hashtags_twitter.Data.InMemoryDb.Factories;
using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Factories
{
    public sealed class UserFactoryTests
    {
        [Fact]
        public async void Sucess()
        {
            var factory = new UserFactory();

            var hashtag = factory.Create("larissa");

            var isCorrectType = hashtag.GetType() == typeof(User);
            Assert.True(isCorrectType);
        }
    }
}
