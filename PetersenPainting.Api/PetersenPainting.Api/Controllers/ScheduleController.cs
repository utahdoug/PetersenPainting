using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PetersenPainting.Api.Models;

namespace PetersenPainting.Api.Controllers
{
    public class ScheduleController : Controller
    {
        [Route("api/schedule/jobsbymonth")]
        [HttpPost]
        public IEnumerable<JobsByDay> JobsByMonth([FromBody] string dateToSearch)
        {
            if (HttpContext.RequestServices.GetService(typeof(PetersenPainting.Api.Models.PetersenPaintingContext)) is PetersenPaintingContext context)
            {
                return context.GetJobsForMonth(dateToSearch);
            }
            {
                return new List<JobsByDay>();
            }
        }
    }
}
