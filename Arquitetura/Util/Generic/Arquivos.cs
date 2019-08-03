using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Arquitetura.Util.Generic
{
    public class Arquivos
    {
        #region Campos

        private string _urlServidor;
        private string _dirCompleto;
        #endregion

        #region Propriedades

        public string UrlServidor
        {
            get
            {
                return _urlServidor;
            }
            private set
            {
                _urlServidor = value;
            }
        }

        public string DirCompleto
        {
            get
            {
                return _dirCompleto;
            }
            private set
            {
                _dirCompleto = value;
            }
        }

        #endregion

        #region Construtor

        public Arquivos(string urlServidor)
        {
            UrlServidor = urlServidor;
        }

        #endregion

        #region Métodos Públicos

        /// <summary>
        /// Cria um diretório a partir do parâmetro especificado
        /// </summary>
        /// <param name="diretorio"></param>
        public void CriaDiretorio(string diretorio)
        {
            ValidaDiretorio(diretorio);

            if (!Directory.Exists(DirCompleto))
            {
                Directory.CreateDirectory(DirCompleto);
            }
        }

        /// <summary>
        /// Cria um diretórios a partir de um array especificado
        /// </summary>
        /// <param name="diretorio"></param>
        public void CriaDiretorio(string[] diretorio)
        {
            foreach (var item in diretorio)
            {
                ValidaDiretorio(item);

                if (!Directory.Exists(DirCompleto))
                {
                    Directory.CreateDirectory(DirCompleto);
                }
            }
        }

        /// <summary>
        /// Apaga todos os arquivos do parâmetro especificado
        /// </summary>
        /// <param name="diretorio"></param>
        public void ApagaArquivos(string diretorio)
        {
            ValidaDiretorio(diretorio);

            if (!Directory.Exists(DirCompleto))
            {
                var dirInfo = new DirectoryInfo(DirCompleto);

                foreach (FileInfo item in dirInfo.GetFiles())
                {
                    item.Delete();
                }
            }
        }

        /// <summary>
        /// Apaga os arquivos temporários com mais de uma hora
        /// </summary>
        /// <param name="diretorio"></param>
        public void ApagaTemporarios(string diretorio)
        {
            ValidaDiretorio(diretorio);

            var dirInfo = new DirectoryInfo(DirCompleto);

            foreach (FileInfo item in dirInfo.GetFiles())
            {
                //Pega a diferença(tempo) entre a ultima data de escrita e hoje
                TimeSpan ts = DateTime.Now.Subtract(item.LastWriteTime);

                if (ts.Hours > 1)
                {
                    item.Delete();
                }
            }
        }
        
        /// <summary>
        /// Cria um arquivo temporário no diretório especificado com a extensão especificada
        /// </summary>
        /// <param name="diretorio"></param>
        /// <param name="extensao"></param>
        /// <returns></returns>
        public string CriaTemporario(string diretorio, string extensao)
        {
            ValidaDiretorio(diretorio);

            string nome = DateTime.Now.ToFileTimeUtc().ToString();
            string fileName = $"{DirCompleto}\\{nome}.{extensao}";
            return Path.ChangeExtension(fileName, extensao);
        }

        public bool SalvaArquivo(string diretorio, string nomeArquivo, byte[] arquivo)
        {
            ValidaDiretorio(diretorio);

            if (arquivo != null && arquivo.Length > 0)
            {
                File.WriteAllBytes(DirCompleto + nomeArquivo, arquivo);

                return true;
            }

            return false;
        }

        public FileInfo[] ListarArquivos(string diretorio, string filtro = "*")
        {
            ValidaDiretorio(diretorio);
            FileInfo[] arquivos = new DirectoryInfo(DirCompleto).GetFiles(filtro);
            return arquivos;
        }

        /// <summary>
        /// Verifica se um arquivo existe de acordo com o diretório especificado e o nome do arquivo especificado
        /// </summary>
        /// <param name="diretorio">Cadastrado no banco preferencialmente</param>
        /// <param name="nomeArquivo">Nome do arquivo com extensão</param>
        /// <returns></returns>
        public bool ArquivoExiste(string diretorio, string nomeArquivo)
        {
            ValidaDiretorio(diretorio);

            return File.Exists(DirCompleto + nomeArquivo);
        }

        #endregion

        #region Métodos Privados

        private void ValidaDiretorio(string diretorio)
        {
            if (diretorio.Contains(":"))
            {
                DirCompleto = diretorio;
            }
            else
            {
                DirCompleto = UrlServidor + diretorio;
            }
        }

        #endregion
    }
}
