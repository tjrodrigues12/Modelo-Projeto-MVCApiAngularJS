using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SISTEMAS_SED_APW.Areas.PortalSistemas.Controllers
{
    public class SistemasController : Controller
    {
        // GET: PortalSistemas/Sistemas
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Pesquisar()
        {
            return View();
        }
    }
}