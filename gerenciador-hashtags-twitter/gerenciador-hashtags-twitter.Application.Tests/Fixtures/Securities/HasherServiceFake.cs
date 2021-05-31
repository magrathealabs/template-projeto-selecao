using gerenciador_hashtags_twitter.Securities.Application;

namespace gerenciador_hashtags_twitter.Application.Tests.Fixtures.Securities
{
    public sealed class HasherServiceFake :
        IHasher
    {
        public string Hash(string text)
        {
            return text;
        }

        public bool ValidHash(string hashedText, string text)
        {
            if (hashedText is null && text is null)
                return true;
            else if (hashedText is null)
                return false;
            else
                return hashedText.Equals(text);
        }
    }
}
