using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace BusWireApp.WebAPI.Controllers
{
    public class BusWireController : ApiController
    {
        private static readonly string TflApiId = ConfigurationManager.AppSettings["tfl_api_id"];
        private static readonly string TflApiKey = ConfigurationManager.AppSettings["tfl_api_key"];

        private static readonly string TflApiBusStopEndpoint = "https://api.tfl.gov.uk/StopPoint/490008660N/arrivals&app_id=" + TflApiId + "&app_key" +
                                                       TflApiKey;

        // GET: api/BusWire
        public async Task<IEnumerable<string>> Get()
        {
            var result = await GetBusArrivalTimes();
            return new string[] { result };
        }

        // GET: api/BusWire/5
        public string Get(int id)
        {
            return "value";
        }

        private async Task<string> GetBusArrivalTimes()
        {
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(TflApiBusStopEndpoint);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }

    }
}
