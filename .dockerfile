FROM mcr.microsoft.com/dotnet/core/aspnet:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:5.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore 
RUN dotnet build --no-restore -c Release -o /app

FROM build AS publish
RUN dotnet publish --no-restore -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
# Padrão de container ASP.NET
# ENTRYPOINT ["dotnet", "gerenciador-hashtags-twitter.WebAPI"]
# Opção utilizada pelo Heroku
CMD ASPNETCORE_URLS=http://*:$PORT dotnet gerenciador-hashtags-twitter.WebAPI.dll