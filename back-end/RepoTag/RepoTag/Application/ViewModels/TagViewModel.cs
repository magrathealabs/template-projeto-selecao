using RepoTag.Domain.Tags;
using System;

namespace RepoTag.Application.ViewModels
{
    public class TagViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Colors Color { get; set; }
    }
}