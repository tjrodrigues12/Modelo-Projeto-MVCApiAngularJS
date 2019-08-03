using Arquitetura.Util;
using Dominio.Relatorios;
using Servico.ReportServiceServer;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net;

namespace Servico.Relatorios
{
    /// <summary>
    /// Classe para geração e exportação de relatórios feitos no Report Builder 3.0 localizados no Report Server    /// 
    /// </summary>
    public class ExportarRelatorioRS
    {
        /// <summary>
        /// Gerar arquivo binário conforme formato e caminho do relatório especificado e seus parâmetros
        /// </summary>
        /// <param name="formato"></param>
        /// <param name="caminho"></param>
        /// <param name="parametros"></param>
        /// <returns></returns>
        public byte[] RelatorioBinarioRS(string formato, string caminho, List<ParametroRelatorio> parametros)
        {
            var rs = new ReportExecutionService
            {
                Credentials = CredentialCache.DefaultNetworkCredentials,
                Url = GerenciadorConfiguracao.ServidorDeRelatorio
            };

            string PastaDoRelatorio = GerenciadorConfiguracao.PastaDoRelatorio;
            byte[] result = null;
            string reportPath = PastaDoRelatorio + caminho;
            string format = formato;
            string historyID = null;
            string devInfo = @"<DeviceInfo><Toolbar>False</Toolbar></DeviceInfo>";

            var executionParams = new List<ParameterValue>();

            foreach (var parametro in parametros)
            {
                executionParams.Add(new ParameterValue
                {
                    Name = parametro.IdParametro,
                    Value = parametro.Valor != null ? parametro.Valor.ToString() : null
                });
            }

            string encoding;
            string mimeType;
            string extension;
            Warning[] warnings = null;
            string[] streamIDs = null;

            var execInfo = new ExecutionInfo();
            var execHeader = new ExecutionHeader();

            rs.ExecutionHeaderValue = execHeader;

            execInfo = rs.LoadReport(reportPath, historyID);
            rs.SetExecutionParameters(executionParams.ToArray(), "pt-BR");
            String SessionId = rs.ExecutionHeaderValue.ExecutionID;

            try
            {
                result = rs.Render(format, devInfo, out extension, out encoding, out mimeType, out warnings, out streamIDs);
                execInfo = rs.GetExecutionInfo();
            }
            catch (Exception ex)
            {
                throw new Exception($"Não foi possível gerar o relatório erro do servidor : {ex.RecuperarMsgExcecaoAninhada()}");
            }

            return result;
        }

        /// <summary>
        /// Criar parâmetros correspondentes ao existente no relatório que será serializado
        /// </summary>
        /// <param name="idParametro">Nome do parâmetro no documento rpt ex.: "@data"</param>
        /// <param name="valor">Valor a ser atribuído ao parâmetro</param>
        /// <returns>ParameterField generalizado como object</returns>
        public static ParametroRelatorio CriarParametroSerializacao(string idParametro, object valor)
        {
            ParametroRelatorio pr = new ParametroRelatorio();

            pr.IdParametro = idParametro;
            pr.Valor = valor;

            return pr;
        }

        public static ParametroRelatorio CriarParametroSerializacao(string idParametro)
        {
            ParametroRelatorio pr = new ParametroRelatorio();

            pr.IdParametro = idParametro;
            pr.Valor = null;

            return pr;
        }

        /// <summary>
        /// Enumerador dos formatos suportados para serialização, esta lista foi criada para evitar que sejam agregados
        /// às páginas de relatórios os namespaces do repor server, facilitando a especificação do formato a ser utilizado
        /// </summary>
        public enum EFormatoImpressao
        {
            /// <summary>
            /// Emite o relatório no formato PDF para abrir com o Adobe Reader ou Foxit Reader.
            /// </summary>
            [Description(".pdf")]
            PDF = 1,

            /// <summary>
            /// Emite o relatório no formato XLS para abrir com o Microsoft Excel.
            /// </summary>
            [Description(".xls")]
            EXCEL = 2,

            /// <summary>
            /// Emite o relatório no formato DOC para abrir com o Microsoft Word.
            /// </summary>
            [Description(".doc")]
            WORD = 3,

            /// <summary>
            /// Emite o relatório no formato HTML para abrir em qualquer browser.
            /// </summary>
            [Description(".htm")]
            MHTML = 4
        }
    }
}
