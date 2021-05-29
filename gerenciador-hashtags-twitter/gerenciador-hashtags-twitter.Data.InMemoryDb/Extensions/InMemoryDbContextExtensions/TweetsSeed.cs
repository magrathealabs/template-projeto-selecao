using gerenciador_hashtags_twitter.Data.InMemoryDb.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace gerenciador_hashtags_twitter.Data.InMemoryDb.Extensions.InMemoryDbContextExtensions
{
    public static class TweetsSeed
    {
        public static void SeedTweet(this InMemoryDbContext context)
        {
            SeedPetsTweets(ref context);
            SeedDevelopment(ref context);
        }

        private static void SeedPetsTweets(ref InMemoryDbContext context)
        {
            var hashtagPet = context.Hashtags
                                    .Where(c => 
                                    c.Content == "#Pets")
                                    .FirstOrDefault();

            var tweetsPets = new List<Tweet>() 
            {
                new Tweet(
                    "Bath time spring clean tag: #smartcandy #animals #nature #animal #pets #love #cute #wildlife #pet #cats #dog #photography #dogs #instagram #cat #naturephotography #of #photooftheday #dogsofinstagram #animallovers #wildlifephotography #petsofinstagram #birds #catsofinstagram", 
                    "smart__candy",
                    DateTime.Now,
                    hashtagPet.Id),
                new Tweet(
                    "The region’s largest, most premium online pet store #petzone #petzoneksa #petzoneapp #saudi #pets #pet #dogs #petsofinstagram #dog #cats #dogsofinstagram #animals #cute #petstagram #love #cat #instagram #catsofinstagram",
                    "petzoneksa", 
                    DateTime.Now,
                    hashtagPet.Id),
                new Tweet(
                    "My girl loves to cuddle #CatsOfTwitter #cats #pets",
                    "KendraEevee", 
                    DateTime.Now,
                    hashtagPet.Id)
            };
            context.Tweets.AddRange(tweetsPets);
        }

        private static void SeedDevelopment(ref InMemoryDbContext context)
        {
            var hashtagDevelopment = context.Hashtags
                                            .Where(c => 
                                            c.Content == "#Development")
                                            .FirstOrDefault();

            var tweetsDevelopment = new List<Tweet>()
            {
                new Tweet(
                    "About to start this book tonight and really looking forward to it. I regularly reflect on my practice and do often feel that there maybe could’ve been a better way to deal with a challenge or did I add to the issue? #reflection #development",
                    "mrssmithlearns",
                    DateTime.Now,
                    hashtagDevelopment.Id),
                new Tweet(
                    "#JosaphatKweka on Policy Options for Special Economic Zones ownership and #Development",
                    "ECA_SRO_SA",
                    DateTime.Now,
                    hashtagDevelopment.Id)
            };
            context.Tweets.AddRange(tweetsDevelopment);
        }
    }
}
