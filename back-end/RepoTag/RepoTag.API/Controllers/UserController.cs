using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepoTag.API.Services;
using RepoTag.API.ViewModels;
using RepoTag.Application.Interfaces;
using RepoTag.Application.ViewModels;

namespace RepoTag.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly IUserAppService _userAppService;

        public UserController(TokenService tokenService, IUserAppService userAppService)
        {
            _tokenService = tokenService;
            _userAppService = userAppService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<UserReadViewModel>> Create([FromBody] UserCreateViewModel userCreateViewModel)
        {
            try
            {
                var userCreated = _userAppService.Create(userCreateViewModel);
                return userCreated;
            }
            catch (RepoTagException ex)
            {
                return BadRequest(new { ErrorMessage = ex.Message });
            }
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] UserLoginViewModel userLoginViewModel)
        {
            var user = _userAppService.Get(userLoginViewModel.Email, userLoginViewModel.Password);

            if (user is null) return NotFound(new { message = "Usuário ou senha inválidas" });

            var token = _tokenService.GenerateToken(user);

            return new
            {
                user,
                token
            };
        }

        [HttpGet]
        [Route("auth")]
        [Authorize]
        public string Auth() => $"User autenticado: {User.Identity.Name}\nAuth Type: {User.Identity.AuthenticationType}";
    }
}
