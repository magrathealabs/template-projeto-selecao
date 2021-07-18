using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepoTag.Application.Interfaces;

namespace RepoTag.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagAppService _tagAppService;

        public TagController(ITagAppService tagAppService)
        {
            _tagAppService = tagAppService;
        }

        [HttpGet]
        [Route("repotags/{email}/{hostingPlatformUserName}")]
        [Authorize]
        public async Task<ActionResult<dynamic>> GetRepoTags(string email, string hostingPlatformUserName)
        {
            var repoTags = await _tagAppService.GetRepoTags(email, hostingPlatformUserName);
            return repoTags;
        }
    }
}
