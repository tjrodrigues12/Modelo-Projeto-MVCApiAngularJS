using Servico.Seguranca;
using SISTEMAS_SED_APW.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SISTEMAS_SED_APW.Areas.PortalSistemas.Models
{
    [CustomAuthorize("PortalSistemas")]
    public class AreaController : BaseController
    {
    }
}