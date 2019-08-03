globalMdl.service('globalSvc', ['$http', 'toastr', '$filter',
    function ($http, toastr, toastrConfig, $filter) {

        this.getResponse = function (response) {
            this.extrairMensagens(response);
            response.data = response.data.result;
            return response;
        }

        this.extrairMensagens = function (response) {
            if (response) {
                if (response.status === 401)
                    window.location = "/Default.aspx";
                else if (response.status === 403) {
                    this.exibirMensagem("Você não possui permissão para a ação solicitada.");

                }
                else if (response.data && response.data.mensagens) {
                    try {
                        this.exibirMensagem(JSON.parse(response.data.mensagens));
                    } catch (e) {
                        this.exibirMensagem(response.data.mensagens);
                    };
                }
            }
        };

        this.exibirMensagem = function (mensagens) {
            if (angular.isArray(mensagens)) {
                angular.forEach(mensagens, function (value, key) {
                    toaster(value.texto, getTipoMensagem(value.tipoMensagem))
                });
            } else {
                if (mensagens.texto) {
                    toaster(mensagens.texto, getTipoMensagem(mensagens.tipoMensagem))
                }
                else {
                    toaster(mensagens);
                }
            }
        };

        function getTipoMensagem(tipo) {
            switch (tipo) {
                case 1:
                    return 'aviso';
                case 2:
                    return 'negativo';
                case 3:
                    return 'negativo';
                case 4:
                    return 'positivo';
                default:
                    return 'aviso';
            }
        };

        function toaster(mensagem, tipo, tempo) {

            if (tempo == undefined) tempo = 5000;

            switch (tipo) {
                case "positivo":
                    toastr.success(mensagem, { timeOut: tempo });
                    return;
                case "negativo":
                    toastr.error(mensagem, "Atenção", { timeOut: tempo });
                    return;
                case "aviso":
                    toastr.warning(mensagem, "Atenção", { timeOut: tempo });
                    return;
                default:
                    toastr.info(mensagem, "Atenção", { timeOut: tempo });
                    return;
            }
        }

        this.mensagemPositivo = function (mensagem) {
            this.limparMensagens();
            toaster(mensagem, 'positivo', 3000);
        }

        this.mensagemInformacao = function (mensagem) {
            toaster(mensagem, 'informacao', 3000);
        }

        this.mensagemNegativo = function (mensagem) {
            toaster(mensagem, 'negativo', 5000);
        }

        this.mensagemAviso = function (mensagem) {
            toaster(mensagem, 'aviso', 5000);
        }

        this.objValido = function (obj) {
            return (obj != undefined && obj != null);
        }

        this.idValido = function (obj) {
            return (this.isNumber(obj) && obj > 0);
        }

        this.strValido = function (obj) {
            return (obj != undefined && obj != null && obj != "");
        }

        this.valido = function (obj) {
            return (obj != undefined && obj != null && obj != '');
        }

        this.isEmpty = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop) || obj.prop != "" || obj.prop != undefined)
                    return false;
            }
            return true;
        }

        this.getText = function (itens, propText, propVal, val) {
            if (itens != undefined && itens != null && itens.length > 0) {
                if (propText != undefined && propText != null && propText != '') {
                    if (propVal == undefined || propVal == null || propVal == '') propVal = propText;
                    if (val != undefined && val != null && val != '') {
                        for (var i = 0; i < itens.length; i++) {
                            if (itens[i][propVal] === val) return itens[i][propText];
                        }
                    }
                }
            }
            return undefined;
        };

        this.getIndex = function (itens, propVal, val) {
            if (itens == undefined || itens == null || itens.length == 0) return -1;
            if (propVal == undefined || propVal == null || itens == '') return -1;
            if (val == undefined || val == null) return -1;
            for (var i = 0; i < itens.length; i++) {
                if (itens[i][propVal] === val) return i;
            }
            return -1;
        }

        this.openPDF = function (resData, fileName) {
            var ieEDGE = navigator.userAgent.match(/Edge/g);
            var ie = navigator.userAgent.match(/.NET/g); // IE 11+
            var oldIE = navigator.userAgent.match(/MSIE/g);

            var blob = new window.Blob([resData], { type: 'application/pdf' });

            if (ie || oldIE || ieEDGE) {
                //window.navigator.msSaveBlob(blob, fileName);
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            }
            else {

                var reader = new window.FileReader();
                reader.onloadend = function () {
                    var relName = makeid();
                    var url = '/content/reports.html?rel=' + relName;
                    localStorage.setItem(relName, reader.result);
                    window.open(url, "_blank")
                };
                reader.readAsDataURL(blob);
            }
        }

        this.saveData = function (data, fileName) {
            saveData(data, fileName);
        }

        this.savePDF = function (data, fileName) {
            saveData(data, fileName);
        }

        this.saveTxt = function (data, filename) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
            pom.setAttribute('download', filename);

            if (document.createEvent) {
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                pom.dispatchEvent(event);
            }
            else {
                pom.click();
            }
        };

        var saveData = (function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            return function (data, fileName) {
                var blob = new Blob([data], { type: "octet/stream" }),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());

        this.somenteNumeros = function (valor) {
            if (angular.isUndefined(valor)) return '';
            return valor.replace(/[^0-9]+/g, '');
        }

        this.limparMensagens = function () {
            toastr.clear();
        }

        this.converterData = function (data) {
            if (!Date.parse(data))
                return new Date();

            var dataParse = data.split("-");
            var dataRetorno = new Date(parseInt(dataParse[0]), parseInt(dataParse[1]) - 1, parseInt(dataParse[2].substring(0, 2)));

            return new Date(dataRetorno);
        }

        this.dataAtual = function () {
            return new Date();
        }

        this.consultarCep = function (cep) {
            return $http.get('https://viacep.com.br/ws/' + cep + '/json/').then(function (response) {
                return response;
            });
        };

        this.validarHora = function (hora) {

            if (hora == undefined || hora == null || hora == "") return false;

            var hrs = hora.substring(0, 2);

            var min = hora.substring(3, 5);

            if (hrs == undefined || hrs == null || hrs == "") return false;

            if (min == undefined || min == null || min == "") return false;

            if ((hrs < 00) || (hrs > 23) || (min < 00) || (min > 59)) return false;

            return true;
        }

        this.adicionarDias = function (data, dias) {
            var ms = 86400000;
            return new Date(data.getTime() + dias * ms);
        };

        this.converterDataHoraParaString = function (data, hora) {

            var dataHora = "";

            var dataSplit = [];

            if (this.strValido(data)) dataSplit = data.toISOString().slice(0, 10).split("-");

            if (dataSplit.length == 3) {

                if (this.strValido(dataSplit[2])) dataHora += dataSplit[2];

                if (this.strValido(dataSplit[1])) dataHora += "/" + dataSplit[1];

                if (this.strValido(dataSplit[0])) dataHora += "/" + dataSplit[0];
            }

            if (hora != undefined && hora != null && hora != "") {

                var horaSplit = [];

                if (this.strValido(hora)) horaSplit = hora.split(':');

                if (horaSplit.length >= 2) {

                    if (this.strValido(horaSplit[0])) dataHora += " " + horaSplit[0];

                    if (this.strValido(horaSplit[1])) dataHora += ":" + horaSplit[1];

                    if (this.strValido(horaSplit[2])) dataHora += ":" + horaSplit[2];
                }
            }

            return dataHora;
        }

        this.converterDataHoraDeString = function (data) {

            var dataHora = "";

            if (this.strValido(data)) {

                var dataSplit = data.split('/');

                if (dataSplit[2].split(" ").length > 1) {

                    var hora = dataSplit[2].split(" ")[1].split(':');

                    dataSplit[2] = dataSplit[2].split(" ")[0];

                    dataHora = new Date(dataSplit[0], dataSplit[1] - 1, dataSplit[2], hora[0], hora[1]);

                } else {
                    dataHora = new Date(dataSplit[0], dataSplit[1] - 1, dataSplit[2]);
                }
            }

            return dataHora;
        }

        this.converterDataParaAnoMesDia = function (data) {

            if (!this.strValido(data))
                return new Date();

            var dataParse = data.split("/");

            var dataRetorno = new Date(parseInt(dataParse[2]), parseInt(dataParse[1] - 1), parseInt(dataParse[0]));

            return dataRetorno;
        }

        this.calculaDiferencaEntreHoras = function (data1, data2) {
            return Math.abs(data1 - data2) / 36e5;
        }

        this.validarCelular = function (celularComDDD) {

            if (celularComDDD == null) return false;

            var ddd = celularComDDD.toString().substring(0, 2);
            var numeroCelular = celularComDDD.toString().substring(2);

            return this.verificarSeCelularPossuiOnzeDigitos(celularComDDD) &&
                   this.verificarSeDDDExiste(ddd) &&
                   this.verificarNonoDigito(numeroCelular) &&
                   !this.verificarSeTodosOsNumerosSaoIguais(numeroCelular);

        }

        this.validarTelefoneFixo = function (telefoneFixoComDDD) {

            if (telefoneFixoComDDD == null || telefoneFixoComDDD == '') return false;

            var ddd = telefoneFixoComDDD.toString().substring(0, 2);
            var telefoneSemDDD = telefoneFixoComDDD.toString().substring(2);

            return !this.verificarSeTodosOsNumerosSaoIguais(telefoneSemDDD) &&
                   this.verificarSeDDDExiste(ddd) &&
                   this.verificarSeTelefoneFixoPossuiDezDigitos(telefoneFixoComDDD);
        };

        this.verificarSeTodosOsNumerosSaoIguais = function (telefoneSemDDD) {

            var regex = /^(\d)\1+$/;
            var resultado = regex.test(telefoneSemDDD);

            return resultado;
        };

        this.verificarSeDDDExiste = function (DDD) {

            if (typeof DDD !== 'number')
                DDD = parseInt(DDD, 10);

            var existe = this.DDDs.includes(DDD);
            return existe;
        };

        this.verificarNonoDigito = function (celularSemDDD) {

            var comecaComNonoDigito = celularSemDDD.startsWith('9');
            return comecaComNonoDigito;
        };

        this.verificarSeCelularPossuiOnzeDigitos = function (celularComDDD) {
            var celular = celularComDDD.toString();

            return celular.length == 11;
        };

        this.verificarSeTelefoneFixoPossuiDezDigitos = function (telefoneFixoComDDD) {
            var celular = telefoneFixoComDDD.toString();

            return celular.length == 10;
        };

        this.DDDs = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55,
                    61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99];

        this.validarEmail = function (emailString) {

            if (emailString == undefined || emailString == null || emailString == "") return false;

            var regex = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");

            return regex.test(emailString);
        };

        this.validarData = function (data) {

            if (!this.strValido(data)) return false;

            var regex = "\\d{2}/\\d{2}/\\d{4}";
            
            var dtArray = data.split("/");

            if (dtArray == null) return false;

            var dtDay = dtArray[0];
            var dtMonth = dtArray[1];
            var dtYear = dtArray[2];

            if (dtMonth < 1 || dtMonth > 12) return false;
            else if (dtDay < 1 || dtDay > 31) return false;
            else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) return false;
            else if (dtMonth == 2) {
                var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
                if (dtDay > 29 || (dtDay == 29 && !isleap)) return false;
            }
            return true;
        }

        this.gerarName = function () {
            return "" + Math.floor(Math.random() * (99999999 - 1)) + 1;
        }

        this.isNumber = function(valor) {
            return !isNaN(parseFloat(valor)) && isFinite(valor);
        }
    }
]);