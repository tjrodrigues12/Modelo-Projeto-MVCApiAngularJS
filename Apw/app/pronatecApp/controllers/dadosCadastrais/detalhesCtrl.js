dadosCadastraisMdl.controller('detalhesCtrl', ['$scope', 'dadosCadastraisSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        var obterDados = function () {
            $scope.loadDados = service.obterDados().then(response => {
                $scope.dados = response.data;
                console.log($scope.dados)

                concatenarDeficiencias();
                concatenarTelefones();

            }, response => {
                globalSvc.extrairMensagens(response);
            });
        };

        var concatenarDeficiencias = function () {
            $scope.dados.deficiencias = [];
            if ($scope.dados.deficienciaMotora) $scope.dados.deficiencias.push('Deficiência Motora');
            if ($scope.dados.deficienciaVisual) $scope.dados.deficiencias.push('Deficiência Visual');
            if ($scope.dados.deficienciaAuditiva) $scope.dados.deficiencias.push('Deficiência Auditiva');
        };

        var concatenarTelefones = function () {
            $scope.dados.telefones = [];
            if ($scope.dados.telefoneResidencial) $scope.dados.telefones.push($filter('telefone')($scope.dados.telefoneResidencial));
            if ($scope.dados.telefoneComercial) $scope.dados.telefones.push($filter('telefone')($scope.dados.telefoneComercial));
            if ($scope.dados.telefoneCelular1) $scope.dados.telefones.push($filter('telefone')($scope.dados.telefoneCelular1));
            if ($scope.dados.telefoneCelular2) $scope.dados.telefones.push($filter('telefone')($scope.dados.pessoas.telefoneCelular2));
        };

        $scope.baixarArquivoDocumento = function (pessoaDocumento) {
            $scope.loadDownload = service.obterArquivoDownload(pessoaDocumento.pessoaDocumentoId).then(function (response) {
                globalSvc.saveData(response.data, "arquivo" + pessoaDocumento.pessoaDocumentoId + '' + pessoaDocumento.extensao);
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        }

        var init = function () {
            obterDados();
        };

        init();
    }
]);