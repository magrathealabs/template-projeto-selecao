using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using RepoTag.Application.Services;
using RepoTag.Data;
using RepoTag.Domain;
using RepoTag.Domain.Tags;
using RepoTag.Domain.Users;
using RepoTag.Application.Interfaces;
using RepoTag.Data.Repositories;

namespace RepoTag.Web
{
    public static class IoC
    {
        public static void AddRepoTagService(this IServiceCollection services)
        {
            services.AddScoped<ITagAppService, TagAppService>();
            services.AddScoped<IUserAppService, UserAppService>();

            services.AddScoped<ITagService, TagService>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<RepoTagDbContext>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITagRepository, TagRepository>();
        }
    }
}
