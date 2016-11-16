using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNetCore.Http;
using React.AspNet;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

[assembly: OwinStartup(typeof(LibraryGradProject.Startup))]

namespace LibraryGradProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app){ }

    }

   

}
