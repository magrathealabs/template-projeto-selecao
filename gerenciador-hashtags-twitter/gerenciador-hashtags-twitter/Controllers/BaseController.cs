using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace gerenciador_hashtags_twitter.Controllers
{
    public abstract class BaseController : Controller
    {
        public IActionResult ViewModel { get; private set; }

        protected void ReturnSuccessResult(object returnObj)
        {
            ViewModel = new OkObjectResult(returnObj)
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        protected void ReturnNoContentResult()
        {
            ViewModel = new NoContentResult();
        }

        protected void ReturnNotFoundResult(object value)
        {
            ViewModel = new ObjectResult(value)
            {
                StatusCode = StatusCodes.Status404NotFound
            };
        }

        protected void ReturnCreatedResult(object returnObj)
        {
            ViewModel = new OkObjectResult(returnObj)
            {
                StatusCode = StatusCodes.Status201Created
            };
        }

        protected void ReturnCancelledResult()
        {
            ViewModel = new NoContentResult();
        }

        protected void ReturnUnprocessableEntityObjectResult(string error)
        {
            ViewModel = new UnprocessableEntityObjectResult(error);
        }

        protected void ReturnBadRequestResult(string message)
        {
            ViewModel = new BadRequestObjectResult(message);
        }

        protected void ReturnConflictedEntityResult(string message)
        {
            ViewModel = new ConflictObjectResult(message);
        }

        protected void ReturnInternalServerErrorResult(Exception ex)
        {
            ViewModel = new StatusCodeResult(500);
        }

        protected void ReturnServiceUnavaiable(Exception ex)
        {
            //Service unavaiable
            ViewModel = new StatusCodeResult(503);
        }

        protected void ReturnUnauthorizedResult()
        {
            ViewModel = new UnauthorizedResult();
        }

        protected void ReturnForbidenResult()
        {
            ViewModel = new ForbidResult();
        }
    }
}
