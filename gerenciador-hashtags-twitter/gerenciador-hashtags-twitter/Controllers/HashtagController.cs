using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public sealed class HashtagController :
        BaseController
    {
        private readonly IHashtagService _hashtagService;
        public HashtagController(IHashtagService hashtagService)
        {
            _hashtagService = hashtagService;
        }

        /// <summary>
        /// Create a new hashtag.
        /// </summary>
        /// <param name="requestData"></param>
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add([FromBody]AddHashtagRequestData requestData)
        {
            try
            {
                var createdHashtag = await _hashtagService.Add(requestData);

                ReturnSuccessResult(createdHashtag);
            }
            catch (ApplicationUnauthorizedException)
            {
                ReturnUnauthorizedResult();
            }
            catch (ApplicationInvalidDataException invalidDataEx)
            {
                ReturnBadRequestResult(invalidDataEx.Message);
            }
            catch (ApplicationDuplicatedDataException duplicatedDataEx)
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
