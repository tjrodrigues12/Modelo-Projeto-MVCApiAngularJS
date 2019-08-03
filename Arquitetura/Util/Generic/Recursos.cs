using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Arquitetura.Base;
using System.Reflection;
using System.ComponentModel;
using System.Configuration;
using System.IO;

namespace Arquitetura.Util.Generic
{
    public static class Recursos
    {
        #region Strings

        public static string FormatarNome(string texto)
        {
            string novoNome = null;

            /* Lista Contendo Partes de Nomes que não são empregados a primeira letra Maiúscula */
            var aux = new List<string> { "e " };

            var aux2 = new List<string>();

            aux.Add("da ");
            aux.Add("de ");
            aux.Add("do ");

            var aux3 = new List<string>();
            aux2.Add("dos ");

            try
            {
                if (!String.IsNullOrEmpty(texto))
                {
                    /* Primeira posição com maiúsculo */
                    novoNome += texto.Substring(0, 1).ToUpper().Trim();

                    /* Loop no tamanho da palavra */
                    for (var i = 1; i < texto.Trim().Length; i++)
                    {
                        var subs = false;

                        /* Verificação do espaço */
                        if (texto.Substring(i, 1) == " ")
                        {
                            if ((i + 4) <= texto.Trim().Length)
                            {
                                if (aux.Contains(texto.Substring(i + 1, 3).ToLower()))
                                {
                                    /* Tratamento de minúsculo para as letras que não estão posterior ao espaço em branco */
                                    novoNome += texto.Substring(i, 1).ToLower();
                                    subs = true;
                                }
                                else if ((i + 5) <= texto.Trim().Length)
                                {
                                    if (aux2.Contains(texto.Substring(i + 1, 4).ToLower()))
                                    {
                                        /* Tratamento de minúsculo para as letras que não estão posterior ao espaço em branco */
                                        novoNome += texto.Substring(i, 1).ToLower();
                                        subs = true;
                                    }
                                }
                            }

                            if (subs == false)
                            {
                                /* Coloca-se letra maiúscula para a letra posterior ao espaço em branco */
                                novoNome += " " + texto.Substring(i + 1, 1).ToUpper();

                                /* Incrementa o contator do loop pois já foi tratado a posição posterior do espaço em branco */
                                i++;
                            }
                        }
                        else if (texto.Substring(i, 1) == "/")
                        {
                            /* 21/05/2013 - SLP - Ajustes para caracteres após a barra */
                            var indEspaco = texto.IndexOf(" ", i);

                            if (indEspaco != -1)
                            {
                                novoNome += texto.Substring(i, indEspaco - i);

                                i = indEspaco - 1;
                            }
                            else
                            {
                                novoNome += texto.Substring(i, texto.Length - i);

                                i = texto.Length;
                            }
                        }
                        /* Tratamento de minúsculo para as letras que não estão posterior ao espaço em branco */
                        else novoNome += texto.Substring(i, 1).ToLower();
                    }
                }
            }
            catch
            {
                return texto;
            }

            return novoNome;
        }

        public static bool ValidarString(string texto)
        {
            return !string.IsNullOrEmpty(texto) && !string.IsNullOrWhiteSpace(texto);
        }

        public static bool ValidarTamanhoMinimoString(string texto, int tamanho)
        {
            try
            {
                return texto.Length >= tamanho;
            }
            catch
            {
                return false;
            }
        }

