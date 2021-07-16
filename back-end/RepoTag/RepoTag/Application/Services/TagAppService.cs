using RepoTag.Application.Interfaces;
using RepoTag.Application.ViewModels;
using RepoTag.Domain;
using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepoTag.Application.Services
{
    public class TagAppService : ITagAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHostingPlatformService _hostingPlatformService;
        private readonly ITagService _tagService;

        public TagAppService(IUnitOfWork unitOfWork, IHostingPlatformService hostingPlatformService,
            ITagService tagService)
        {
            _unitOfWork = unitOfWork;
            _hostingPlatformService = hostingPlatformService;
            _tagService = tagService;
        }

        public async Task<List<RepoTagsViewModel>> GetRepoTags(User user)
        {
            var hostingPlatformRepos = await _hostingPlatformService.GetStarredRepositories(user.HostingPlatformUsername);
            _tagService.TryInsertRepos(hostingPlatformRepos.Select(hpr => hpr.Id).ToList(), user);

            var repos = _unitOfWork.Tags.GetAllReposByUser(user);
            var repoTagsViewModels = new List<RepoTagsViewModel>();
            foreach (var hostingPlatformRepo in hostingPlatformRepos)
            {
                var repoTagsViewModel = new RepoTagsViewModel()
                {
                    HostingPlatformRepoId = hostingPlatformRepo.Id,
                    Name = hostingPlatformRepo.Name,
                    Description = hostingPlatformRepo.Description,
                    RepoId = repos.First(r => r.HostingPlatformRepositoryId == hostingPlatformRepo.Id).Id,
                };
                repoTagsViewModel.Tags = MapTagsToViewModels(_unitOfWork.Tags.GetAllByRepoAndUser(repoTagsViewModel.RepoId, user));

                repoTagsViewModels.Add(repoTagsViewModel);
            }
            
            return repoTagsViewModels;
        }

        public List<TagViewModel> GetTags(User user)
        {
            return MapTagsToViewModels(_unitOfWork.Tags.GetAllByUser(user));
        }

        public void UpsertAndRemove(List<TagViewModel> tagsViewModel, User user)
        {
            var tags = _unitOfWork.Tags.GetAllByUser(user).ToList();
            foreach (var tagViewModel in tagsViewModel)
            {
                var tag = tags.FirstOrDefault(t => t.Id.Equals(tagViewModel.Id));
                if (tag != null)
                {
                    if (tag.Name != tagViewModel.Name || tag.Color != tagViewModel.Color)
                    {
                        tag.Name = tagViewModel.Name;
                        tag.Color = tagViewModel.Color;
                        _unitOfWork.Tags.Update(tag);
                    }
                    tags.Remove(tag);
                }
                else
                {
                    _tagService.Create(tagViewModel.Name, tagViewModel.Color, user);
                }
            }

            _unitOfWork.Tags.RemoveRange(tags);

            _unitOfWork.SaveChanges();
        }


        public void InsertOrRemoveTags(List<TagViewModel> tagsViewModel, Guid repoId, User user)
        {
            if (repoId.Equals(Guid.Empty)) throw new ArgumentException("Id do repositório deve ser não vazio.", "repoId");
            if (tagsViewModel.Any(t => t.Id.Equals(Guid.Empty))) throw new ArgumentException("Todos os Ids das tags devem ser não vazios.", "tags");

            var tags = _unitOfWork.Tags.GetAllByRepoAndUser(repoId, user).ToList();
            foreach (var tagViewModel in tagsViewModel)
            {
                var tag = tags.FirstOrDefault(t => t.Id.Equals(tagViewModel.Id));
                if (tag != null)
                {
                    tags.Remove(tag);
                }
                else
                {
                    _unitOfWork.Tags.AddRepoTag(tagViewModel.Id, repoId, user);
                }
            }

            _unitOfWork.Tags.RemoveRepoTags(tags, repoId, user);

            _unitOfWork.SaveChanges();
        }

        private TagViewModel MapTagToViewModel(Tag tag)
        {
            return new TagViewModel()
            {
                Id = tag.Id,
                Name = tag.Name,
                Color = tag.Color
            };
        }

        private List<TagViewModel> MapTagsToViewModels(IEnumerable<Tag> tags)
        {
            return tags.Select(t => MapTagToViewModel(t)).ToList();
        }
    }
}
