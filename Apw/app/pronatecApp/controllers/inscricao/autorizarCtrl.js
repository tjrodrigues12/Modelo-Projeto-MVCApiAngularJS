inscricaoMdl.controller('autorizarCtrl', ['$scope', 'inscricaoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = {
            motivoSituacaoInscricaoCandidato: "",
            situacaoInscricaoCandidatoId: '',
            inscricoesCandidatos: $scope.$parent.estadoPesquisarAutorizar.inscricoesCandidatos
        }

        $scope.obterSituacoesInscricoesCandidatos = function () {
            $scope.loadSic = service.obterSituacoesInscricoesCandidatosParaAutorizar().then(function (response) {
                $scope.situacoesIncricoesCandidatos = response.data;
            });
        }

        $scope.baixarArquivo = function (item) {
            $scope.loadDownload = service.obterArquivoDownload(item.inscricaoCandidatoDocumentoId, item.extensao).then(function (response) {
                globalSvc.saveData(response.data, item.descricao + item.extensao);
            }, function (response) {
                globalSvc.tratarErroResponse(response);
            });
        };

        $scope.salvar = function () {
            if (validar()) {

                var form = {
                    motivoSituacaoInscricaoCandidato: $scope.dados.motivoSituacaoInscricaoCandidato,
                    situacaoInscricaoCandidato: $scope.dados.situacaoInscricaoCandidatoId,
                    inscricoesCandidatosIds: $scope.dados.inscricoesCandidatos.map(x => x.inscricaoCandidatoId)
                };

                $scope.loadTela = service.autorizar(form).then(function (response) {

                    if (response.data == true) {

                        atualizarGrid(form.inscricoesCandidatosIds);

                        $scope.redirecionarPesquisarAutorizar();
                    }
                });
            }
        }

        function atualizarGrid(inscricoesCandidatosIds) {

            var list = $scope.$parent.estadoPesquisarAutorizar.grid.data;

            for (var i = 0; i < inscricoesCandidatosIds.length; i++) {

                var ind = globalSvc.getIndex(list, 'inscricaoCandidatoId', inscricoesCandidatosIds[i]);

                if (ind != -1) list.splice(ind, 1);
            }
        }

        function validar() {

            globalSvc.limparMensagens();

            if (!(new validationService()).checkFormValidity($scope.formAutorizar)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return false;
            }

            return true;
        }

        function init() {
            if ($scope.dados.inscricoesCandidatos == undefined || $scope.dados.inscricoesCandidatos == null || $scope.dados.inscricoesCandidatos.lenght <= 0) {
                $scope.redirecionarPesquisarAutorizar();
            }

            $scope.obterSituacoesInscricoesCandidatos();
        };

        $scope.voltar = function () {
            $scope.redirecionarPesquisarAutorizar();
        };

        init();
    }
]);