using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepoTag.Domain.Tags
{
    public class TagService : ITagService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TagService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Tag Create(string name, Colors color, User user)
        {
            var newTag = new Tag(name, color, user);
            _unitOfWork.Tags.Add(newTag);
            return newTag;
        }

        public IEnumerable<Repository> TryInsertRepos(List<int> hostingPlatformRepositoryIds, User user)
        {
            var repos = _unitOfWork.Tags.GetAllReposByUser(user);
            var newRepos = new List<Repository>();

            foreach (var hostingPlatformRepositoryId in hostingPlatformRepositoryIds)
            {
                if (!repos.Any(r => r.HostingPlatformRepositoryId == hostingPlatformRepositoryId))
                {
                    newRepos.Add(new Repository(hostingPlatformRepositoryId, user));
                }
            }

            _unitOfWork.Tags.AddRepos(newRepos);
            return newRepos;
        }
    }
}
