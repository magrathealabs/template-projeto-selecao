using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Tags
{
    public class RepositoryTag : Entity
    {
        public Repository Repository { get; set; }
        public Tag Tag { get; set; }
    }
}
