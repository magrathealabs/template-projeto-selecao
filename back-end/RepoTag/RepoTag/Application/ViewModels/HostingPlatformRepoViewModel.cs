using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Application.ViewModels
{
    public class HostingPlatformRepoViewModel
    {
        public int Id { get; set; }
        [JsonProperty("full_name")]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
