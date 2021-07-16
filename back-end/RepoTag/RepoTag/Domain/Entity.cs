using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain
{
    public class Entity
    {
        public Guid Id { get; set; }

        public Entity()
        {
            Id = Guid.NewGuid();
        }
    }
}
