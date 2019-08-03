namespace Arquitetura.Servico
{
    public class ModelStateWrapper : IValidationDictionary
    {
        public void AddError(string key, string errorMessage)
        {
            throw new System.NotImplementedException();
        }

        public bool IsValid
        {
            get { throw new System.NotImplementedException(); }
        }
    }
}