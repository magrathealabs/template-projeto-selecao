using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Tags
{
    public class Repository : Entity
    {
        public int HostingPlatformRepositoryId { get; set; }
        public User User { get; set; }
    }
}
