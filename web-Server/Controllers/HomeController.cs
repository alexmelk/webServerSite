using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Web_Server.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            SqlConnection connection = new SqlConnection("Server=tcp:bd-server.database.windows.net,1433;Initial Catalog=bd;Persist Security Info=False;User ID=alexmelk;Password=123123BDbd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            connection.Open();

            SqlCommand command = new SqlCommand("Select FIO from Users", connection);
            List<string> FIO = new List<string>();

            var reader = command.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    FIO.Add(reader.GetValue(0).ToString());
                }
            }

            connection.Close();

            return Json(FIO);
        }
        public IActionResult Add(string FIO)
        {
            if (FIO != null)
            {
                SqlConnection connection = new SqlConnection("Server=tcp:bd-server.database.windows.net,1433;Initial Catalog=bd;Persist Security Info=False;User ID=alexmelk;Password=123123BDbd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                connection.Open();

                SqlCommand command = new SqlCommand("INSERT INTO Users (FIO) VALUES('" + FIO + "')", connection);

                command.ExecuteScalar();

                connection.Close();
            }
            return Json("OK");
        }
    }
}