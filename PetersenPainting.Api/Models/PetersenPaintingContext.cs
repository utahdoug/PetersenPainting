using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace PetersenPainting.Api.Models
{
    public class PetersenPaintingContext
    {
        public string ConnectionString { get; set; }

        public PetersenPaintingContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public JobsByMonth GetJobsForMonth(string jobDate)
        {
            var list = new List<JobsByDay>();

            using (var conn = GetConnection())
            {
                conn.Open();
                var cmd = new MySqlCommand
                {
                    Connection = conn,
                    CommandText = "utah.GetJobCountsByMonth",
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("@jobDate", jobDate);
                
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new JobsByDay()
                        {
                            Class = reader["Class"].ToString(),
                            Date = reader["Date"].ToString(),
                            DepartmentId = Convert.ToInt32(reader["DepartmentId"]),
                            DepartmentName = reader["DepartmentName"].ToString(),
                            JobCount = Convert.ToInt32(reader["JobCount"])
                        });
                    }
                }
            }
            return new JobsByMonth() {Jobs = list};
        }
    }
}
