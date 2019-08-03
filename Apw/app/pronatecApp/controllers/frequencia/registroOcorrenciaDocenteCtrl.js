frequenciaMdl.controller('registroOcorrenciaDocenteCtrl', ['$scope', 'frequenciaSvc', 'globalSvc', 'uiGridConstants', '$filter', 'ValidationService', 'Upload',
    function ($scope, service, globalSvc, uiGridConstants, $filter, validationService, Upload) {

        // Dados
        $scope.drop = {
            tipoOcorrencia: null
        }

        $scope.dados = {
            filtro: angular.copy($scope.estadoPesquisar.filtro),
            pessoa: angular.copy($scope.$parent.estadoDados.pessoaSelecionada),
            folhaFrequencia: null
        }


        // Obtem Folha Docente
        $scope.obtemFolhaDocente = function () {
            $scope.loadFolha = service.obtemFolhaDocente($scope.dados.pessoa.folhaFrequenciaId).then(function (response) {
                $scope.dados.folhaFrequencia = response.data;               
                criarHeaderTempo();
                $scope.alertaNaoEncontrada = response.data == null;
            });
        }

        $scope.obtemOcorrencias = function () {
            $scope.loadOcorrencia = service.obtemOcorrencias().then(function (response) {
                $scope.ocorrencias = response.data;
            });
        }


        $scope.obtemAlinhamento = function (frequencia) {
            return frequencia.listaTempoPresencaForm = $filter('orderBy')(frequencia.listaTempoPresencaForm, 'tempo')
        }

        $scope.folhaGerada = function () {
            return $scope.dados.folhaFrequencia != null
                && angular.isArray($scope.dados.folhaFrequencia.listaFolhaFrequenciaAlocacaoForm)
                && $scope.dados.folhaFrequencia.listaFolhaFrequenciaAlocacaoForm.length > 0;
        }

        $scope.folhaContemAnexo = function () {
            return $scope.dados.folhaFrequencia != null
                && angular.isNumber($scope.dados.folhaFrequencia.arquivoId);
        };

        $scope.alterarOcorrencia = function (folhaFrequenciaAlocacaoForm) {

            if (folhaFrequenciaAlocacaoForm.selecionado && !$scope.listaMarcacoes.some(e => e == folhaFrequenciaAlocacaoForm)) {
                $scope.listaMarcacoes.push(folhaFrequenciaAlocacaoForm);
            }

            if (!folhaFrequenciaAlocacaoForm.selecionado && $scope.listaMarcacoes.some(e => e == folhaFrequenciaAlocacaoForm)) {
                var index = $scope.listaMarcacoes.indexOf(folhaFrequenciaAlocacaoForm);
                $scope.listaMarcacoes.splice(index, 1);
            }

        }

        $scope.confirmar = function () {


            if (!new validationService().checkFormValidity($scope.form)) {
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
                return;
            }

            $scope.listaMarcacoes.forEach(function (element) {
                element.selecionado = false
                element.tipoOcorrenciaId = $scope.drop.tipoOcorrencia.selected.tipoOcorrenciaId;
                element.tipoOcorrenciaDescricao = $scope.drop.tipoOcorrencia.selected.descricao;
            });

            $scope.salvar();

            $scope.listaMarcacoes = [];
            $('#mdlOcorrencia').modal('hide');

        };

        $scope.salvar = function () {

            // obtem dias que tem pelo menos uma alocacao
            var listaFrequenciaAlocacao = angular.copy($scope.dados.folhaFrequencia.listaFolhaFrequenciaAlocacaoForm.filter(e => e.listaTempoPresencaForm.some(t => angular.isNumber(t.alocacaoId))));

            listaFrequenciaAlocacao.forEach(function (element) {
                element.listaTempoPresencaForm = element.listaTempoPresencaForm.filter(x => x.podeLancarPresenca == true && x.alocacaoId != null);
            });

            var modelView = {
                folhaFrequenciaId: $scope.dados.folhaFrequencia.folhaFrequenciaId,
                anoReferencia: $scope.dados.folhaFrequencia.anoReferencia,
                mesId: $scope.dados.folhaFrequencia.mesId,
                vinculoId: $scope.dados.folhaFrequencia.vinculoId,
                listaFolhaFrequenciaAlocacaoForm: listaFrequenciaAlocacao
            };

            $scope.loadSalvar = service.salvarFolhaDocente(modelView).then(function (response) {
                if (response.data == true) {
                    $scope.obtemFolhaDocente();
                    globalSvc.mensagemPositivo('Dados salvo!');
                }
            });

        };

        function criarHeaderTempo() {

            $scope.headerTempo = [];

            if ($scope.dados.folhaFrequencia == null) return;

            var todosTempos = $scope.dados.folhaFrequencia.listaFolhaFrequenciaAlocacaoForm.map(e => e.listaTempoPresencaForm.map(x => x.tempo));

            var mergedTempos = [].concat.apply([], todosTempos);

            var min = Math.min.apply(null, mergedTempos),
                max = Math.max.apply(null, mergedTempos);

            for (i = min; i <= max; i++) {
                $scope.headerTempo.push({ tempo: i, descricao: i + "ºTempo" });
            }
        }

        function validarParametro() {
            return $scope.$parent.estadoDados != null
               && $scope.$parent.estadoDados.pessoaSelecionada != null
               && !angular.equals($scope.$parent.estadoDados.pessoaSelecionada, {})
        }

        // UPLOAD ARQUIVO

        $scope.upload = function (file, folhaDocente) {
            globalSvc.limparMensagens();

            var list = file.name.split('.');
            var extensaoArquivo = '.' + list[list.length - 1].toLowerCase();

            if (validarExtensoesPermitidas(extensaoArquivo)) {
                if (file) {
                    $scope.loadUpload = Upload.upload({
                        url: '/api/Pronatec/Frequencia/UploadArquivo',
                        data: { file: file }
                    }).then(function (response) {
                        $scope.adicionar(folhaDocente, response.data, extensaoArquivo);
                    }, function (response) {
                        globalSvc.tratarErroResponse(response);
                    });
                }
            }
            else {
                $scope.arquivoUpload = null;
                globalSvc.mensagemAviso("somente arquivos" + $scope.extensoesPermitidas.join(" "));
            }
        };

        $scope.adicionar = function (folhaDocente, arquivo, extensao) {
            var pessoaDocumentoForm = {
                folhaFrequenciaId: $scope.dados.folhaFrequencia.folhaFrequenciaId,
                arquivoUpload: arquivo,
                extensaoArquivo: extensao
            }
            // salva o registro no banco e armazena o arquivo no repositório 
            $scope.loadAdicionar = service.adicionarDocumento(pessoaDocumentoForm).then(function (response) {
                // verifica se salvou para adicionar na lista
                if (response.data > 0) {
                    folhaDocente.arquivoId = response.data;
                    extensao = extensao;
                    $scope.arquivoUpload = null;
                }
                else
                    globalSvc.mensagemNegativo("Não foi possível adicionar o documento!");
            });
        }

        var validarExtensoesPermitidas = function (extensaoArquivo) {
            return $scope.extensoesPermitidas.some(item => { return item == extensaoArquivo });
        };

        var obterPresencaTipoOcorrencia = function (tipoOcorrenciaId) {

            var tipoOcorrencia = $scope.ocorrencias.filter(e => e.tipoOcorrenciaId == tipoOcorrenciaId)[0];

            return tipoOcorrencia != null && tipoOcorrencia.presenca;
        }

        $scope.baixarArquivoDocumento = function () {
            return;
        };

        var inicializar = function () {

            if (!validarParametro()) {
                $scope.redirecionarPesquisar();
                return;
            }            

            $scope.alertaNaoEncontrada = false;

            $scope.listaMarcacoes = [];

            $scope.obtemFolhaDocente();

            $scope.obtemOcorrencias();

            $scope.arquivoUpload = null;

            $scope.extensoesPermitidas = [".pdf", ".jpg"];
        }

        inicializar();

    }
]);