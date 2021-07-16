using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepoTag.API.Services;
using RepoTag.Domain;
using RepoTag.Domain.Users;

namespace RepoTag.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TokenService _tokenService;

        public UserController(TokenService tokenService)
        {
            _tokenService = tokenService;
        }
        
        [HttpPost]
        [Route("login/{email}/{pass}")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate(string email, string pass)
        {
            var user = UserRepository.Get(email, pass);

            if (user == null) return NotFound(new { message = "Usuário ou senha inválidas" });

            var token = _tokenService.GenerateToken(user);
            user.Password = "";
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
