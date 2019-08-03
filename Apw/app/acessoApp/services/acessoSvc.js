acessoMdl.service('acessoSvc', ['$http', 'globalSvc',
    function ($http, globalSvc) {

        var serviceBase = '/Api/Acesso/';

        //#region login

        this.login = function (usuario) {
            var response = $http({
                method: "post",
                url: "/Acesso/PostLogin",
                data: JSON.stringify(usuario),
                dataType: "json"
            });
            return response;
        }

        //#endregion

        //#region esqueci minha senha
        
        this.gerarTokenAcesso = function (email) {
            return $http.get(serviceBase + "GetGerarTokenAcesso", {
                params:{
                    email: email
                }
            }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.validarToken = function (email, token) {
            return $http.get(serviceBase + "GetValidarToken", {
                params:{
                    email: email,
                    token: token
                }
            }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        this.alterarSenha = function (email, senha) {
            return $http.get(serviceBase + "GetAlterarSenha", {
                params: {
                    email: email,
                    senha: senha
                }
            }).then(function (response) {
                return globalSvc.getResponse(response);
            });
        }

        //#endregion

        //#region Primeiro Acesso


        //#endregion
    }
]);