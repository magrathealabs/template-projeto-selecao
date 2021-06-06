namespace gerenciador_hashtags_twitter.Application.Exceptions
{
    public sealed class ApplicationNotFoundException :
        ApplicationException
    {
        public readonly object Value;
        public ApplicationNotFoundException(object value) :
            base()
        {
            Value = value;
        }
    }
}
