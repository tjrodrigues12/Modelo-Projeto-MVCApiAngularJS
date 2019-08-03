OrgaoExpedicaoDocumentoMdl.controller('editarCtrl', ['$scope', 'OrgaoExpedicaoDocumentoSvc', '$filter', 'globalSvc', 'ValidationService',
    function ($scope, service, $filter, globalSvc, ValidationService) {

        $scope.obterOrgaoExpedicaoDocumento = function () {
            $scope.loadTela = service.obterDadosOrgaoExpedicaoDocumentoparaEditar($scope.orgaoExpedicaoDocumentoIdentificacaoId).then(function (response) {
                $scope.dados = response.data
            });
        }

        var init = function () {
            if ($scope.$parent.orgaoExpedicaoDocumentoIdentificacaoId) {
                $scope.obterOrgaoExpedicaoDocumento();
            }
            else{
                $scope.$parent.redirecionarPesquisar();
            }
        }

        $scope.salvar = function () {
            globalSvc.limparMensagens();

            var valido = true;

            if (!(new ValidationService()).checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }

            if (valido) {
                $scope.loadTela = service.editar($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                })
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        init();
    }
])