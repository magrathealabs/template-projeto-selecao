using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public sealed class UserController 
        : BaseController
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Create a new user.
        /// </summary>
        /// <param name="requestData"></param>
        /// <response code="201"></response>
        /// <response code="400"></response>
        /// <response code="409"></response>
        /// <response code="500"></response>
        [AllowAnonymous]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody]CreateUserRequestData requestData)
        {
            try
            {
                var createdUser = await _userService.Create(requestData);

                ReturnCreatedResult(createdUser);
            }
            catch (ApplicationInvalidDataException invalidDataEx)
            {
                ReturnBadRequestResult(invalidDataEx.Message);
            }
            catch(ApplicationDuplicatedDataException duplicatedDataEx)
            {
                ReturnConflictedEntityResult(duplicatedDataEx.Message);
            }
            catch (Exception ex)
            {
                ReturnInternalServerErrorResult(ex);
            }

            return ActionResult;
        }
    }
}
