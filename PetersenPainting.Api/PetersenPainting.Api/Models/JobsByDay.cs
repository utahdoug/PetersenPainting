using System;

namespace PetersenPainting.Api.Models
{
    public class JobsByDay
    {
        public string DepartmentName { get; set; }
        public int DepartmentId { get; set; }
        public string Class { get; set; }
        public string Date { get; set; }
        public int JobCount { get; set; }
    }
}
