using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Domain.Models.Contracts
{
    public interface ITweet
    {
        public Guid Id { get; }
        public string Message { get; }
        public string Author { get;  }
        public DateTime PublishDate { get; }
        public Guid HashtagId { get; }
    }
}
