using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SISTEMAS_SED_APW.Areas.PortalSistemas.Controllers
{
    public class PortalTipoAcessoController : Controller
    {
        // GET: PortalSistemas/PortalTipoAcesso
        public ActionResult Index()
        {
            ViewBag.Title = "Portal Tipo Acesso";
            return View();
        }

        public ActionResult Pesquisar()
        {
            return View();
        }
    }
}