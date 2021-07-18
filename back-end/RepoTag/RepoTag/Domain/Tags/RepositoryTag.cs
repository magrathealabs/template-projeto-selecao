using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Tags
{
    public class RepositoryTag : Entity
    {
        public Guid RepositoryId { get; set; }
        public Guid TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
