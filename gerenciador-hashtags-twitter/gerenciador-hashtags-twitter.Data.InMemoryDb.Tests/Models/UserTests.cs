using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using gerenciador_hashtags_twitter.Domain.Exceptions;
using Xunit;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Tests.Models
{
    public sealed class UserTests
    {
        [Theory]
        [InlineData("   ")]
        [InlineData("")]
        [InlineData(null)]
        [InlineData("larissa martins")]
        [InlineData("larissa_martins")]
        [InlineData("   larissa")]
        public async void InvalidUserName(string username)
        {
            Assert.Throws<DomainEntityException>(() => new User(username));
        }

        [Fact]
        public async void InvalidPasswordHash()
        {
            var username = "larissa";
            var expectedValue = username.Trim();

            var user = new User(username);

            Assert.Equal(user.Username, expectedValue);
            Assert.Throws<DomainEntityException>(() => user.SetPasswordHash(""));
        }

        [Theory]
        [InlineData("martins08")]
        [InlineData("martinsMauricio")]
        public async void Sucess(string username)
        {
            var expectedValue = username.Trim();

            var user = new User(username);
            user.SetPasswordHash("d4917cd4cedae16417cfddb3ce292e45");

            Assert.Equal(user.Username, expectedValue);
        }
    }
}
