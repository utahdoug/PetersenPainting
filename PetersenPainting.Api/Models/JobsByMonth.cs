using System.Collections.Generic;

namespace PetersenPainting.Api.Models
{
    public class JobsByMonth
    {
        public List<JobsByDay> Jobs { get; set; }
    }
}
