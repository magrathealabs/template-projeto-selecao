using System.Collections.Generic;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.API
{
    public sealed class IncludesResponseData
    {
        public List<UserResponseDataItem> users { get; set; }
    }
}
