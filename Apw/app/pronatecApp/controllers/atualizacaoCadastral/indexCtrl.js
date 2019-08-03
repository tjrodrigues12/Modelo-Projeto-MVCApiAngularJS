atualizacaoCadastralMdl.controller('indexCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', '$filter', '$location', 'ValidationService', '$timeout', '$window',
    function ($scope, service, globalSvc, $filter, $location, validationService, $timeout, $window) {

        $scope.redirecionarDadosPessoais = function () {
            return $location.path("/dadosPessoais");
        }

        $scope.redirecionarDadosResidenciais = function () {
            return $location.path("/dadosResidenciais");
        }

        $scope.redirecionarDadosBancarios = function () {
            return $location.path("/dadosBancarios");
        }

        $scope.redirecionarDadosAcademicos = function () {
            return $location.path("/dadosAcademicos");
        }

        $scope.redirecionarDadosProfissionais = function () {
            return $location.path("/dadosProfissionais");
        }

        $scope.redirecionarVinculoTrabalho = function () {
            return $location.path("/vinculoTrabalho");
        }

        $scope.redirecionarUploadDocumentos = function () {
            return $location.path("/uploadDocumentos");
        }
        
        $scope.redirecionarTermoCompromisso = function () {
            return $location.path("/termoCompromisso");
        }

        $scope.dados = null;
        $scope.filtro = {
            abaDadosPessoais: {},
            abaDadosResidenciais: {},
            abaDadosBancarios: {},
            abaDadosAcademicos: {},
            abaDadosProfissionais: {},
            abaVinculoTrabalho: {},
            abaUploadDocumentos: {}
        };
    }
]);