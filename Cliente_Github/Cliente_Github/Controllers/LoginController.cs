using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Cliente_Github.Controllers
{

    public class LoginController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult logingithub()
        {
            ViewBag.error = "Breve aqui: Login com o GitHub !";
            return View("Index");
        }

        public IActionResult Login(string username, string password)
        {
            HttpContext.Session.SetString("username", "");
            HttpContext.Session.SetString("password", "");

            if (username != null && password != null)
            {
                Classes.clsGithub cgh = new Classes.clsGithub();
                var ret = cgh.login(username, password);

                if (ret)
                {
                    //IReadOnlyList<Octokit.Repository> repos = cgh.getGitHubRepository(username, password);

                    //IList<Models.Repositorio> repositorio = new List<Models.Repositorio>();
                    //foreach (var rep in repos)
                    //{
                    //    repositorio.Add(new Models.Repositorio() { Id = rep.Id, Descricao = rep.FullName, Nome = rep.Name, Url = rep.Url });
                    //}

                    HttpContext.Session.SetString("username", username);
                    HttpContext.Session.SetString("password", password);
                    return RedirectToAction("Repositorios", "Repositorios");
                    //return View("../Repositorios/Repositorios");
                }
                else
                {
                    ViewBag.error = "Usuário e/ou Senha incorreto(s)";
                    return View("Index");
                }
            }
            else
            {
                ViewBag.error = "Usuário e/ou Senha incorreto(s)";
                return View("Index");
            }
        }
    }
}
