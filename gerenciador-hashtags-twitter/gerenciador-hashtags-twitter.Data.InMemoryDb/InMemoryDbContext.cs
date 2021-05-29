using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using System;
using System.Collections.Generic;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb
{
    public sealed class InMemoryDbContext :
        IDisposable
    {
        public readonly List<Hashtag> Hashtags;
        public readonly List<User> Users;
        public readonly List<Tweet> Tweets;

        public InMemoryDbContext()
        {
            Hashtags = new List<Hashtag>();
            Users = new List<User>();
            Tweets = new List<Tweet>();
        }

        public void Dispose()
        {
            Hashtags.Clear();
            Users.Clear();
            Tweets.Clear();

            GC.Collect();
        }
    }
}
