﻿perfilMdl.controller('incluirCtrl', ['$scope', 'perfilSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {}

        $scope.salvar = function () {
            globalSvc.limparMensagens();

            var valido = true;

            if (!(new validationService()).checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('verifique os campos abaixo!');
            }


            if (valido) {
                $scope.loadTela = service.incluir($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                }, response => {
                    globalSvc.extrairMensagens(response);
                });
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };
    }
]);