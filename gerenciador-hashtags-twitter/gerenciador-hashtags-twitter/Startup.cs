using gerenciador_hashtags_twitter.BackgroundServices;
using gerenciador_hashtags_twitter.DependencyInjections;
using gerenciador_hashtags_twitter.Securities.Application;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace gerenciador_hashtags_twitter
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddControllers();
            services.AddApiVersioning();
            services.AddHasher();
            services.AddInMemoryDb();
            services.AddServices();
            services.AddVersionedApiExplorer(p =>
            {
                p.GroupNameFormat = "'v'V";
                p.SubstituteApiVersionInUrl = true;
            });
            services.AddSwagger();
            services.AddJWTAuthentication(Configuration);
            services.AddHostedService<TweetSearcherJob>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApiVersionDescriptionProvider provider)
        {
            app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseVersionedSwagger(provider);
            app.UseAuthorization();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
