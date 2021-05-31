namespace gerenciador_hashtags_twitter.Securities.Application
{
    public interface IHasher
    {
        string Hash(string text);

        bool ValidHash(string hashedText, string text);
    }
}
