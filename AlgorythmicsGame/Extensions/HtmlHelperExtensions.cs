using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;

namespace AlgorythmicsGame.Extensions
{

    public static class HtmlHelperExtensions
    {
        public static HtmlString GenerateJsEnum<TEnum>(this IHtmlHelper htmlHelper, string nameSpaceDefinition = null) where TEnum: struct
        {
            StringBuilder sb = new StringBuilder();
            var currentFullyQualifiedNamespace = "window.";
            if (!string.IsNullOrEmpty(nameSpaceDefinition))
            {
                var namespaces = nameSpaceDefinition.Split('.');
                foreach (var item in namespaces)
                {
                    currentFullyQualifiedNamespace += item;

                    sb.AppendLine($"if(!{currentFullyQualifiedNamespace}){{")
                      .AppendLine($"    {currentFullyQualifiedNamespace} = {{}};")
                      .AppendLine("}");

                    currentFullyQualifiedNamespace += ".";
                }
            }
            var enums = Enum.GetValues(typeof(TEnum)).Cast<byte>().ToDictionary(x => Enum.GetName(typeof(TEnum), x), y => y);

            sb.AppendLine(currentFullyQualifiedNamespace + typeof(TEnum).Name + " = " + JsonConvert.SerializeObject(enums, Formatting.Indented) + ";");

            return new HtmlString(sb.ToString());
        }

        public static IDisposable BeginCollectionItem<TModel>(this IHtmlHelper html, string collectionName)
        {
            //string itemIndex = GetCollectionItemIndex(collectionIndexFieldName);
            string itemIndex = Guid.NewGuid().ToString();  //<input type="hidden" name="yourmodelprefix[0].PlanID" />
            string collectionItemName = String.Format("{0}[{1}]", collectionName, itemIndex);

            TagBuilder indexField = new TagBuilder("input");
            indexField.MergeAttributes(new Dictionary<string, string>() {
            { "name", String.Format("{0}.Index", collectionName) },
            { "value", itemIndex },
            { "type", "hidden" },
            { "autocomplete", "off" }
        });

            html.ViewContext.Writer.WriteLine(indexField.RenderSelfClosingTag());//(TagRenderMode.SelfClosing));
            return new CollectionItemNamePrefixScope(html.ViewData.TemplateInfo, collectionItemName);
        }

        //private static string GetCollectionItemIndex(string collectionIndexFieldName)
        //{
        //    Queue<string> previousIndices = (Queue<string>)HttpContext.Current.Items[collectionIndexFieldName];
        //    if (previousIndices == null)
        //    {
        //        HttpContext.Items[collectionIndexFieldName] = previousIndices = new Queue<string>();
        //        string previousIndicesValues = HttpContext.Current.Request[collectionIndexFieldName];
        //        if (!String.IsNullOrWhiteSpace(previousIndicesValues))
        //        {
        //            foreach (string index in previousIndicesValues.Split(','))
        //                previousIndices.Enqueue(index);
        //        }
        //    }

        //    return previousIndices.Count > 0 ? previousIndices.Dequeue() : Guid.NewGuid().ToString();
        //}

        private class CollectionItemNamePrefixScope : IDisposable
        {
            private readonly TemplateInfo _templateInfo;
            private readonly string _previousPrefix;

            public CollectionItemNamePrefixScope(TemplateInfo templateInfo, string collectionItemName)
            {
                this._templateInfo = templateInfo;

                _previousPrefix = templateInfo.HtmlFieldPrefix;
                templateInfo.HtmlFieldPrefix = collectionItemName;
            }

            public void Dispose()
            {
                _templateInfo.HtmlFieldPrefix = _previousPrefix;
            }
        }
    }

}
