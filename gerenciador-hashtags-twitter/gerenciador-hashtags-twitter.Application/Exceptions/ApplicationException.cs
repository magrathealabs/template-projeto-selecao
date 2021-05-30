using System;

namespace gerenciador_hashtags_twitter.Application.Exceptions
{
    public abstract class ApplicationException :
        Exception
    {
        public ApplicationException() :
            base()
        {

        }

        public ApplicationException(string message) :
            base(message)
        {

        }
    }
}
