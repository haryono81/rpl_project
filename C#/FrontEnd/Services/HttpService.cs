using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace FrontEnd.Services
{
    public class HttpService
    {
        private readonly HttpClient _httpClient;

        public HttpService()
        {
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://localhost:7180/") // Replace with your actual API URL
            };
        }

        public async Task<List<People>> GetPeopleAsync()
        {
            try
            {
                return await _httpClient.GetFromJsonAsync<List<People>>("people");
            }
            catch (Exception ex)
            {
                // Handle or log error
                return new List<People>();
            }
        }
    }
}
