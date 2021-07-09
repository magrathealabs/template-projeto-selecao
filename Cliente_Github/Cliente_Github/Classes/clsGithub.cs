using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Octokit;

namespace Cliente_Github.Classes
{
    public class clsGithub
    {
        public bool login(string usuario, string senha)
        {
            bool ret = false;

            try
            {
                User user = Task.Run(async () => await getGitHubUserAsync(usuario, senha)).Result;

                ret = (user != null);

            }
            catch (Exception)
            {

            }
            return ret;
        }

        public IReadOnlyList<Repository> getGitHubRepository(string usuario, string senha, bool star = false)
        {
            IReadOnlyList<Repository> Repositorios = null;
            GitHubClient client = this.GetGitHubClient(usuario, senha);
            User user = Task.Run(async () => await getGitHubUserAsync(usuario, senha)).Result;
            if (user != null)
            {
                try
                {
                    if (star)
                    {
                        Repositorios = Task.Run(async () => await client.Activity.Starring.GetAllForUser(user.Login)).Result;
                    } else
                    {
                        Repositorios = Task.Run(async () => await client.Repository.GetAllForUser(user.Login)).Result;
                    }
                    
                }
                catch (Exception)
                {

                }
            }

            return Repositorios;

        }

        private async Task<User> getGitHubUserAsync(string usuario, string senha)
        {

            User user = null;
            GitHubClient client = this.GetGitHubClient(usuario, senha);

            try
            {
                user = await client.User.Get(usuario);

            }
            catch (Exception)
            {

            }
            return user;

        }

        private GitHubClient GetGitHubClient(string usuario, string senha)
        {
            GitHubClient client = null;
            Credentials basicAuth = null;
            try
            {
                client = new GitHubClient(new ProductHeaderValue(usuario));
                basicAuth = new Credentials(usuario, senha, AuthenticationType.Basic);
                client.Credentials = basicAuth;
            }
            catch (Exception)
            {

            }
            return client;
        }

    }
}
