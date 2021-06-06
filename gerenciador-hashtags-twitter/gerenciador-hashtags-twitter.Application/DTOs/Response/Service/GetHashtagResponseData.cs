using System.Collections.Generic;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.Service
{
    public sealed class GetHashtagResponseData
    {
        public List<GetHashtagResponseDataItem> Hashtags { get; set; }

        public GetHashtagResponseData()
        {
            Hashtags = new List<GetHashtagResponseDataItem>();
        }
    }
}
