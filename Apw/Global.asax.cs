using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SISTEMAS_SED_APW
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_PostAuthorizeRequest()

        {
            HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        }

        protected void Application_EndRequest()
        {
            var context = new HttpContextWrapper(Context);
            if (Context.Response.StatusCode == 404 && !context.Request.IsAjaxRequest() && !context.Request.RawUrl.StartsWith("/api/"))
            {
                Response.Clear();

                var rd = new RouteData();
                rd.DataTokens["area"] = "";
                rd.Values["controller"] = "Home";
                rd.Values["action"] = "Index";

                IController c = new Controllers.HomeController();
                c.Execute(new RequestContext(new HttpContextWrapper(Context), rd));
            }
        }
    }
}