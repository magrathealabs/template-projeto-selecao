using RepoTag.Application.ViewModels;
using RestEase;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RepoTag.Application.Interfaces
{
    [Header("User-Agent", "RepoTagService")]
    public interface IHostingPlatformService
    {
        [Get("users/{hostingPlatformUsername}/starred")]
        Task<List<HostingPlatformRepoViewModel>> GetStarredRepositories([Path] string hostingPlatformUsername);
    }
}
