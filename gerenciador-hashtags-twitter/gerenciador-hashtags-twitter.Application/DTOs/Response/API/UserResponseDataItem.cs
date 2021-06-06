using Newtonsoft.Json;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.API
{
    [JsonObject]
    public sealed class UserResponseDataItem
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }
    }
}
