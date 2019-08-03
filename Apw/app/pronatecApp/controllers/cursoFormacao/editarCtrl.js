cursoFormacaoMdl.controller('editarCtrl', ['$scope', 'cursoFormacaoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {}

        $scope.obterCursoFormacao = function () {
            $scope.loadTela = service.obterCursoFormacaoParaEditar($scope.$parent.cursoFormacaoId).then(function (response) {
                $scope.dados = response.data;
            }, response => {               
                globalSvc.extrairMensagens(response);
            });
        }

        $scope.editar = function () {

            if (!validar()) return;

            $scope.loadTela = service.editar($scope.dados).then(function (response) {
                if (response.data == true) $scope.redirecionarPesquisar();
            }, response => {
                globalSvc.extrairMensagens(response);
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
            if ($scope.$parent.cursoFormacaoId) {
                $scope.obterCursoFormacao();
            }
            else $scope.redirecionarPesquisar();
        };

        init();
    }
]);