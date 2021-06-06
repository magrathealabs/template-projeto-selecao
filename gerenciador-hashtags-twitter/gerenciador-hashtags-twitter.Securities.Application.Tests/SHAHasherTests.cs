using Xunit;

namespace gerenciador_hashtags_twitter.Securities.Application.Tests
{
    public sealed class SHAHasherTests 
    {
        [Fact]
        public async void HashSucess()
        {
            var hasher = new SHAHasher();
            var textToHash = "@123456";
            var expectedValue = @"AQAAAAEAACcQAAAAEFoFVVXQkpWq61QsI+QbbVtQRHb6IfUM8kI/u0uY5JbDDnDS33YT51u+Dej5oTzmYQ==";

            var hashedValue = hasher.Hash(textToHash);

            Assert.Equal(expectedValue, hashedValue);
        }

        [Fact]
        public async void ValidHashSucess()
        {
            var hasher = new SHAHasher();
            var originValue = "@123456";
            var hashedValue = @"AQAAAAEAACcQAAAAEFoFVVXQkpWq61QsI+QbbVtQRHb6IfUM8kI/u0uY5JbDDnDS33YT51u+Dej5oTzmYQ==";

            var isValid = hasher.ValidHash(hashedValue, originValue);

            Assert.True(isValid);
        }

        [Fact]
        public async void NoValidHashSucess()
        {
            var hasher = new SHAHasher();
            var originValue = "@1223456";
            var hashedValue = @"AQAAAAEAACcQAAAAEFoFVVXQkpWq61QsI+QbbVtQRHb6IfUM8kI/u0uY5JbDDnDS33YT51u+Dej5oTzmYQ==";

            var isValid = hasher.ValidHash(hashedValue, originValue);

            Assert.False(isValid);
        }
    }
}
