using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace BlazorWebCam
{
    public class TestService : IHostedService
    {
        private TestConfigParent _options;

        public TestService(IOptionsMonitor<TestConfigParent> optionsMonitor, IOptions<TestConfigParent> options)
        {
            _options = options.Value;
            optionsMonitor.OnChange(opt => _options = opt);
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {

            Task.Run(()=>
            {
                while (true)
                {
                    System.Console.WriteLine(_options.Description);
                }
            });

            return Task.CompletedTask;
        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}