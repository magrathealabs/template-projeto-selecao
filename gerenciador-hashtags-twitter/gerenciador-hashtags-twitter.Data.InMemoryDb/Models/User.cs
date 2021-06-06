namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Models
{
    public sealed class User :
        Domain.Models.Entities.User
    {
        public User(string username)
            : base(username)
        {
        }
    }
}
