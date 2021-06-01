using gerenciador_hashtags_twitter.Application.Constants;
using gerenciador_hashtags_twitter.Application.DTOs.Request;
using gerenciador_hashtags_twitter.Application.DTOs.Response;
using gerenciador_hashtags_twitter.Application.Exceptions;
using gerenciador_hashtags_twitter.Application.Interfaces;
using gerenciador_hashtags_twitter.Domain.Models.Contracts;
using gerenciador_hashtags_twitter.Domain.Repositories;
using gerenciador_hashtags_twitter.Securities.Application;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace gerenciador_hashtags_twitter.Application.Services
{
    public sealed class JWTService :
        IJWTService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly IHasher _hasher;
        private List<Claim> _claims;
        public JWTService(
            IConfiguration configuration,
            IUserRepository userRepository,
            IHasher hasher)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _hasher = hasher;
            _claims = new List<Claim>();
        }
        public async Task<GetAcessTokenResponseData> GetAcessToken(GetAcessTokenRequestData requestData)
        {
            var user = await GetUser(requestData.Username)
                              .ConfigureAwait(false);

            ValidatePassword(user, requestData.Password);

            CreateClaims(user.Id, user.SecurityStamp);

            var token = CreateToken();

            return CreateResponseData(token);
        }

        private GetAcessTokenResponseData CreateResponseData(string token)
        {
            return new GetAcessTokenResponseData()
            {
                Token = token
            };
        }

        private string CreateToken()
        {
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var expiry = DateTime.Now.AddMinutes(1440);

            var securityKey = new SymmetricSecurityKey
                              (Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials
                              (securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(issuer: issuer,
                                             audience: audience,
                                             claims: _claims,
                                             expires: expiry,
                                             signingCredentials: credentials);

            var tokenHandler = new JwtSecurityTokenHandler();
            var stringToken = tokenHandler.WriteToken(token);
            return stringToken;
        }

        private void CreateClaims(Guid id, Guid securityStamp)
        {
            var claimUserId = new Claim(ClaimsNameConstants.UserId, id.ToString());
            _claims.Add(claimUserId);

            var claimSecurityStamp = new Claim(ClaimsNameConstants.SecurityStamp, securityStamp.ToString());
            _claims.Add(claimSecurityStamp);

        }

        private void ValidatePassword(IUser user, string password)
        {
            var isValid = _hasher.ValidHash(user.PasswordHash, password);

            if (!isValid)
                throw new ApplicationUnauthorizedException();
        }

        private async Task<IUser> GetUser(string username)
        {
            var user = await _userRepository.Find(username)
                                            .ConfigureAwait(false);

            if (user is null)
                throw new ApplicationUnauthorizedException();

            return user;
        }
    }
}
