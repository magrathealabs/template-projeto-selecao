namespace gerenciador_hashtags_twitter.Application.Exceptions
{
    public sealed class ApplicationDuplicatedDataException :
        ApplicationException
    {
        public ApplicationDuplicatedDataException(string message) :
            base(message)
        {

        }
    }
}
