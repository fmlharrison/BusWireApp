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
  

        // GET: api/BusWire
        public async Task<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/BusWire/5
        public string Get(int id)
        {
            return "value";
        }
    }
}
