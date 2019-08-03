using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;

namespace Arquitetura.Util.Generic
{
    public class CaptchaImagem
    {
        // Propriedades Públicas.
        public int Composicao
        {
            get { return this.composicao; }
        }
        public string Texto
        {
            get { return this.texto; }
        }
        public Bitmap Image
        {
            get { return this.imagem; }
        }
        public int Width
        {
            get { return this.largura; }
        }
        public int Height
        {
            get { return this.altura; }
        }

        // Propriedades internas.
        private int composicao;
        private string texto;
        private int largura;
        private int altura;
        private string fonte;
        private Bitmap imagem;

        /// <summary>
        /// Inicializa uma nova instância da classe usando
        /// um texto especificado, largura e altura.
        /// </summary>
        /// <param name="comprimento"></param>
        /// <param name="largura"></param>
        /// <param name="altura"></param>
        public CaptchaImagem(int comprimento, int largura, int altura)
            : this(comprimento, largura, altura, 1, null)
        {
        }

        // Para gerar números randômicos.
        private Random random = new Random();

        /// <summary>
        /// Inicializa uma nova instância da classe usando
        /// um texto especificado, largura e altura.
        /// </summary>
        /// <param name="comprimento"></param>
        /// <param name="largura"></param>
        /// <param name="altura"></param>
        public CaptchaImagem(int comprimento, int largura, int altura, int composicao)
            : this(comprimento, largura, altura, composicao, null)
        {
        }

        /// <summary>
        /// Inicializa uma nova instância da classe usando
        /// um texto especificado, largura, altura e fonte
        /// </summary>
        /// <param name="length"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="familyName"></param>
        public CaptchaImagem(int comprimento, int largura, int altura, int composicao, string fonte)
        {
            this.composicao = composicao;
            this.texto = GerarTextoRandomico(comprimento);
            this.AtribuirDimensoes(largura, altura);
            this.AtribuirFonte(fonte);
            this.CriarImagem();
        }

        /// <summary>
        /// Este método sobrescreve Object.Finalize.
        /// </summary>
        ~CaptchaImagem()
        {
            Dispose(false);
        }

        /// <summary>
        /// Libera todos os recursos utilizados por este objeto
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
            this.Dispose(true);
        }

        /// <summary>
        /// Dispose customizado
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                // Destrói o bitmap
                this.imagem.Dispose();
        }

        private string GerarTextoRandomico(int comprimento)
        {
            Random rnd = new Random();
            List<char> tabela = new List<char>();

            if (this.composicao == 2 || this.composicao == 3)
                for (char i = 'a'; i <= 'z'; i++)
                    tabela.Add(i);

            if (this.composicao == 1 || this.composicao == 3)
                for (char i = '0'; i <= '9'; i++)
                    tabela.Add(i);

            string retorno = "";

            for (int i = 0; i < comprimento; i++)
                retorno += tabela[rnd.Next(tabela.Count)];

            return retorno;
        }

        /// <summary>
        /// Atribuir a largura e altura para a imagem
        /// </summary>
        /// <param name="largura"></param>
        /// <param name="altura"></param>
        private void AtribuirDimensoes(int largura, int altura)
        {
            // Verifica a largura e altura.
            if (largura <= 0)
                throw new ArgumentOutOfRangeException("largura", largura, "O valor deve ser maior do que zero.");
            if (altura <= 0)
                throw new ArgumentOutOfRangeException("altura", altura, "O valor deve ser maior do que zero.");
            this.largura = largura;
            this.altura = altura;
        }

        // ====================================================================
        // Atribui a fonte a ser utilizada no texto.
        // ====================================================================
        private void AtribuirFonte(string fonte)
        {
            // Se a fonte escolhida nao estiver instalada, atribui uma fonte do sistema.
            try
            {
                Font font = new Font(this.fonte, 12F);
                this.fonte = fonte;
                font.Dispose();
            }
            catch
            {
                this.fonte = System.Drawing.FontFamily.GenericSerif.Name;
            }
        }

        /// <summary>
        /// Cria a imagem Bitmap
        /// </summary>
        private void CriarImagem()
        {
            Bitmap bitmap = new Bitmap(this.largura, this.altura, PixelFormat.Format32bppArgb);

            Graphics g = Graphics.FromImage(bitmap);
            g.SmoothingMode = SmoothingMode.AntiAlias;
            Rectangle rect = new Rectangle(0, 0, this.largura, this.altura);

            // Ajustando com o fundo.
            HatchBrush hatchBrush = new HatchBrush(HatchStyle.LargeConfetti, Color.LightGray, Color.White);
            g.FillRectangle(hatchBrush, rect);

            // Ajusta a fonte do texto.
            SizeF size;
            float fontSize = rect.Height + 1;
            Font font;
            // Ajusta o tamanho da fonte para que o texto fique justo com a largura da imagem.
            do
            {
                fontSize--;
                font = new Font(this.fonte, fontSize, FontStyle.Bold, GraphicsUnit.Pixel);
                size = g.MeasureString(this.texto, font);
            } while (size.Width > rect.Width);

            // Ajusta o formato do texto.
            StringFormat format = new StringFormat();
            format.Alignment = StringAlignment.Center;
            format.LineAlignment = StringAlignment.Center;

            // Cria um caminho usando o texto e o distribui randomicamente.
            GraphicsPath caminho = new GraphicsPath();
            caminho.AddString(this.texto, font.FontFamily, (int)font.Style, font.Size, rect, format);
            float v = 4F;
            PointF[] points =
            {
                new PointF(this.random.Next(rect.Width) / v, this.random.Next(rect.Height) / v),
                new PointF(rect.Width - this.random.Next(rect.Width) / v, this.random.Next(rect.Height) / v),
                new PointF(this.random.Next(rect.Width) / v, rect.Height - this.random.Next(rect.Height) / v),
                new PointF(rect.Width - this.random.Next(rect.Width) / v, rect.Height - this.random.Next(rect.Height) / v)
            };
            Matrix matrix = new Matrix();
            matrix.Translate(0F, 0F);
            caminho.Warp(points, rect, matrix, WarpMode.Perspective, 0F);

            // Desenha o texto.
            hatchBrush = new HatchBrush(HatchStyle.LargeConfetti, Color.White, Color.OrangeRed);
            g.FillPath(hatchBrush, caminho);

            // Adiciona ruídos na imagem
            int m = Math.Max(rect.Width, rect.Height);
            for (int i = 0; i < (int)(rect.Width * rect.Height / 60F); i++)
            {
                int x = this.random.Next(rect.Width);
                int y = this.random.Next(rect.Height);
                int w = this.random.Next(m / 50);
                int h = this.random.Next(m / 50);
                g.FillEllipse(hatchBrush, x, y, w, h);
            }

            font.Dispose();
            hatchBrush.Dispose();
            g.Dispose();

            this.imagem = bitmap;
        }
    }
}
