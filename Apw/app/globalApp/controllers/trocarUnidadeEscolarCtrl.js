globalMdl.controller('trocarUnidadeEscolarCtrl', ['$scope', 'trocarUnidadeEscolarlSvc', '$filter', 'globalSvc', 'ValidationService',
    function ($scope, service, $filter, globalSvc, validationService) {

        $scope.filtroTrocarUnidadeEscolar = {
            perfilId: "",
            municipioId: "",
            unidadeEscolarId: ""
        };

        $scope.obterPerfisParaTrocarUnidadeEscolar = function () {
            $scope.loadPTue = service.obterPerfisParaTrocarUnidadeEscolar().then(function (response) {
                $scope.perfisTrocarUnidadeEscolar = response.data;

                if ($scope.perfisTrocarUnidadeEscolar.length == 1) {
                    $scope.filtroTrocarUnidadeEscolar.perfilId = $scope.perfisTrocarUnidadeEscolar[0].perfilId;
                    $scope.obterMunicipiosParaTrocarUnidadeEscolar();
                }
            });

            $scope.filtroTrocarUnidadeEscolar.perfilId = "";
            $scope.municipiosTrocarUnidadeEscolar = [];
            $scope.filtroTrocarUnidadeEscolar.municipioId = "";
            $scope.unidadesEscolaresTrocarUnidadeEscolar = [];
            $scope.filtroTrocarUnidadeEscolar.unidadeEscolarId = "";
        }

        $scope.obterMunicipiosParaTrocarUnidadeEscolar = function () {
            if ($scope.filtroTrocarUnidadeEscolar.perfilId != undefined && $scope.filtroTrocarUnidadeEscolar.perfilId != null && $scope.filtroTrocarUnidadeEscolar.perfilId > 0) {
                $scope.loadMTue = service.obterMunicipiosParaTrocarUnidadeEscolar($scope.filtroTrocarUnidadeEscolar.perfilId).then(function (response) {
                    $scope.municipiosTrocarUnidadeEscolar = response.data;

                    if ($scope.municipiosTrocarUnidadeEscolar.length == 1) {
                        $scope.filtroTrocarUnidadeEscolar.municipioId = $scope.municipiosTrocarUnidadeEscolar[0].municipioId;
                        $scope.obterUnidadesEscolaresParaTrocarUnidadeEscolar();
                    }
                });
            }
            else $scope.municipiosTrocarUnidadeEscolar = [];

            $scope.filtroTrocarUnidadeEscolar.municipioId = "";
            $scope.unidadesEscolaresTrocarUnidadeEscolar = [];
            $scope.filtroTrocarUnidadeEscolar.unidadeEscolarId = "";
        }

        $scope.obterUnidadesEscolaresParaTrocarUnidadeEscolar = function () {
            if ($scope.filtroTrocarUnidadeEscolar.municipioId != undefined && $scope.filtroTrocarUnidadeEscolar.municipioId != null && $scope.filtroTrocarUnidadeEscolar.municipioId > 0) {
                $scope.loadUetue = service.obterUnidadesEscolaresParaTrocarUnidadeEscolar($scope.filtroTrocarUnidadeEscolar.perfilId, $scope.filtroTrocarUnidadeEscolar.municipioId).then(function (response) {
                    $scope.unidadesEscolaresTrocarUnidadeEscolar = response.data;

                    if ($scope.unidadesEscolaresTrocarUnidadeEscolar.length == 1) {
                        $scope.filtroTrocarUnidadeEscolar.unidadeEscolarId = $scope.unidadesEscolaresTrocarUnidadeEscolar[0].unidadeEscolarId;
                    }
                });
            }
            else $scope.unidadesEscolaresTrocarUnidadeEscolar = [];

            $scope.filtroTrocarUnidadeEscolar.unidadeEscolarId = "";
        }

        $scope.alterarUnidadeEscolar = function () {

            if (!validar()) return false;

            $scope.loadTela = service.alterarParaTrocarUnidadeEscolar($scope.filtroTrocarUnidadeEscolar.perfilId, $scope.filtroTrocarUnidadeEscolar.municipioId, $scope.filtroTrocarUnidadeEscolar.unidadeEscolarId).then(function (response) {
                if (response.data == true) {
                    window.location.reload();
                }
            });
        }

        function validar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formTrocarUnidadeEscolar)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            return true;
        }

        $scope.obterPerfisParaTrocarUnidadeEscolar();
    }
]);