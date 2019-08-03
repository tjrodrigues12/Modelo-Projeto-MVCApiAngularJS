vinculoMdl.controller('vincularCursoCtrl', ['$scope', 'vinculoSvc', 'globalSvc', 'ValidationService', '$filter',
    function ($scope, service, globalSvc, validationService, $filter) {

        $scope.dados = {};

        $scope.drop = {};

        $scope.obterVinculo = function () {
            $scope.loadTela = service.obterVinculoParaVinculoCurso($scope.$parent.vinculoId).then(function (response) {
                $scope.dados = response.data;
                $scope.obterCursos();
            });
        }

        $scope.obterCursos = function () {
            $scope.loadTur = service.obterCursosParaVinculoCurso($scope.dados.vinculoId).then(function (response) {
                $scope.cursos = $filter('filtroRemoverItemAdicionado')(response.data, $scope.dados.vinculosCursos, 'cursoId');
            });
        }

        $scope.adicionar = function () {

            if (validar()) {

                $scope.dados.vinculosCursos.push({
                    vinculoId: $scope.dados.vinculoId,
                    cursoId: $scope.cursoId,
                    curso: $scope.drop.curso.selected.curso,
                });

                new validationService().resetForm($scope.formVincularCurso);

                $scope.cursoId = "";
                $scope.drop.curso.selected = null;

                $scope.obterCursos();
            }
        }

        function validar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formVincularCurso)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            if (!validarCurso()
                || !validarCursoValido()) {
                return false;
            }

            return true;
        }

        function validarCurso() {
            if ($scope.cursoId == undefined || $scope.cursoId == null || $scope.cursoId == "" || $scope.cursoId <= 0) {
                globalSvc.mensagemNegativo("Informe um curso válido!");
                return false;
            }
            return true;
        }

        function validarCursoValido() {
            var res = $filter('filtroPorId')($scope.dados.vinculosCursos, 'cursoId', $scope.cursoId);
            if (res != undefined && res != null && res.length > 0) {
                globalSvc.mensagemNegativo("Não é possível realizar a vinculação! Este curso já vinculado!");
                return false;
            }
            return true;
        }

        $scope.excluir = function (item) {
            var index = $scope.dados.vinculosCursos.indexOf(item);
            if (index != -1) {
                $scope.dados.vinculosCursos.splice(index, 1);
                $scope.obterCursos();
            }
        }

        $scope.salvar = function () {

            globalSvc.limparMensagens();

            var valido = true;

            if (valido) {
                $scope.loadTela = service.vincularCursoParaVinculoCurso($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarVinculosProfissional();
                });
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarVinculosProfissional();
        };

        function init() {
            if ($scope.$parent.vinculoId) {
                $scope.obterVinculo();
            }
            else {
                $scope.$parent.redirecionarVinculosProfissional();
            }
        };

        init();
    }
]);