using System;
using System.Linq;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace AlgorythmicsGame.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum instance)
        {
            string ret = String.Empty;
            if(instance == null)
            {
                return ret;
            }
            FieldInfo fi = instance.GetType().GetField(instance.ToString());
            DescriptionAttribute descriptionAttribute = fi.GetCustomAttributes<DescriptionAttribute>(false).FirstOrDefault(a => !string.IsNullOrEmpty(a.Description));

            if (descriptionAttribute != null)
            {
                return descriptionAttribute.Description;
            }

            var displayAttributes = fi.GetCustomAttributes<DisplayAttribute>(false).Where(a => a.HasNameShortNameOrDescription());
            if (displayAttributes.Any())
            {
                var description = displayAttributes.Where(a => !string.IsNullOrWhiteSpace(a.Name)).Select(a => a.Name).FirstOrDefault();
                if (description == null)
                {
                    description = displayAttributes.Where(a => !string.IsNullOrWhiteSpace(a.ShortName)).Select(a => a.ShortName).FirstOrDefault();
                }
                if (description == null)
                {
                    description = displayAttributes.Where(a => !string.IsNullOrWhiteSpace(a.Description)).Select(a => a.Description).FirstOrDefault();
                }

                return description;
            }

            // fallback
            return instance.ToString();
        }


    }
}
