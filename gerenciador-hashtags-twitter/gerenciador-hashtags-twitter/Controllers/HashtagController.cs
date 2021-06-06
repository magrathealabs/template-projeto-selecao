using gerenciador_hashtags_twitter.Application.DTOs.Request.Service;
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
        public HashtagController(
            IHashtagService hashtagService)
        {
            _hashtagService = hashtagService;
        }

        /// <summary>
        /// Create a new hashtag.
        /// </summary>
        /// <param name="requestData"></param>
        /// <response code="201"></response>
        /// <response code="401"></response>
        /// <response code="400"></response>
        /// <response code="409"></response>
        /// <response code="500"></response>
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add([FromBody]AddHashtagRequestData requestData)
        {
            try
            {
                var createdHashtag = await _hashtagService.Add(requestData);

                ReturnCreatedResult(createdHashtag);
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

        /// <summary>
        /// Delete a hashtag.
        /// </summary>
        /// <param name="id"></param>
        /// <response code="204"></response>
        /// <response code="404"></response>
        /// <response code="401"></response>
        /// <response code="403"></response>
        /// <response code="500"></response>
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var requestData = new RemoveHashtagRequestData()
                {
                    Id = id
                };

                await _hashtagService.Remove(requestData);

                ReturnNoContentResult();
            }
            catch(ApplicationNotFoundException ex)
            {
                ReturnNotFoundResult(ex.Value);
            }
            catch(ApplicationUnauthorizedException)
            {
                ReturnUnauthorizedResult();
            }
            catch (ApplicationPermissionDeniedException)
            {
                ReturnForbidenResult();
            }
            catch (Exception ex)
            {
                ReturnInternalServerErrorResult(ex);
            }

            return ActionResult;
        }

        /// <summary>
        /// Gets the hashtags of the logged user.
        /// </summary>
        /// <response code="200"></response>
        /// <response code="401"></response>
        /// <response code="500"></response>
        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var hashtags = await _hashtagService.Get();

                ReturnSuccessResult(hashtags);
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
