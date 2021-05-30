using System;

namespace gerenciador_hashtags_twitter.Application.Exceptions
{
    public sealed class ApplicationExternalServiceException :
        ApplicationException
    {
        public ApplicationExternalServiceException(string message) :
            base(message)
        {

        }

        public ApplicationExternalServiceException(AggregateException aggregateException) :
            base(aggregateException.Message)
        {

        }
    }
}
