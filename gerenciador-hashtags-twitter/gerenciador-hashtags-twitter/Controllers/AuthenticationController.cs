using gerenciador_hashtags_twitter.Application.DTOs.Request.Service;
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
    public sealed class AuthenticationController :
        BaseController
    {
        private readonly IJWTService _jwtService;
        public AuthenticationController(
            IJWTService jwtService)
        {
            _jwtService = jwtService;
        }

        /// <summary>
        /// Create a new token acess.
        /// </summary>
        /// <param name="requestData"></param>
        ///<response code="200"></response>
        ///<response code="401"></response>
        ///<response code="500"></response>
        [AllowAnonymous]
        [HttpPost]
        [Route("token")]
        public async Task<IActionResult> GetAcessToken([FromBody]GetAcessTokenRequestData requestData)
        {
            try
            {
                var token = await _jwtService.GetAcessToken(requestData);

                ReturnSuccessResult(token);
            }
            catch (ApplicationUnauthorizedException)
            {
                ReturnUnauthorizedResult();
            }
            catch (Exception ex)
            {
                ReturnInternalServerErrorResult(ex);
            }

            return ActionResult;
        }
    }
}
