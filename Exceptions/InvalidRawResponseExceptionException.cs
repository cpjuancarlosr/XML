namespace Fiscalapi.XmlDownloader.Exceptions
{
    public class InvalidRawResponseException : Exception
    {
        public InvalidRawResponseException(Exception exception, string message) : base(message, exception)
        {

        }
        public InvalidRawResponseException(string message) : base(message)
        {

        }

    }
}