        public static bool ValidarTamanhoMaximoString(string texto, int tamanho)
        {
            try
            {
                return texto.Length <= tamanho;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Remove todos os acentos e caracteres especiais da string informada.
        /// </summary>
        /// <param name="texto">String que terá os acentos removidos</param>
        /// <returns>Texto sem acentuação</returns>
        /// <author>FRR201408271449C</author>
        public static string RemoverAcentos(string texto)
        {
            if (string.IsNullOrEmpty(texto))
                return string.Empty;

            byte[] arrayBytes = System.Text.Encoding.GetEncoding("iso-8859-8").GetBytes(texto);

            return System.Text.Encoding.UTF8.GetString(arrayBytes);
        }

        /// <summary>
        /// Remove todos os caracteres não numéricos da string.
        /// </summary>
        /// <param name="texto">String que será formatada</param>
        /// <returns>String contendo somente numérico</returns>
        /// <author>FRR201408271449C</author>
        public static string RemoverCaracteresNaoNumerico(string texto)
        {
            return Regex.Replace(texto, "[^0-9]", string.Empty);
        }

        /// <summary>
        /// Remove todos os caracteres não alfa-numéricos da string.
        /// </summary>
        /// <param name="texto">String que será formatada</param>
        /// <returns>String contendo somente alfa-numérico</returns>
        /// <author>FRR201408271449C</author>
        public static string RemoverCaracteresNaoAlfaNumerico(string texto)
        {
            var result = Regex.Replace(texto, "[^0-9A-Za-z]", string.Empty);
            return result;
        }

        /// <summary>
        /// Remove todos os caracteres não alfa-numéricos da string mantendo os espaços entre os caracteres.
        /// </summary>
        /// <param name="texto">String que será formatada</param>
        /// <returns>String contendo somente alfa-numérico</returns>
        /// <author>FRR201408271449C</author>
        public static string RemoverCaracteresNaoAlfaNumericoComEspacos(string texto)
        {
            return Regex.Replace(texto, "[^0-9A-Za-z ]", string.Empty);
        }

        /// <summary>
        /// Remove todos os caracteres não alfa da string.
        /// </summary>
        /// <param name="texto">String que será formatada</param>
        /// <returns>String contendo somente alfa</returns>
        /// <author>FRR201408271449C</author>
        public static string RemoverCaracteresNaoAlfa(string texto)
        {
            return Regex.Replace(texto, "[^A-Za-z]", string.Empty);
        }

        /// <summary>
        /// Remove todos os caracteres não alfa da string mantendo os espaços entre os caracteres.
        /// </summary>
        /// <param name="texto">String que será formatada</param>
        /// <returns>String contendo somente alfa</returns>
        /// <author>FRR201408271449C</author>
        public static string RemoverCaracteresNaoAlfaComEspacos(string texto)
        {
            var result = Regex.Replace(texto, "[^A-Za-z ]", string.Empty);
            return result;
        }

        /// <summary>
        /// Remove todos os espaços entre os caracteres.
        /// </summary>
        /// <param name="texto">String que será formatada</param>
        /// <returns>String contendo somente alfa</returns>
        /// <author>FRR201408271449C</author>
        public static string RemoverEspacos(string texto)
        {
            return Regex.Replace(texto, "[ ]", string.Empty);
        }

        /// <summary>
        /// Remove acentos, espaços e caracteres especiais.
        /// </summary>
        /// <param name="texto">Texto a ser limpo</param>
        /// <returns>Texto em letras minúsculas sem acentos, espeços e caracteres especiais.</returns>
        /// <author>ACP20160621</author>
        public static string LimparTexto(string texto)
        {
            if (string.IsNullOrWhiteSpace(texto))
                return string.Empty;

            texto = RemoverAcentos(texto);
            texto = Regex.Replace(texto, "[^0-9A-Za-z]", string.Empty);

            return texto.ToLower();
        }

        public static string RemoveMask(string texto)
        {
            var tex = string.IsNullOrEmpty(texto) ? null : Regex.Replace(texto, "[_\\(\\)\\-\\.\\,\\/\\ ]", string.Empty);

            return tex;
        }

        public static string SubstituiCaracteresComRegex(string texto, string valorVelho, string valorNovo)
        {
            var novoTexto = RemoverAcentos(texto);

            novoTexto = Regex.Replace(novoTexto, valorVelho, valorNovo);

            return novoTexto.ToLower();
        }

        public static bool ValidarCaracteresTelefoneResidencial(string valor)
        {
            return valor.Length >= 10;
        }

        public static bool ValidarCaracteresTelefoneCelular(string valor)
        {
            return valor.Length == 11;
        }

        public static bool ValidarCaracteresCep(string valor)
        {
            return valor.Length == 8;
        }

        public static bool ValidarSomenteNumeros(string valor)
        {
            try
            {
                var num = long.Parse(valor);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public static string Complemento(string valor, int tamanho, string caracterComplemento = " ", string direcao = "E")
        {
            if (string.IsNullOrEmpty(valor)) valor = "";

            valor = valor.TrimStart().TrimEnd();

            var complemento = char.Parse(caracterComplemento);

            if (direcao == "E") valor = valor.PadLeft(tamanho, complemento);
            else valor = valor.PadRight(tamanho, complemento);

            return valor;
        }

        public static string Complemento(int valor, int tamanho, string caracterComplemento = " ", string direcao = "E")
        {
            return Complemento(valor.ToString(), tamanho, caracterComplemento, direcao);
        }

        public static string Complemento(decimal valor, int tamanho, string caracterComplemento = " ", string direcao = "E")
        {
            return Complemento(valor.ToString().Replace(",", "").Replace(".", ""), tamanho, caracterComplemento, direcao);
        }

        #endregion Strings        

        #region Número


        #endregion

        #region Data

        public static bool ValidarData(string data)
        {
            DateTime dataValida;
            DateTime.TryParse(data, out dataValida);

            return dataValida > DateTime.MinValue;
        }

        #endregion

        #region CPF

        /// <summary>
        /// Varifica se o algoritmo do CPF é válido. Obs: O método VerificarErrosCPF consome este método.
        /// </summary>
        /// <param name="cpf">Texto com o CPF</param>
        /// <returns>Bool</returns>
        /// <author>FRR201409230852</author>
        public static bool ValidarCPF(string cpf)
        {
            if (cpf == string.Empty)
            {
                return false;
            }

            int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string cpfTemporario;
            string digito;
            int soma = 0;
            int resto;

            cpf = RemoverCaracteresNaoNumerico(cpf);

            if (cpf.Length != 11)
            {
                return false;
            }

            cpfTemporario = cpf.Substring(0, 9);

            for (int i = 0; i < 9; i++)
            {
                soma += int.Parse(cpfTemporario[i].ToString()) * multiplicador1[i];
            }

            resto = soma % 11;

            if (resto < 2)
            {
                resto = 0;
            }
            else
            {
                resto = 11 - resto;
            }

            digito = resto.ToString();
            cpfTemporario = cpfTemporario + digito;
            soma = 0;

            for (int i = 0; i < 10; i++)
            {
                soma += int.Parse(cpfTemporario[i].ToString()) * multiplicador2[i];
            }

            resto = soma % 11;

            if (resto < 2)
            {
                resto = 0;
            }
            else
            {
                resto = 11 - resto;
            }

            digito = digito + resto.ToString();
            return cpf.EndsWith(digito);
        }

        /// <summary>
        /// Verifica se existem erros no CPF informado como tamanho, caracteres repetidos e validação do número pelo dígito verificador.
        /// </summary>
        /// <param name="cpf">Número de CPF</param>
        /// <returns>Lista de erros</returns>
        /// <author>FRR201409230857</author>
        public static List<string> VerificarErrosCPF(string cpf)
        {
            var erros = new List<string>();

            if (string.IsNullOrWhiteSpace(cpf))
            {
                erros.Add("Informe um CPF válido.");
                return erros;
            }

            cpf = RemoverCaracteresNaoNumerico(cpf);


            // Verifica o algoritmo do CPF
            if (!ValidarCPF(cpf))
            {
                erros.Add("O número de CPF informado não é válido.");
            }

            // Verifica se o tamanho do CPF corresponde à 11 caracteres.
            if (string.IsNullOrEmpty(cpf) || cpf.Length < 11)
            {
                erros.Add("O número do CPF não pode possuir menos de 11 caracteres.");
            }

            // Verifica se o CPF não possui somente caracteres repetidos.
            var cpfInvalido = new List<string>(new string[] {
                "00000000000",
                "11111111111",
                "22222222222",
                "33333333333",
                "44444444444",
                "55555555555",
                "66666666666",
                "77777777777",
                "88888888888",
                "99999999999",
                "00000000191"});

            if (cpfInvalido.Contains(cpf))
            {
                erros.Add("O número de CPF informado não pode possuir somente caracteres repetidos.");
            }

            return erros;
        }

        #endregion CPF

        #region Email

        public static List<string> VerificarErrosEmail(string email)
        {
            var erros = new List<string>();

            if (string.IsNullOrWhiteSpace(email))
            {
                erros.Add("Informe um e-mail válido.");
                return erros;
            }

            if (!ValidarEmail(email))
            {
                erros.Add("O e-mail informado não é válido.");
            }

            return erros;
        }

        /// <summary>
        /// Verifica se o formato do email informado é válido.
        /// </summary>
        /// <param name="email">Endereço de email</param>
        /// <returns>Bool</returns>
        /// <author>FRR201409181514</author>
        public static bool ValidarEmail(string email)
        {
            return Regex.IsMatch(email, @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
        }

        #endregion Email

        #region Resposta de Erro

        //public static HttpResponseMessage CriarRespostaDeErro(HttpStatusCode status, string mensagem)
        //{
        //    var requestMessage = new HttpRequestMessage();
        //    var msg = new { texto = mensagem, tipoMensagem = 3 };
        //    return requestMessage.CreateErrorResponse(status, msg.ToJson());
        //}

        //public static HttpResponseMessage CriarRespostaDeErro(HttpStatusCode status, List<string> mensagem)
        //{
        //    var msgs = new List<object>();
        //    var requestMessage = new HttpRequestMessage();
        //    mensagem.ForEach(m => msgs.Add(new { texto = m, tipoMensagem = 3 }));

        //    return requestMessage.CreateErrorResponse(status, msgs.ToJson());
        //}

        #endregion Resposta de Erro

        public static Dictionary<int, string> EnumToDictionary(Type value)
        {
            var dicEnum = Enum.GetValues(value).Cast<object>().OrderBy(x => x).ToDictionary(item => ((Enum)item).Int32Val(), item => ((Enum)item).StrVal());

            return dicEnum.OrderBy(x => x.Value).ToDictionary(x => x.Key, x => x.Value);
        }

        /// <summary>
        /// Gera uma lista de anos referência a partir do ano passado como parâmetro até o ano atual
        /// </summary>
        /// <param name="anoInicio">ano inicial</param>
        /// <returns>Lista de inteiros</returns>
        public static List<int> AnosReferencia(int anoInicio)
        {
            var lstAnoReferencia = new List<int>();

            while (anoInicio <= DateTime.Now.Year)
            {
                lstAnoReferencia.Add(anoInicio++);
            }

            return lstAnoReferencia;
        }

        /// <summary>
        /// Gera uma lista de anos referência a partir do ano passado como parâmetro até o ano atual
        /// E adiciona quantos anos forem necessários passando a qtde por parâmetro
        /// </summary>
        /// <param name="anoInicio">ano inicial</param>
        /// /// <param name="qtdeAnoAdicional">quantidade de anos adicionais</param>
        /// <returns>Lista de inteiros</returns>
        public static List<int> AnosReferencia(int anoInicio, int qtdeAnoAdicional)
        {
            var lstAnoReferencia = new List<int>();

            var anoAtual = DateTime.Now.Year;

            if (anoInicio > anoAtual)
            {
                lstAnoReferencia.Add(anoInicio);
            }
            else
            {
                while (anoInicio <= anoAtual)
                {
                    lstAnoReferencia.Add(anoInicio++);
                }
            }

            for (int i = 0; i < qtdeAnoAdicional; i++)
            {
                var ultimoAno = lstAnoReferencia.Last();
                lstAnoReferencia.Add(ultimoAno + 1);
            }


            return lstAnoReferencia;
        }

        public static string GeraHashMD5(string valor)
        {
            var md5Hash = MD5.Create();

            // Converte o valor em um hash MD5 computado
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(valor));

            // Cria uma StringBuilder para armazenar os bytes do hash
            var sBuilder = new StringBuilder();

            // Faz um loop nos bytes do hash e formata como string hexadecimal
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("X2"));
            }

            // Retorna a string hexadecimal
            return sBuilder.ToString();
        }

        public static bool VerificaHashMD5(string valor, string hash)
        {
            // Gera o MD5 a partir do valor passado.
            string hashOfInput = GeraHashMD5(valor);

            // Cria uma StringComparer e compara os hashes.
            var comparer = StringComparer.OrdinalIgnoreCase;

            if (0 == comparer.Compare(hashOfInput, hash))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static string RemoveTagHTML(string source)
        {
            char[] array = new char[source.Length];
            int arrayIndex = 0;
            bool inside = false;

            for (int i = 0; i < source.Length; i++)
            {
                char let = source[i];
                if (let == '<')
                {
                    inside = true;
                    continue;
                }
                if (let == '>')
                {
                    inside = false;
                    continue;
                }
                if (!inside)
                {
                    array[arrayIndex] = let;
                    arrayIndex++;
                }
            }
            return new string(array, 0, arrayIndex);
        }

        /// <summary>
        /// Calcula Idade da data de nascimento até a data informada
        /// </summary>
        /// <param name="dtNascimento">data de nascimento</param>
        /// <param name="dtAtual">data atual</param>
        /// <returns>idade</returns>
        public static int CalculaIdade(DateTime dtNascimento, DateTime dtAtual)
        {
            int idade = 0;
            int anoNasc = dtNascimento.Year;
            int mesNasc = dtNascimento.Month;
            int diaNasc = dtNascimento.Day;
            int anoAtual = dtAtual.Year;
            int mesAtual = dtAtual.Month;
            int diaAtual = dtAtual.Day;

            if (anoAtual < 100)
                anoAtual = anoAtual + 1900;

            idade = anoAtual - anoNasc;

            if (mesAtual < mesNasc)
                idade = idade - 1;

            if (mesAtual == mesNasc)
            {
                if (diaAtual < diaNasc)
                    idade = idade - 1;
            }

            return idade;
        }

        public static void CalculaIdade(DateTime dataNascimento, out int anos, out int meses)
        {
            anos = 0;

            meses = 0;

            var dayDate = DateTime.Now;

            if (dataNascimento.Date > dayDate.Date) return;

            var years = dayDate.Year - dataNascimento.Year;

            var months = 0;

            var days = 0;

            if (dayDate < dataNascimento.AddYears(years) && years != 0) years--;

            dataNascimento = dataNascimento.AddYears(years);

            if (dataNascimento.Year == dayDate.Year) months = dayDate.Month - dataNascimento.Month;
            else months = (12 - dataNascimento.Month) + dayDate.Month;

            if (dayDate < dataNascimento.AddMonths(months) && months != 0) months--;

            dataNascimento = dataNascimento.AddMonths(months);

            days = (dayDate - dataNascimento).Days;

            anos = years;

            meses = months;
        }

        public static T ParseEnum<T>(string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

        public static string HeaderArquivo(string extensao)
        {
            try
            {
                var ext = RemoverCaracteresNaoAlfaNumericoComEspacos(extensao);

                var eTipoArquivo = ParseEnum<ETipoArquivo>(ext);

                return eTipoArquivo.StrVal();
            }
            catch (Exception)
            {
                return ETipoArquivo.OCTECT.StrVal();
            }
        }

        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (attributes != null && attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }

        public static string GetRepositorioArquivo()
        {
            if (ConfigurationManager.AppSettings["AppAmbiente"].ToString().ToUpper() == "PRODUCAO")
                return "//ms/repositorio/DataWeb/sed/portalsed/PRODUCAO";
            else
                return "//ms/repositorio/DataWeb/sed/portalsed/HOMOLOGACAO";
        }

        public static byte[] StreamToByteArray(string fileName)
        {
            byte[] buffer = null;

            using (Stream input = File.Open(fileName, FileMode.Open, FileAccess.Read))
            {
                int streamEnd = Convert.ToInt32(input.Length);
                buffer = new byte[streamEnd];
                input.Read(buffer, 0, streamEnd);
            }
            return buffer;
        }

        public static List<int> GerarIntervaloInteiros(int inicio, int fim, int atual)
        {
            var result = new List<int>();

            for (int i = inicio; i <= fim; i++)
            {
                if (i > atual) break;

                result.Add(i);
            }

            return result;
        }

        public static string CriptografarChaveAcesso(string valor)
        {
            byte[] chave = { };
            byte[] iv = { 12, 34, 56, 78, 90, 102, 114, 126 };

            string ChaveCriptografia = "EDUCACAOPARAOSUCESSOMS";
            DESCryptoServiceProvider des;
            MemoryStream ms;
            CryptoStream cs; byte[] input;
            try
            {
                des = new DESCryptoServiceProvider();
                ms = new MemoryStream();

                input = Encoding.UTF8.GetBytes(valor); chave = Encoding.UTF8.GetBytes(ChaveCriptografia.Substring(0, 8));
                cs = new CryptoStream(ms, des.CreateEncryptor(chave, iv), CryptoStreamMode.Write);
                cs.Write(input, 0, input.Length);
                cs.FlushFinalBlock();

                return Convert.ToBase64String(ms.ToArray());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string Descriptografar(string valor)
        {
            byte[] chave = { };
            byte[] iv = { 12, 34, 56, 78, 90, 102, 114, 126 };

            string ChaveCriptografia = "EDUCACAOPARAOSUCESSOMS";
            DESCryptoServiceProvider des;
            MemoryStream ms;
            CryptoStream cs; byte[] input;

            try
            {
                des = new DESCryptoServiceProvider();
                ms = new MemoryStream();

                input = new byte[valor.Length];
                input = Convert.FromBase64String(valor.Replace(" ", "+"));

                chave = Encoding.UTF8.GetBytes(ChaveCriptografia.Substring(0, 8));

                cs = new CryptoStream(ms, des.CreateDecryptor(chave, iv), CryptoStreamMode.Write);
                cs.Write(input, 0, input.Length);
                cs.FlushFinalBlock();

                return Encoding.UTF8.GetString(ms.ToArray());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
