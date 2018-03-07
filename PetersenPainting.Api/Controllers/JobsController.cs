using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PetersenPainting.Api.Models;

namespace PetersenPainting.Api.Controllers
{
    public class JobsController : Controller
    {
        [Route("api/jobs/jobsbymonth")]
        [HttpPost]
        public JobsByMonth JobsByMonth([FromBody] string dateToSearch)
        {
            if (HttpContext.RequestServices.GetService(typeof(PetersenPainting.Api.Models.PetersenPaintingContext)) is PetersenPaintingContext context)
            {
                return context.GetJobsForMonth(dateToSearch);
            }
            {
                return new JobsByMonth() {Jobs = new List<JobsByDay>()};
            }
        }
    }
}
