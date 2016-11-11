using Autofac;
using Autofac.Integration.WebApi;
using LibraryGradProject.Context;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;

namespace LibraryGradProject
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            // Autofac
            var builder = new ContainerBuilder();            

            // Register Web API controllers
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Register types
            builder.RegisterType<BookDbRepository>().As<IRepository<Book>>().InstancePerRequest();
            builder.RegisterType<BookReservationDbRepository>().As<IRepository<BookDbReservation>>().InstancePerRequest();
            builder.RegisterType<FilledBookDbRepository>().As<IRepository<Book>>().InstancePerRequest();

            builder.RegisterType<BookContext>().As<BookContext>().InstancePerLifetimeScope();

            // Set the dependency resolver to be Autofac
            var container = builder.Build();
            var config = GlobalConfiguration.Configuration;
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}
