using System.Collections.Generic;
using Cliente_Github.Classes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Octokit;

namespace Client_Github_Unit_Tests
{
    public class UnitclsGitHub
    {

        clsGithub cgh = new clsGithub();

        [TestMethod]
        public void Login()
        {
            bool ret = cgh.login("fulano", "ciclano");
            Assert.IsFalse(ret);

        }

        public void getGitHubRepository()
        {
            IReadOnlyList<Repository> tRepo = null;
            tRepo = cgh.getGitHubRepository("fulano", "ciclano");
            Assert.IsNull(tRepo);
        }

        public void getReposFiltro()
        {
            IReadOnlyList<Repository> tRepo = null;
            tRepo = cgh.getReposFiltro("fulano", "ciclano", "teste");
            Assert.IsNull(tRepo);
        }
    }
}
