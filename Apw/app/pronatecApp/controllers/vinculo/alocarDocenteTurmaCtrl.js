vinculoMdl.controller('alocarDocenteTurmaCtrl', ['$scope', 'vinculoSvc', 'globalSvc', 'ValidationService',
    function ($scope, service, globalSvc, validationService) {

        $scope.dados = $scope.$parent.estadoAlocarDocente;

        $scope.alocacao = {};

        $scope.drop = {};

        $scope.obterAnosReferencias = function () {
            $scope.loadAr = service.obterAnosReferenciasParaAlocarDocenteTurma($scope.dados.programaId).then(function (response) {
                $scope.anosReferencias = response.data;
                if ($scope.anosReferencias != undefined && $scope.anosReferencias != null) {
                    if ($scope.anosReferencias.length == 0) $scope.anosReferencias = null;
                    else if ($scope.anosReferencias.length == 1) {
                        $scope.alocacao.anoReferencia = $scope.anosReferencias[0].anoReferencia;
                        $scope.obterAnosLetivos();
                    }
                }
            });

            $scope.alocacao.anoReferencia = "";
            $scope.anosLetivos = [];
            $scope.alocacao.anoLetivoId = "";
            $scope.cursos = [];
            $scope.alocacao.cursoId = "";
            $scope.anosFases = [];
            $scope.alocacao.anoFaseId = "";
            $scope.projetosCiclos = [];
            $scope.alocacao.projetoCicloId = "";
            $scope.turnos = [];
            $scope.alocacao.turnoId = "";
            $scope.turmas = [];
            $scope.alocacao.turmaId = "";
            $scope.turmasMatrizesDisciplinas = [];
        }

        $scope.obterAnosLetivos = function () {
            if ($scope.alocacao.anoReferencia != undefined && $scope.alocacao.anoReferencia != null && $scope.alocacao.anoReferencia > 0) {
                $scope.loadAl = service.obterAnosLetivosParaAlocarDocenteTurma($scope.dados.programaId, $scope.alocacao.anoReferencia).then(function (response) {
                    $scope.anosLetivos = response.data;
                    if ($scope.anosLetivos != undefined && $scope.anosLetivos != null) {
                        if ($scope.anosLetivos.length == 0) $scope.anosLetivos = null;
                        else if ($scope.anosLetivos.length == 1) {
                            $scope.alocacao.anoLetivoId = $scope.anosLetivos[0].anoLetivoId;
                            $scope.obterCursos();
                        }
                    }
                });
            }
            else $scope.anosLetivos = [];

            $scope.alocacao.anoLetivoId = "";
            $scope.cursos = [];
            $scope.alocacao.cursoId = "";
            $scope.anosFases = [];
            $scope.alocacao.anoFaseId = "";
            $scope.projetosCiclos = [];
            $scope.alocacao.projetoCicloId = "";
            $scope.turnos = [];
            $scope.alocacao.turnoId = "";
            $scope.turmas = [];
            $scope.alocacao.turmaId = "";
            $scope.turmasMatrizesDisciplinas = [];
        }

        $scope.obterCursos = function () {
            if ($scope.alocacao.anoLetivoId != undefined && $scope.alocacao.anoLetivoId != null && $scope.alocacao.anoLetivoId > 0) {
                $scope.loadCur = service.obterCursosParaAlocarDocenteTurma($scope.dados.programaId, $scope.alocacao.anoLetivoId).then(function (response) {
                    $scope.cursos = response.data;
                    if ($scope.cursos != undefined && $scope.cursos != null) {
                        if ($scope.cursos.length == 0) $scope.cursos = null;
                        else if ($scope.cursos.length == 1) {
                            $scope.alocacao.cursoId = $scope.cursos[0].cursoId;
                            $scope.obterAnosFases();
                        }
                    }
                });
            }
            else $scope.cursos = [];

            $scope.alocacao.cursoId = "";
            $scope.anosFases = [];
            $scope.alocacao.anoFaseId = "";
            $scope.projetosCiclos = [];
            $scope.alocacao.projetoCicloId = "";
            $scope.turnos = [];
            $scope.alocacao.turnoId = "";
            $scope.turmas = [];
            $scope.alocacao.turmaId = "";
            $scope.turmasMatrizesDisciplinas = [];
        }

        $scope.obterAnosFases = function () {
            if ($scope.alocacao.cursoId != undefined && $scope.alocacao.cursoId != null && $scope.alocacao.cursoId > 0) {
                $scope.loadAf = service.obterAnosFasesParaAlocarDocenteTurma($scope.dados.programaId, $scope.alocacao.anoLetivoId, $scope.alocacao.cursoId).then(function (response) {
                    $scope.anosFases = response.data;
                    if ($scope.anosFases != undefined && $scope.anosFases != null) {
                        if ($scope.anosFases.length == 0) $scope.anosFases = null;
                        else if ($scope.anosFases.length == 1) {
                            $scope.alocacao.anoFaseId = $scope.anosFases[0].anoFaseId;
                            $scope.obterProjetosCiclos();
                        }
                    }
                });
            }
            else $scope.anosFases = [];

            $scope.alocacao.anoFaseId = "";
            $scope.projetosCiclos = [];
            $scope.alocacao.projetoCicloId = "";
            $scope.turnos = [];
            $scope.alocacao.turnoId = "";
            $scope.turmas = [];
            $scope.alocacao.turmaId = "";
            $scope.turmasMatrizesDisciplinas = [];
        }

        $scope.obterProjetosCiclos = function () {
            if ($scope.alocacao.anoFaseId != undefined && $scope.alocacao.anoFaseId != null && $scope.alocacao.anoFaseId > 0) {
                $scope.loadPc = service.obterProjetosCiclosParaAlocarDocenteTurma($scope.dados.programaId, $scope.alocacao.anoLetivoId, $scope.alocacao.cursoId, $scope.alocacao.anoFaseId).then(function (response) {
                    $scope.projetosCiclos = response.data;
                    if ($scope.projetosCiclos != undefined && $scope.projetosCiclos != null) {
                        if ($scope.projetosCiclos.length == 0) $scope.projetosCiclos = null;
                        else if ($scope.projetosCiclos.length == 1) {
                            $scope.alocacao.projetoCicloId = $scope.projetosCiclos[0].projetoCicloId;
                            $scope.obterTurnos();
                        }
                    }
                });
            }
            else $scope.projetosCiclos = [];

            $scope.alocacao.projetoCicloId = "";
            $scope.turnos = [];
            $scope.alocacao.turnoId = "";
            $scope.turmas = [];
            $scope.alocacao.turmaId = "";
            $scope.turmasMatrizesDisciplinas = [];
        }

        $scope.obterTurnos = function () {
            if ($scope.alocacao.projetoCicloId != undefined && $scope.alocacao.projetoCicloId != null && $scope.alocacao.projetoCicloId > 0) {
                $scope.loadTur = service.obterTurnosParaAlocarDocenteTurma($scope.dados.programaId, $scope.alocacao.anoLetivoId, $scope.alocacao.cursoId, $scope.alocacao.anoFaseId, $scope.alocacao.projetoCicloId).then(function (response) {
                    $scope.turnos = response.data;
                    if ($scope.turnos != undefined && $scope.turnos != null) {
                        if ($scope.turnos.length == 0) $scope.turnos = null;
                        else if ($scope.turnos.length == 1) {
                            $scope.alocacao.turnoId = $scope.turnos[0].turnoId;
                            $scope.obterTurmas();
                        }
                    }
                });
            }
            else $scope.turnos = [];

            $scope.alocacao.turnoId = "";
            $scope.turmas = [];
            $scope.alocacao.turmaId = "";
            $scope.turmasMatrizesDisciplinas = [];
        }

        $scope.obterTurmas = function () {
            if ($scope.alocacao.turnoId != undefined && $scope.alocacao.turnoId != null && $scope.alocacao.turnoId > 0) {
                $scope.loadTma = service.obterTurmasParaAlocarDocenteTurma($scope.dados.programaId, $scope.alocacao.anoLetivoId, $scope.alocacao.cursoId, $scope.alocacao.anoFaseId, $scope.alocacao.projetoCicloId, $scope.alocacao.turnoId).then(function (response) {
                    $scope.turmas = response.data;
                    if ($scope.turmas != undefined && $scope.turmas != null) {
                        if ($scope.turmas.length == 0) $scope.turmas = null;
                        else if ($scope.turmas.length == 1) {
                            $scope.alocacao.turmaId = $scope.turmas[0].turmaId;
                        }
                    }
                });
            }
            else $scope.turmas = [];

            $scope.alocacao.turmaId = "";
            $scope.turmasMatrizesDisciplinas = [];
        }

        $scope.pesquisar = function () {

            globalSvc.limparMensagens();

            $scope.turmasMatrizesDisciplinas = [];

            if (!(new validationService()).checkFormValidity($scope.formPesquisar)) {
                globalSvc.mensagemNegativo("Verifique os campos abaixo!");
                return false;
            }

            if (!validarDataInicioVigencia()) return false;

            if ($scope.alocacao.turmaId != undefined && $scope.alocacao.turmaId != null && $scope.alocacao.turmaId > 0) {
                $scope.loadTmd = service.obterTurmasMatrizesDisciplinasParaAlocarDocenteTurma($scope.alocacao.turmaId, $scope.alocacao.dataInicioVigencia).then(function (response) {
                    $scope.turmasMatrizesDisciplinas = response.data;
                });
            }
        }

        $scope.todosSelecionados = false;

        $scope.selecionarTodos = function () {

            $scope.todosSelecionados = !$scope.dados.todosSelecionados;

            $scope.turmasMatrizesDisciplinas = $scope.turmasMatrizesDisciplinas.map(function (x) {
                return {
                    selecao: x.possuiAlocacao ? x.selecao : $scope.dados.todosSelecionados,
                    dataInicioVigencia: x.dataInicioVigencia,
                    dataFinalVigencia: x.dataFinalVigencia,
                    turmaMatrizDisciplinaId: x.turmaMatrizDisciplinaId,
                    disciplinaId: x.disciplinaId,
                    disciplina: x.disciplina,
                    cargaHorariaSemanal: x.cargaHorariaSemanal,
                    docente: x.docente,
                    possuiAlocacao: x.possuiAlocacao
                }
            });
        }

        $scope.alocar = function () {

            globalSvc.limparMensagens();

            if (!validarDisciplinasSelecionadas()
                || !validarDisciplinaAlocada()
                || !validarDisciplinaVigencia()) {
                return false;
            }

            var selecionados = $scope.turmasMatrizesDisciplinas
            .filter(function (x) {
                return x.selecao
            })
            .map(function (x) {
                return {
                    turmaMatrizDisciplinaId: x.turmaMatrizDisciplinaId,
                    anoLetivo: $scope.drop.anoLetivo.selected.anoLetivo,
                    curso: $scope.drop.curso.selected.curso,
                    turnoId: $scope.drop.turno.selected.turnoId,
                    turno: $scope.drop.turno.selected.turno,
                    turma: $scope.drop.turma.selected.nomeTurma,
                    disciplina: x.disciplina,
                    dataInicioVigencia: x.dataInicioAlocacao,
                    dataFinalVigencia: x.dataFinalAlocacao,
                    cargaHoraria: x.cargaHorariaSemanal
                }
            });

            for (var i = 0; i < selecionados.length; i++) {
                $scope.dados.alocacoes.push(selecionados[i]);
            }

            $scope.$parent.redirecionarAlocarDocente();
        }

        function validarDataInicioVigencia() {
            var dataInicioVigencia = globalSvc.converterData($scope.dados.dataInicioVigencia);
            var dataFinalVigencia = globalSvc.converterData($scope.dados.dataFinalVigencia);

            if (($scope.alocacao.dataInicioVigencia < dataInicioVigencia) || ($scope.alocacao.dataInicioVigencia > dataFinalVigencia)) {
                globalSvc.mensagemNegativo('A data de início da vigência deve ser compatível com o período do vínculo!');
                return false;
            }

            return true;
        }

        function validarDisciplinasSelecionadas() {

            var selecionados = $scope.turmasMatrizesDisciplinas
                .filter(function (x) {
                    return x.selecao
                });

            if (selecionados.length == 0) {

                globalSvc.mensagemNegativo("Selecione a(s) disciplina(s) para alocar!");

                return false;
            }

            return true;
        }

        function validarDisciplinaAlocada() {

            var selecionados = $scope.turmasMatrizesDisciplinas
                .filter(function (x) {
                    return x.selecao
                });

            for (var i = 0; i < selecionados.length; i++) {

                if (selecionados[i].possuiAlocacao) {

                    globalSvc.mensagemNegativo('A disciplina "' + selecionados[i].disciplina + '" já está alocada para o(a) docente "' + selecionados[i].docente + '"!');

                    return false;
                }
            }

            return true;
        }

        function validarDisciplinaVigencia() {

            var vigencia = $scope.turmasMatrizesDisciplinas
                .filter(function (x) {
                    return x.selecao
                })[0];

            if ((vigencia.dataInicioVigencia < $scope.dados.dataInicioVigencia && vigencia.dataFinalVigencia < $scope.dados.dataInicioVigencia)
                || (vigencia.dataInicioVigencia > $scope.dados.dataFinalVigencia && vigencia.dataFinalVigencia > $scope.dados.dataFinalVigencia)) {
                globalSvc.mensagemNegativo('A(s) disciplina(s) selecionados não possui(em) vigência(s) compatíveis com a vigência do vinculo!');

                return false;
            }

            return true;
        }

        $scope.voltar = function () {
            $scope.redirecionarVinculosProfissional();
        };

        function init() {
            if ($scope.$parent.vinculoId) {
                $scope.alocacao.dataInicioVigencia = globalSvc.converterData($scope.dados.dataInicioVigencia);
                $scope.obterAnosReferencias();
                $scope.turmasMatrizesDisciplinas = [];
            }
            else {
                $scope.$parent.redirecionarVinculosProfissional();
            }
        };

        init();
    }
]);