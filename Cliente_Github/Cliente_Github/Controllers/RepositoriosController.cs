using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;


namespace Cliente_Github.Controllers
{
    public class RepositoriosController : Controller
    {

        public IActionResult Repositorios()
        {
            
            string username = HttpContext.Session.GetString("username");
            string password = HttpContext.Session.GetString("password");

            if(username == "" | password == "")
            {
                return RedirectToAction("Index", "Login");
            } else {
                Classes.clsGithub cgh = new Classes.clsGithub();

                IReadOnlyList<Octokit.Repository> repos = cgh.getGitHubRepository(username, password);

                return View(MontaModel(repos));
            }
        }

        public IActionResult Logout()
        {
            HttpContext.Session.SetString("username", "");
            HttpContext.Session.SetString("password", "");

            return RedirectToAction("Index","Login");
        }

        public IActionResult Stars()
        {
            Classes.clsGithub cgh = new Classes.clsGithub();
            string username = HttpContext.Session.GetString("username");
            string password = HttpContext.Session.GetString("password");

            IReadOnlyList<Octokit.Repository> repos = cgh.getGitHubRepository(username, password, true);

            return View("Repositorios", MontaModel(repos));

        }

        private List<Models.Repositorio> MontaModel(IReadOnlyList<Octokit.Repository> repos)
        {
            List<Models.Repositorio> repositorio = new List<Models.Repositorio>();
            foreach (var repo in repos)
            {
                repositorio.Add(new Models.Repositorio()
                {
                    Id = repo.Id,
                    Descricao = repo.Description,
                    Nome = repo.Name,
                    Url = repo.Url
                });
            }
            return repositorio;
        }

    }
}
