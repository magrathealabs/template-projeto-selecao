using gerenciador_hashtags_twitter.Application.DTOs.Interfaces;
using System;
using System.Collections.Generic;

namespace gerenciador_hashtags_twitter.Application.DTOs.Response.API
{
    public class SearchTweetsResponseData : IResponseData
    {
        public List<SearchTweetsResponseDataItem> data { get; set; }
        public IncludesResponseData includes { get; set; }
    }
}
