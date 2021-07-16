using RepoTag.Application.Interfaces;
using RepoTag.Application.ViewModels;
using RestEase;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace RepoTag.AntiCorruption
{
    public class HostingPlatformService : IHostingPlatformService
    {
        
        public async Task<List<HostingPlatformRepoViewModel>> GetStarredRepositories(string hostingPlatformUsername)
        {
            var gitHubApi = RestClient.For<IHostingPlatformService>("https://api.github.com/");
            return await gitHubApi.GetStarredRepositories(hostingPlatformUsername);
        }
    }
}
