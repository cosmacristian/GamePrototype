using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Models.CustomValidation
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class RequiredIfPropEqualsValue : RequiredAttribute
    {
        private string PropertyName { get; set; }
        private object PropertyValue { get; set; }

        public RequiredIfPropEqualsValue(string propertyName, object propertyValue)
        {
            PropertyName = propertyName;
            PropertyValue = propertyValue;
            
        }

        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            object instance = context.ObjectInstance;
            Type type = instance.GetType();

            bool propertyValue = type.GetProperty(PropertyName).GetValue(instance).Equals(PropertyValue);

            if (propertyValue && string.IsNullOrWhiteSpace(value?.ToString()))
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }

    [AttributeUsage(AttributeTargets.Property)]
    public class RequiredIfPropsEqualValues : RequiredAttribute
    {

        public RequiredIfPropsEqualValues()
        {
            
        }

        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            object instance = context.ObjectInstance;
            Type type = instance.GetType();
            bool propertyValue = true;
            string[] a = (string[]) type.GetProperty("a").GetValue(instance);
            object[] b = (object[]) type.GetProperty("b").GetValue(instance);
            for (int i=0;i<a.Length; ++i)
            {
                propertyValue &= type.GetProperty(a[i]).GetValue(instance).Equals(b[i]);

            }

            if (propertyValue && string.IsNullOrWhiteSpace(value?.ToString()))
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
