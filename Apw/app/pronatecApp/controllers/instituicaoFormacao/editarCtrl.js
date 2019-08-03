instituicaoFormacaoMdl.controller('editarCtrl', ['$scope', 'instituicaoFormacaoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {}

        $scope.obterInstituicaoFormacao = function () {
            $scope.loadTela = service.obterInstituicaoFormacaoParaEditar($scope.$parent.instituicaoFormacaoId).then(function (response) {
                $scope.dados = response.data;
            });
        }

        $scope.editar = function () {

            if (!validar()) return;

            $scope.loadTela = service.editar($scope.dados).then(function (response) {
                if (response.data == true) $scope.redirecionarPesquisar();
            });
        }

        function validar() {

            globalSvc.limparMensagens();

            if (new validationService().checkFormValidity($scope.form)) return true;

            globalSvc.mensagemAviso('Verifique os campos abaixo!');

            return false;
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        function init() {
            if ($scope.$parent.instituicaoFormacaoId) {
                $scope.obterInstituicaoFormacao();
            }
            else $scope.redirecionarPesquisar();
        };

        init();
    }
]);