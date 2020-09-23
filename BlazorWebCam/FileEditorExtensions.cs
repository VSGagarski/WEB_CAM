using System;
using System.Text.Json;
using BlazorWebCam;

namespace BlazorWebCam
{
    public class FileEditorExtensions
    {
        public static void SetAppSettingValue(string appSettingsJsonFilePath = null)
        {
            if (appSettingsJsonFilePath == null)
            {
                appSettingsJsonFilePath = System.IO.Path.Combine(Environment.CurrentDirectory, "MyConfig.json");
            }

            var json = System.IO.File.ReadAllText(appSettingsJsonFilePath);
            // JObject jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<Newtonsoft.Json.Linq.JObject>(json);

            var config = JsonSerializer.Deserialize<TestConfigParent>(json);

            // jsonObj["SVMed"]["Url"]= value;
            //jsonObj.Select()

            config.Description = "NewHelloWorld";
            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
            };

            //string output = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj, Newtonsoft.Json.Formatting.Indented);
            string output = JsonSerializer.Serialize(config, options);

            System.IO.File.WriteAllText(appSettingsJsonFilePath, output);
        }
    }
}