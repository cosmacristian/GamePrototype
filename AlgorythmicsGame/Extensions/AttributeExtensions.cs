using System.ComponentModel.DataAnnotations;

namespace AlgorythmicsGame.Extensions
{
    public static class AttributeExtensions
    {
        public static bool HasNameShortNameOrDescription(this DisplayAttribute displayAttribute)
        {
            return !string.IsNullOrWhiteSpace(displayAttribute.Description)
                || !string.IsNullOrWhiteSpace(displayAttribute.Name)
                || !string.IsNullOrWhiteSpace(displayAttribute.ShortName);
        }
    }
}
