namespace gerenciador_hashtags_twitter.Domain.Exceptions
{
    public sealed class DomainEntityException :
        DomainException
    {
        public DomainEntityException(string message) :
            base(message)
        {
        }
    }
}
