using RepoTag.Application.ViewModels;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RepoTag.Application.Interfaces
{
    public interface ITagAppService
    {
        Task<List<RepoTagsViewModel>> GetRepoTags(string email, string hostingPlatformUsername);
        List<TagViewModel> GetTags(User user);
        void UpsertAndRemove(List<TagViewModel> upsertTags, User user);
    }
}
