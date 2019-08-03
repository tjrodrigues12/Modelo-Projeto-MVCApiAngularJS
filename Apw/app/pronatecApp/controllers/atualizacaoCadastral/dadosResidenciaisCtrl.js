atualizacaoCadastralMdl.controller('dadosResidenciaisCtrl', ['$scope', 'atualizacaoCadastralSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.dados;
        $scope.filtro = $scope.$parent.filtro.abaDadosPessoais

        $scope.obterUfs = function () {
            $scope.loadUfs = service.obterUfsEndereco().then(function (response) {
                $scope.filtro.ufs = response.data;
            });
        }

        $scope.obterMunicipios = function (municipioEnderecoId) {
            if ($scope.dados.ufEndereco != undefined && $scope.dados.ufEndereco != null && $scope.dados.ufEndereco != "") {
                $scope.loadMunicipios = service.obterMunicipiosEndereco($scope.dados.ufEndereco).then(function (response) {
                    $scope.filtro.municipios = response.data;
                });
            }
            else $scope.filtro.municipios = [];

            if (municipioEnderecoId != undefined && municipioEnderecoId != null && municipioEnderecoId > 0) {
                $scope.dados.municipioEnderecoId = municipioEnderecoId;
            }
            else $scope.dados.municipioEnderecoId = null;
        }

        $scope.consultarCep = function () {
            if ($scope.dados.cep) {
                $scope.loadCep = globalSvc.consultarCep($scope.dados.cep).then(function (response) {
                    if (response.data) {
                        var endereco = response.data;
                        $scope.dados.logradouro = endereco.logradouro;
                        $scope.dados.bairro = endereco.bairro;
                        $scope.dados.ufEndereco = endereco.uf;

                        $scope.loadMunicipios = service.obterMunicipiosEndereco($scope.dados.ufEndereco).then(function (response) {
                            if (response.data) {
                                $scope.filtro.municipios = response.data;
                                var municipioEndereco = response.data.filter(function (item) {
                                    return item.ibge == endereco.ibge;
                                });

                                if (municipioEndereco)
                                    $scope.dados.municipioEnderecoId = municipioEndereco[0].municipioEnderecoId;
                            }
                        });
                    }
                }, function (response) {
                    globalSvc.tratarErroResponse(response);
                });
            }
        };

        $scope.avancar = function () {
            if (new validationService().checkFormValidity($scope.formDadosResidenciais)) {
                 $scope.loadSalvando = service.salvarAbaDadosResidenciais($scope.dados).then(function (response) {
                    if (response.data) {
                        $scope.$parent.dados = $scope.dados;
                        $scope.$parent.filtro.abaDadosResidenciais = $scope.filtro;
                        $scope.redirecionarDadosBancarios();
                    }
                });                
            }
            else
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
        };

        $scope.voltar = function () {
            $scope.$parent.dados = $scope.dados;
            $scope.$parent.filtro.abaDadosResidenciais = $scope.filtro;
            $scope.redirecionarDadosPessoais();
        };

        var init = function () {
            globalSvc.limparMensagens();
            if ($scope.dados) {
                if (!$scope.filtro.ufs) {
                    $scope.obterUfs();
                    $scope.obterMunicipios($scope.dados.municipioEnderecoId);
                }
            }
            else
                $scope.redirecionarDadosPessoais();
        };

        init();
    }
]);