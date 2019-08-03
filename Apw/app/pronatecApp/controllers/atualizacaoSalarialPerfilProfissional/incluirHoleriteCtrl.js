atualizacaoSalarialPerfilProfissionalMdl.controller('incluirHoleriteCtrl', ['$scope', 'atualizacaoSalarialPerfilProfissionalSvc', 'globalSvc', 'ValidationService', 'Upload',
    function ($scope, service, globalSvc, ValidationService, Upload) {
        
        //#region Obter Dados
        $scope.obterAnoReferencia = function () {
            $scope.loadAno = service.obterAnoReferenciaParaIncluirHolerite().then(function (response) {
                $scope.listaAnoReferencia = response.data;
            });
        }

        $scope.obterMeses = function () {
            $scope.loadMeses = service.obterMesReferenciaParaIncluirHolerite($scope.dadosIncluirHolerite.anoReferencia).then(function (response) {
                $scope.listaMesReferencia = response.data;
            });
        }

        $scope.obterDadosPessoaTrabalho = function () {
            $scope.loadDadosPessoa = service.obterDadosPessoaTrabalhoParaIncluirHolerite($scope.pessoaTrabalhoId).then(function (response) {
                $scope.dadosProfissional = response.data.dadosProfissional;
                $scope.dadosIncluirHolerite.salarioFixoBruto = response.data.salarioFixoBruto;
                $scope.dataDeclaracao = response.data.dataDeclaracao;
            });
        }
        //#endregion

        //#region Métodos

        $scope.inicializarVariaveis = function () {
            $scope.dadosIncluirHolerite = {
                pessoaTrabalhoId: $scope.$parent.pessoaTrabalhoId
            };

            $scope.dadosIncluirHolerite.salarioVariavelBruto = 0;
        }

        var validarExtensoesPermitidas = function (extensaoArquivo) {
            return $scope.extensoesPermitidas.some(item => { return item == extensaoArquivo });
        };

        //#endregion

        //#region Eventos

        $scope.upload = function (file, numArq) {
            globalSvc.limparMensagens();

            var list = file.name.split('.');
            var extensaoArquivo = '.' + list[list.length - 1].toLowerCase();

            list = file.name.split('/');
            var nomeArquivo = list[list.length - 1];

            if (validarExtensoesPermitidas(extensaoArquivo)) {
                if (file) {
                    $scope.loadUpload = Upload.upload({
                        url: '/api/Pronatec/AtualizacaoSalarialPerfilProfissional/UploadArquivo',
                        data: { file: file }
                    }).then(function (response) {
                        if (numArq == 1) {
                            $scope.dadosIncluirHolerite.arquivoUpload = response.data;
                            $scope.dadosIncluirHolerite.extensaoArquivo = extensaoArquivo;
                            $scope.nomeArquivo = nomeArquivo;
                        }
                        else {
                            $scope.dadosIncluirHolerite.arquivoSecundarioUpload = response.data;
                            $scope.dadosIncluirHolerite.extensaoArquivoSecundario = extensaoArquivo;
                            $scope.nomeArquivoSecundario = nomeArquivo;
                        }
                        
                    }, function (response) {
                        globalSvc.tratarErroResponse(response);
                    });
                }
            }
            else {
                globalSvc.mensagemAviso("somente arquivos" + $scope.extensoesPermitidas.join(" ") + " são aceitos");
            }
        };

        $scope.incluir = function () {
            globalSvc.limparMensagens();
            var valido = true;

            if (!(new ValidationService()).checkFormValidity($scope.formDados) || $scope.dadosIncluirHolerite.anoReferencia == undefined) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }

            if (valido && $scope.dadosIncluirHolerite.salarioFixoBruto <= 0) {
                valido = false;
                globalSvc.mensagemNegativo('Salário Fixo (Bruto) Inválido!');
            }

            if (valido && $scope.dadosIncluirHolerite.salarioVariavelBruto < 0) {
                valido = false;
                globalSvc.mensagemNegativo('Salário Variável (Bruto) Inválido!');
            }

            if (valido && ($scope.dadosIncluirHolerite.arquivoUpload == undefined || $scope.dadosIncluirHolerite.arquivoUpload == null)) {
                valido = false;
                globalSvc.mensagemAviso('É necessário anexar o comprovante 1!');
            }

            if (valido) {

                $scope.loadSalvar = service.incluirHolerite($scope.dadosIncluirHolerite).then(function (response) {
                    if (response.data == true) {
                        $scope.redirecionarPesquisarHolerite();
                    }
                });
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisarHolerite();
        }
        //#endregion      

        $scope.init = function () {
            if ($scope.$parent.pessoaTrabalhoId == undefined || $scope.$parent.pessoaTrabalhoId == null) { $scope.redirecionarPesquisar(); }

            $scope.extensoesPermitidas = [".pdf", ".jpg"];
            $scope.inicializarVariaveis();
            $scope.obterAnoReferencia();            
            $scope.obterDadosPessoaTrabalho();
        }

        $scope.init();
    }
])