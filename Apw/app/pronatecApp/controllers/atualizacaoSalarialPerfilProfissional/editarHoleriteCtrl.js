atualizacaoSalarialPerfilProfissionalMdl.controller('editarHoleriteCtrl', ['$scope', 'atualizacaoSalarialPerfilProfissionalSvc', 'globalSvc', 'ValidationService', 'Upload',
    function ($scope, service, globalSvc, ValidationService, Upload) {
        
        //#region obter Dados

        $scope.obterDadosPessoaTrabalhoHolerite = function () {
            $scope.loadDadosHolerite = service.obterDadosPessoaTrabalhoHoleriteParaEditar($scope.$parent.pessoaTrabalhoHoleriteId).then(function (response) {
                $scope.dadosEditarHolerite = response.data.dadosEditarHolerite;
                $scope.dadosProfissional = response.data.dadosProfissional;
                $scope.dataDeclaracao = response.data.dataDeclaracao;
            });
        }        

        //#endregion

        //#region Métodos
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
                            $scope.dadosEditarHolerite.arquivoUpload = response.data;
                            $scope.dadosEditarHolerite.extensaoArquivo = extensaoArquivo;
                            $scope.nomeArquivo = nomeArquivo;
                        }
                        else {
                            $scope.dadosEditarHolerite.arquivoSecundarioUpload = response.data;
                            $scope.dadosEditarHolerite.extensaoArquivoSecundario = extensaoArquivo;
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

        $scope.salvar = function () {

            var valido = true;

            if (!(new ValidationService()).checkFormValidity($scope.formDados)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }

            if (valido && $scope.dadosEditarHolerite.salarioFixoBruto <= 0) {
                valido = false;
                globalSvc.mensagemNegativo('Salário Fixo (Bruto) Inválido!');
            }

            if (valido && $scope.dadosEditarHolerite.salarioVariavelBruto < 0) {
                valido = false;
                globalSvc.mensagemNegativo('Salário Variável (Bruto) Inválido!');
            }

            if (valido && ($scope.dadosEditarHolerite.arquivoUpload == undefined || $scope.dadosEditarHolerite.arquivoUpload == null)) {
                valido = false;
                globalSvc.mensagemAviso('É necessário anexar o comprovante 1!');
            }

            if (valido) {
                $scope.loadAtualizaDados = service.atualizarDadosPessoaTrabalhoHoleriteParaEditar($scope.dadosEditarHolerite).then(function (response) {
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
            if ($scope.$parent.pessoaTrabalhoHoleriteId == undefined || $scope.$parent.pessoaTrabalhoHoleriteId == undefined == null) { $scope.redirecionarPesquisarHolerite();}

            $scope.dadosEditarHolerite = {};

            $scope.extensoesPermitidas = [".pdf", ".jpg"];
            $scope.obterDadosPessoaTrabalhoHolerite();
        }

        $scope.init();

    }
]);