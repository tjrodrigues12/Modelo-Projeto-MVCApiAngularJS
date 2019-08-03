//using SISTEMAS_SED_APW.Models;
//using Servico.Pronatec;
using Dominio.Autenticacao;
using Servico.Seguranca;
using SISTEMAS_SED_APW.Models;
using System.Configuration;
using System.Web.Mvc;

namespace SISTEMAS_SED_APW.Controllers
{
    public class HomeController : Controller
    {
        //public ActionResult Index()
        //{
        //    if (ConfigurationManager.AppSettings["AppAmbiente"].ToString() == "Desenvolvimento" && GerenciadorSessao.UsuarioLogado == null)
        //    {
        //        var autenticacao = new Autenticacao();

        //        autenticacao.AutenticarDesenvolvimento();

        //        GerenciadorSessao.UsuarioLogado = autenticacao.UsuarioAutenticacaoLogado;
        //    }
        //    else if (GerenciadorSessao.UsuarioLogado == null)
        //    {
        //        return RedirectToAction("Index", "Acesso");
        //    }

        //    if (GerenciadorSessao.UsuarioLogado.AtualizarCadastro)
        //    {
        //        return RedirectToAction("Index", "AtualizacaoCadastral", new { area = "Pronatec" });
        //    }

        //    return View();
        //}

        public ActionResult Index()
        {
            //UsuarioAutenticacao usuario = new UsuarioAutenticacao
            //{
            //    UnidadeEscolar = "escola",
            //    Municipio = "Municipio",
            //    NomeCompleto = "Nome Completo",
            //    Perfil = "Perfil",
            //    UsuarioId = 1,
            //    MostrarTrocaPerfilUnidadeEscolar = true,

            //};
            //GerenciadorSessao.UsuarioLogado = usuario;
            ViewBag.Title = "Portal Sistemas SED-MS";
            return View();
        }
    }
}