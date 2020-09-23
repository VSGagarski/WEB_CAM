using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Autosys.Extensions;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BlazorWebCam
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .ConfigureAutosys()
          // .ConfigureAppConfiguration(ConfigureCustomConfiguration.ConfigureAutosysConfiguration)
            //  .ConfigureAppConfiguration((hostingContext, config) =>
            // {
            //     config.Sources.Clear();

            //     var env = hostingContext.HostingEnvironment;

            //     config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            //           .AddJsonFile($"appsettings.{env.EnvironmentName}.json",
            //                          optional: true, reloadOnChange: true);

            //     config.AddJsonFile("Config.json", optional: true, reloadOnChange: true)
            //           .AddJsonFile($"Config.{env.EnvironmentName}.json",
            //                          optional: true, reloadOnChange: true);

            //     config.AddEnvironmentVariables();

            //     if (args != null)
            //     {
            //         config.AddCommandLine(args);
            //     }
            // })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }

}
