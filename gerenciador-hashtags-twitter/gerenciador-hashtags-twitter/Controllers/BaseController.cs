using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace gerenciador_hashtags_twitter.Controllers
{
    public abstract class BaseController : Controller
    {
        public IActionResult ActionResult { get; private set; }

        protected void ReturnSuccessResult(object returnObj)
        {
            ActionResult = new OkObjectResult(returnObj)
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        protected void ReturnNoContentResult()
        {
            ActionResult = new NoContentResult();
        }

        protected void ReturnNotFoundResult(object value)
        {
            ActionResult = new ObjectResult(value)
            {
                StatusCode = StatusCodes.Status404NotFound
            };
        }

        protected void ReturnCreatedResult(object returnObj)
        {
            ActionResult = new OkObjectResult(returnObj)
            {
                StatusCode = StatusCodes.Status201Created
            };
        }

        protected void ReturnCancelledResult()
        {
            ActionResult = new NoContentResult();
        }

        protected void ReturnUnprocessableEntityObjectResult(string error)
        {
            ActionResult = new UnprocessableEntityObjectResult(error);
        }

        protected void ReturnBadRequestResult(string message)
        {
            ActionResult = new BadRequestObjectResult(message);
        }

        protected void ReturnConflictedEntityResult(string message)
        {
            ActionResult = new ConflictObjectResult(message);
        }

        protected void ReturnInternalServerErrorResult(Exception ex)
        {
            ActionResult = new StatusCodeResult(500);
        }

        protected void ReturnServiceUnavaiable(Exception ex)
        {
            //Service unavaiable
            ActionResult = new StatusCodeResult(503);
        }

        protected void ReturnUnauthorizedResult()
        {
            ActionResult = new UnauthorizedResult();
        }

        protected void ReturnForbidenResult()
        {
            ActionResult = new ForbidResult();
        }
    }
}
