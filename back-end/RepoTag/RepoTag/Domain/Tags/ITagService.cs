using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Tags
{
    public interface ITagService
    {
        Tag Create(string name, Colors color, User user);
        IEnumerable<Repository> TryInsertRepos(List<int> hostingPlatformRepositoryIds, User user);
    }
}
