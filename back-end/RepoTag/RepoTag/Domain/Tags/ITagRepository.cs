using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain.Tags
{
    public interface ITagRepository : IRepository<Tag>
    {
        void UpdateRepoTags(List<Tag> tags, Guid repoId);
        void AddRepos(List<Repository> repos);
        IEnumerable<Repository> GetAllReposByUser(User user);
        IEnumerable<Tag> GetByRepoIdsAndUser(List<Guid> repoIds, User user);
        IEnumerable<Tag> GetAllByUser(User user);
        IEnumerable<Tag> GetAllByRepoAndUser(Guid repoId, User user);
        void RemoveRepoTags(List<Tag> tags, Guid repoId, User user);
        void AddRepoTag(Guid tagId, Guid repoId, User user);
    }
}
