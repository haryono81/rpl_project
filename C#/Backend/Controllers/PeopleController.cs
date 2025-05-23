using Microsoft.AspNetCore.Mvc;
using Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PeopleController : ControllerBase
    {

        private readonly ILogger<PeopleController> _logger;

        public PeopleController(ILogger<PeopleController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<People> Get()
        {
            var peopleList = new List<People>
                {
                    new People { Name = "Andi", Email = "andi@example.com" },
                    new People { Name = "Budi", Email = "budi@example.com" },
                    new People { Name = "Citra", Email = "citra@example.com" },
                    new People { Name = "Dewi", Email = "dewi@example.com" },
                    new People { Name = "Eka", Email = "eka@example.com" }
                };

            return peopleList;
        }



    }
}
