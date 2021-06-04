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
    public class TweetController :
        BaseController
    {
        private readonly ITweetService _tweetService;
        public TweetController(ITweetService tweetService)
        {
            _tweetService = tweetService;
        }

        /// <summary>
        /// Obter os tweets com base em uma hashtag.
        /// </summary>
        /// <response code="200"></response>
        /// <response code="401"></response>
        /// <response code="403"></response>
        /// <response code="422"></response>
        /// <response code="500"></response>
        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get([FromQuery]Guid hashtagId)
        {
            try
            {
                var requestData = new GetTweetsRequestData()
                {
                    HashtagId = hashtagId
                };

                var tweets = await _tweetService.Get(requestData);

                ReturnSuccessResult(tweets);
            }
            catch (ApplicationInvalidEntityException invalidEntityEx)
            {
                ReturnUnprocessableEntityObjectResult(invalidEntityEx.Message);
            }
            catch (ApplicationPermissionDeniedException)
            {
                ReturnForbidenResult();
            }
            catch (ApplicationUnauthorizedException)
            {
                ReturnUnauthorizedResult();
            }
            catch(Exception ex)
            {
                ReturnInternalServerErrorResult(ex);
            }

            return ActionResult;
        }
    }
}
