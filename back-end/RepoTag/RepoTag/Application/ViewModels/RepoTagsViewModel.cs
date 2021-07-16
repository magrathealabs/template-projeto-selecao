using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Application.ViewModels
{
    public class RepoTagsViewModel
    {
        public Guid RepoId { get; set; }
        public int HostingPlatformRepoId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IEnumerable<TagViewModel> Tags { get; set; }
    }
}
