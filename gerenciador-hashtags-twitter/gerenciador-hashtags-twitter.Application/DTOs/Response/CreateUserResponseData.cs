using System;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response
{
    public sealed class CreateUserResponseData
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
    }
}
