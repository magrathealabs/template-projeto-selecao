using Newtonsoft.Json;
using System.Collections.Generic;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.API
{
    [JsonObject]
    public sealed class IncludesResponseData
    {
        [JsonProperty("users")]
        public List<UserResponseDataItem> Users { get; set; }
    }
}
