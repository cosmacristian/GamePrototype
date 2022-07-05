using Microsoft.AspNetCore.Html;

namespace AlgorythmicsGame.Extensions
{
    public static class StringExtensions
    {
        public static string Abbreviate(this string value, int length, string abbreviationSuffix = "...", bool breakAtWord = true)
        {
            if (value.Length > length && value.Length > abbreviationSuffix.Length)
            {
                string shortText = value.Substring(0, length - abbreviationSuffix.Length);

                if (breakAtWord && shortText.Contains(" "))
                {
                    shortText = shortText.Substring(0, shortText.LastIndexOf(" "));
                }

                return shortText + abbreviationSuffix;
            }
            else
            {
                return value;
            }
        }

        public static bool IsNullOrEmpty(this HtmlString value)
        {
            return value == null || string.IsNullOrEmpty(value.Value);
        }
    }
}
