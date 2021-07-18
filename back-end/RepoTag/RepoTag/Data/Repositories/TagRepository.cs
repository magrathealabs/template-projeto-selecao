using Microsoft.EntityFrameworkCore;
using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepoTag.Data.Repositories
{
    internal class TagRepository : RepositoryBase<Tag>, ITagRepository
    {

        public TagRepository(RepoTagDbContext context) : base(context)
        {
        }

        public void AddRepos(List<Repository> repos)
        {
            Db.Repositories.AddRange(repos);
        }

        public void AddRepoTag(Guid tagId, Guid repoId, User user)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Tag> GetAllByRepoAndUser(Guid repoId, User user)
        {
            return Db.RepositoryTags
                .Include(rt => rt.Tag)
                .Include(rt => rt.Tag.User)
                .Where(rt => rt.RepositoryId.Equals(repoId) && rt.Tag.User.Id.Equals(user.Id))
                .Select(rt => rt.Tag);
        }

        public IEnumerable<Tag> GetAllByUser(User user)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Repository> GetAllReposByUser(User user)
        {
            return Db.Repositories
                .Include(r => r.User)
                .Where(r => r.User.Id.Equals(user.Id));
        }

        public IEnumerable<Tag> GetByRepoIdsAndUser(List<Guid> repoIds, User user)
        {
            throw new NotImplementedException();
        }

        public void RemoveRepoTags(List<Tag> tags, Guid repoId, User user)
        {
            throw new NotImplementedException();
        }

        public void UpdateRepoTags(List<Tag> tags, Guid repoId)
        {
            throw new NotImplementedException();
        }
    }
}
