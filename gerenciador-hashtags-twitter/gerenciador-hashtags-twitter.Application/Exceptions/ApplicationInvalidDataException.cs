using System;

namespace gerenciador_hashtags_twitter.Application.Exceptions
{
    public abstract class ApplicationInvalidDataException :
        Exception
    {
        public ApplicationInvalidDataException() :
            base()
        {

        }

        public ApplicationInvalidDataException(string message) :
            base(message)
        {

        }
    }
}
