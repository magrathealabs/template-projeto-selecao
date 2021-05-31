using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using System;
using System.IO;

namespace gerenciador_hashtags_twitter.DependencyInjections
{
    /// <summary>
    /// Extensões do container <see cref="IServiceCollection"/> e do <see cref="IApplicationBuilder"/> para aprimorar
    /// e segmentar as configurações para injeção de dependência do Swagger.
    /// </summary>
    public static class SwaggerExtensions
    {
        /// <summary>
        /// Extensão do ServiceCollection para adicionar o Swagger aos containers de Injeção de Depência.
        /// </summary>
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(
                options =>
                {
                    var provider = services.BuildServiceProvider()
                    .GetRequiredService<IApiVersionDescriptionProvider>();

                    foreach (var description in provider.ApiVersionDescriptions)
                    {
                        options.SwaggerDoc(description.GroupName, new OpenApiInfo
                        {
                            Title = "gerenciador-hashtags-twitter.WebAPI",
                            Version = description.ApiVersion.ToString(),
                            Contact = new OpenApiContact
                            {
                                Name = "Larissa",
                                Email = "larissa.jucre@gmail.com"
                            },
                            Description = "This API is recommended for monitoring twitter hashtags."
                        });
                    }

                    var path = Path.Combine(AppContext.BaseDirectory, "gerenciador-hashtags-twitter.xml");
                    options.IncludeXmlComments(path);
                });

            return services;
        }

        /// <summary>
        /// Prepara o Swagger e o SwaggerUI (interface do Swagger).
        /// </summary>
        public static IApplicationBuilder UseVersionedSwagger(this IApplicationBuilder app, IApiVersionDescriptionProvider provider)
        {
            app.UseSwagger();
            app.UseSwaggerUI(
                options =>
                {
                    options.DocumentTitle = "gerenciador-hashtags-twitter.WebAPI Documentation";
                    // Constrói uma interface visual do Swagger para cada Endpoint de Versão encontrado na aplicação
                    foreach (var description in provider.ApiVersionDescriptions)
                    {
                        options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                    }

                    options.RoutePrefix = string.Empty;
                    options.DocExpansion(DocExpansion.List);
                });

            return app;
        }
    }
}