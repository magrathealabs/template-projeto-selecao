using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Tags
{
    public class Tag : Entity, IAggregateRoot
    {
        public User User { get; set; }
        public string Name { get; set; }
        public Colors Color { get; set; }

        protected Tag() { }

        public Tag(string name, Colors color, User user)
        {
            Name = name;
            Color = color;
            User = user;
        }
    }
}
