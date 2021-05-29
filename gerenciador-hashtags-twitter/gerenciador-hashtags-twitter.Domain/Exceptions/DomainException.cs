using System;

namespace gerenciador_hashtags_twitter.Domain.Exceptions
{
    public abstract class DomainException :
        Exception
    {
        public DomainException() :
            base()
        {

        }

        public DomainException(string message) :
            base(message)
        {

        }
    }
}
