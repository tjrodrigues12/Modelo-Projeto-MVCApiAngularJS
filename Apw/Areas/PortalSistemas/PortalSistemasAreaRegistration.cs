using System.Web.Mvc;

namespace SISTEMAS_SED_APW.Areas.PortalSistemas
{
    public class PortalSistemasAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "PortalSistemas";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "PortalSistemas_default",
                "PortalSistemas/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}