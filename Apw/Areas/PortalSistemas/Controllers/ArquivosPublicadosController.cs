using Arquitetura.Util.Generic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SISTEMAS_SED_APW.Areas.PortalSistemas.Controllers
{
    public class ArquivosPublicadosController : Controller
    {
        // GET: PortalSistemas/ArquivosPublicados
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