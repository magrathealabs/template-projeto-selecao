using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Application.ViewModels
{
    public class UserCreateViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string HostingPlatformUsername { get; set; }
        public string Password { get; set; }
    }
}
