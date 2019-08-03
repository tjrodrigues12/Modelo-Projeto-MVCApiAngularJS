atualizacaoCadastralMdl.controller('dadosPessoaisCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {
        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro.abaDadosPessoais

        $scope.filtro.sexos = [
            { id: 'M', valor: 'Masculino' },
            { id: 'F', valor: 'Feminino' }
        ];

        $scope.filtro.listaSimNao = [
            { id: true, label : 'Sim' },
            { id: false, label: 'Não' }
        ];

        $scope.obterDados = function () {
            $scope.loadDados = service.obterDados().then(function (response) {
                $scope.dados = response.data;
                verificarPendencias();
                $scope.dados.dataNascimento = globalSvc.converterData($scope.dados.dataNascimento);
                $scope.dados.dataExpedicaoDocumentoIdentificacao = globalSvc.converterData($scope.dados.dataExpedicaoDocumentoIdentificacao);
                if ($scope.dados.ufNascimento)
                    $scope.obterMunicipiosNascimento()
            });
        }

        $scope.obterNacionalidades = function () {
            $scope.loadNacionalidades = service.obterNacionalidades().then(function (response) {
                $scope.filtro.nacionalidades = response.data;
            });
        }

        $scope.obterUfsNascimento = function () {
            $scope.loadUfsNascimento = service.obterUfsNascimento().then(function (response) {
                $scope.filtro.ufsNascimento = response.data;
            });
        }

        $scope.trocarUfNascimento = function () {
            $scope.dados.municipioNascimentoId = null;
            $scope.filtro.listaMunicipios = [];

            if ($scope.dados.ufNascimento)
                $scope.obterMunicipiosNascimento();
        };

        $scope.obterMunicipiosNascimento = function () {
            $scope.loadMunicipiosNascimento = service.obterMunicipiosNascimento($scope.dados.ufNascimento).then(function (response) {
                $scope.filtro.municipiosNascimento = response.data;
            });
        };

        $scope.obterEstadosCivis = function () {
            $scope.loadEstadosCivis = service.obterEstadosCivis().then(function (response) {
                $scope.filtro.estadosCivis = response.data;
            });
        };

        $scope.obterRacasCor = function () {
            $scope.loadRacasCor = service.obterRacasCor().then(function (response) {
                $scope.filtro.racasCor = response.data;
            });
        };

        $scope.obterUfsCtps = function () {
            $scope.loadUfsCtps = service.obterUfsCtps().then(function (response) {
                $scope.filtro.ufsCtps = response.data;
            });
        };

        $scope.obterTiposDocumentosIdentificacao = function () {
            $scope.loadTiposDocumentosIdentificacao = service.obterTiposDocumentosIdentificacao().then(function (response) {
                $scope.filtro.tiposDocumentosIdentificacao = response.data;
            });
        };

        $scope.obterOrgaosExpedicaoDocumentoIdentificacao = function () {
            $scope.loadOrgaosExpedicaoDocumentoIdentificacao = service.obterOrgaosExpedicaoDocumentoIdentificacao().then(function (response) {
                $scope.filtro.orgaosExpedicaoDocumentoIdentificacao = response.data;
            });
        };

        $scope.obterUfsExpedicaoDocumentoIdentificacao = function () {
            $scope.loadUfsExpedicaoDocumentoIdentificacao = service.obterUfsExpedicaoDocumentoIdentificacao().then(function (response) {
                $scope.filtro.ufsExpedicaoDocumentoIdentificacaos = response.data;
            });
        };

        $scope.avancar = function () {
            if (new validationService().checkFormValidity($scope.formDadosPessoais)) {
                $scope.loadSalvando = service.salvarAbaDadosPessoais($scope.dados).then(function (response) {
                    if (response.data) {
                        $scope.$parent.dados = $scope.dados;
                        $scope.$parent.filtro.abaDadosPessoais = $scope.filtro;
                        $scope.redirecionarDadosResidenciais();
                    }
                });
            }
            else
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
        };

        var verificarPendencias = function () {
            $('#modalPendencia').modal({ show: $scope.dados.pessoaAprovacao.pendente })
            $('#modalRevisao').modal({ show: $scope.dados.pessoaAprovacao.revisao })
        };

        var init = function () {
            globalSvc.limparMensagens();
            if (!$scope.dados) {
                $scope.obterDados();
                $scope.obterNacionalidades();
                $scope.obterUfsNascimento();
                $scope.obterEstadosCivis();
                $scope.obterRacasCor();
                $scope.obterUfsCtps();
                $scope.obterTiposDocumentosIdentificacao();
                $scope.obterOrgaosExpedicaoDocumentoIdentificacao();
                $scope.obterUfsExpedicaoDocumentoIdentificacao();
            }
        };

        init();

        
    }
]);