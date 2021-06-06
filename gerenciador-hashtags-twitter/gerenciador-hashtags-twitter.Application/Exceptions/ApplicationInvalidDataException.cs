using System;

namespace gerenciador_hashtags_twitter.Application.Exceptions
{
    public sealed class ApplicationInvalidDataException :
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
