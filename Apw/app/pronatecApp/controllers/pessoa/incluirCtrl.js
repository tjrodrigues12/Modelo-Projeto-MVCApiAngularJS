pessoaMdl.controller('incluirCtrl', ['$scope', 'pessoaSvc', 'globalSvc', 'ValidationService', 'Upload',
    function ($scope, service, globalSvc, validationService, Upload) {

        $scope.listaSexo = [
            { label: 'Masculino', id: 'M' },
            { label: 'Feminino', id: 'F' }
        ];

        $scope.validarCpf = function () {

            if ($scope.dados.cpf) {

                $scope.loadTela = service.obterPessoaCpf($scope.dados.cpf).then(function (response) {
                    if (response.data.ativarProfissional)
                        $('#mdlAtivar').modal('show');
                    else {
                        $scope.dados = response.data;
                        $scope.mostrarFormulario = true;
                    }
                });
            }
            else
                $scope.mostrarFormulario = false;

        };

        $scope.confirmarAtivar = function () {
            $scope.loadTela = service.ativarProfissional($scope.dados.cpf).then(function (response) {
                if (response.data) {
                    $('#mdlAtivar').modal('hide');
                    $scope.dados.cpf = null;
                    globalSvc.mensagemPositivo('Profissional Ativado com sucesso!');
                }
            });
        };

        $scope.upload = function (file, tipo) {
            globalSvc.limparMensagens();

            var list = file.name.split('.');
            var extensaoArquivo = '.' + list[list.length - 1].toLowerCase();

            if (validarExtensoesPermitidas(extensaoArquivo)) {
                if (file) {
                    $scope.loadUpload = Upload.upload({
                        url: '/api/Pronatec/Pessoa/UploadArquivo',
                        data: { file: file }
                    }).then(function (response) {
                        if (tipo == 'ATA') {
                            $scope.dados.arquivoAta = response.data;
                            $scope.dados.extensaoAta = extensaoArquivo;
                        }
                        else if (tipo == 'COMUNICADO') {
                            $scope.dados.arquivoComunicado = response.data;
                            $scope.dados.extensaoComunicado = extensaoArquivo;
                        }
                    }, function (response) {
                        globalSvc.tratarErroResponse(response);
                    });
                }
            }
            else {
                $scope.arquivoUpload = null;
                $scope.dados.arquivoAta = null;
                $scope.dados.arquivoComunicado = null;
                globalSvc.mensagemAviso("somente arquivos" + $scope.extensoesPermitidas.join(" "));
            }
        };

        var validarExtensoesPermitidas = function (extensaoArquivo) {
            $scope.extensoesPermitidas = ['.doc', '.docx', '.pdf'];
            return $scope.extensoesPermitidas.some(item => { return item == extensaoArquivo });
        };

        $scope.salvar = function () {

            globalSvc.limparMensagens();

            var valido = true;

            if (!(new validationService()).checkFormValidity($scope.form)) {
                valido = false;
                globalSvc.mensagemAviso('Verifique os campos abaixo!');
            }

            if (valido) {
                $scope.loadTela = service.incluir($scope.dados).then(function (response) {
                    if (response.data == true) $scope.redirecionarPesquisar();
                });
            }
        }

        $scope.voltar = function () {
            $scope.redirecionarPesquisar();
        };

        var init = function () {
            $scope.dados = {};
            $scope.mostrarFormulario = false;
            $scope.mostrarModalAtivar = false;
        };
    }
]);