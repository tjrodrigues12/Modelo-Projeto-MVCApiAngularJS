using System.Web;
using System.Web.Optimization;

namespace SISTEMAS_SED_APW
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Legado

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css"
                      //"~/Content/site.css",
                      //"~/Content/ui-bootstrap-csp.css",
                      //"~/Content/bootstrap-popover.css"
                      ));

            #endregion

            #region Layout

            bundles.Add(new StyleBundle("~/bundles/angular/css").Include(
                "~/Content/ui-grid.css",
                "~/Content/angular-busy.min.css",
                "~/Content/select.css",
                "~/Content/select.min.css",
                "~/Content/select.min.css.map",
                "~/Content/select2.css",
                "~/Content/angular-toastr.min.css"
                //"~/Scripts/angular-csp.css",

                ));

            #endregion

            #region Angular

            bundles.Add(new Bundle("~/bundles/angular/scripts").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-route.min.js",
                "~/Scripts/angular-touch.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/angular-busy.min.js",
                "~/Scripts/angular-animate.min.js",
                "~/Scripts/ui-grid-custom.min.js",
                "~/Scripts/angular-translate.min.js",
                "~/Scripts/angular-translate-loader-static-files.min.js",
                "~/Scripts/angular-validation/angular-validation.min.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js",
                "~/Scripts/i18n/angular-locale_pt-br.js",
                "~/Scripts/angular-toastr.min.js",
                "~/Scripts/angular-toastr.tpls.min.js",
                "~/Scripts/angular-input-masks-standalone.min.js",
                "~/Scripts/select.min.js"
            ));

            bundles.Add(new Bundle("~/bundles/global").Include(
                "~/app/globalApp/modules/globalMdl.js",
                "~/app/globalApp/services/globalSvc.js",
                "~/app/globalApp/directives/dropDownDir.js",
                "~/app/globalApp/directives/validationDecoratorDir.js",
                "~/app/globalApp/directives/modalDir.js",
                "~/app/globalApp/directives/tabsDir.js",
                "~/app/globalApp/directives/trocarUnidadeEscolarDir.js",
                "~/app/globalApp/directives/loginDir.js",
                "~/app/globalApp/controllers/trocarUnidadeEscolarCtrl.js",
                "~/app/globalApp/controllers/loginCtrl.js",
                "~/app/globalApp/services/trocarUnidadeEscolarSvc.js",
                "~/app/globalApp/services/loginSvc.js"
            ));

            #endregion

            #region Acesso

            bundles.Add(new ScriptBundle("~/bundles/autenticar").Include(
                                         "~/app/AcessoApp/modules/acessoMdl.js",
                                         "~/app/AcessoApp/services/acessoSvc.js",
                                         "~/app/AcessoApp/controllers/acesso/indexCtrl.js",
                                         "~/app/AcessoApp/controllers/acesso/loginCtrl.js",
                                         "~/app/AcessoApp/controllers/acesso/primeiroAcessoCtrl.js",
                                         "~/app/AcessoApp/controllers/acesso/esqueciMinhaSenhaCtrl.js"));

            #endregion

            #region Portal Sistemas App

            #region Portal Tipo Acesso

            bundles.Add(new ScriptBundle("~/bundles/PortalSistemas/PortalTipoAcesso").Include(
                                         "~/app/portalSistemasApp/modules/portalTipoAcessoMdl.js",
                                         "~/app/portalSistemasApp/services/portalTipoAcessoSvc.js",
                                         "~/app/portalSistemasApp/controllers/portalTipoAcesso/indexCtrl.js",
                                         "~/app/portalSistemasApp/controllers/portalTipoAcesso/pesquisarCtrl.js"
                                         ));
            #endregion

            #region Sistemas

            bundles.Add(new ScriptBundle("~/bundles/sistemas").Include(
                                         "~/app/portalSistemasApp/modules/sistemasMdl.js",
                                         "~/app/portalSistemasApp/services/sistemasSvc.js",
                                         "~/app/portalSistemasApp/controllers/sistemas/indexCtrl.js",
                                         "~/app/portalSistemasApp/controllers/sistemas/pesquisarCtrl.js"
                                         ));

            #endregion

            #region Simular Acesso

            bundles.Add(new ScriptBundle("~/bundles/simularAcesso").Include(
                                         "~/app/portalSistemasApp/modules/simularAcessoMdl.js",
                                         "~/app/portalSistemasApp/services/simularAcessoSvc.js",
                                         "~/app/portalSistemasApp/controllers/simularAcesso/indexCtrl.js",
                                         "~/app/portalSistemasApp/controllers/simularAcesso/pesquisarCtrl.js"
                                         ));

            #endregion

            #endregion

#if (DEBUG)
            BundleTable.EnableOptimizations = false;
#else
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}