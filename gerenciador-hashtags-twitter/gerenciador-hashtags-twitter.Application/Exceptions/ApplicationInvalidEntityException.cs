namespace gerenciador_hashtags_twitter.Application.Exceptions
{
    public sealed class ApplicationInvalidEntityException :
        ApplicationException
    {
        public ApplicationInvalidEntityException(string message) :
            base(message)
        {

        }
    }
}
