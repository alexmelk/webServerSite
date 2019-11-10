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
            try
            {
                SqlConnection connection = new SqlConnection("Server=tcp:bd-server.database.windows.net,1433;Initial Catalog=bd_users;Persist Security Info=False;User ID=alexmelk;Password=123123BDbd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                connection.Open();

                SqlCommand command = new SqlCommand("SELECT [ID],[FIO] FROM[dbo].[Users]", connection);
                List<List<string>> FIO = new List<List<string>>();

                var reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        FIO.Add(new List<string>());
                        FIO[FIO.Count - 1].Add(reader.GetValue(0).ToString());
                        FIO[FIO.Count - 1].Add(reader.GetValue(1).ToString());
                    }
                }

                connection.Close();
                return Json(FIO);
            }
            catch (Exception err) { Console.WriteLine(err); }
            return Json("ERR");
        }
        public IActionResult Add(string FIO)
        {
            try
            {
                if (FIO != null)
                {
                    SqlConnection connection = new SqlConnection("Server=tcp:bd-server.database.windows.net,1433;Initial Catalog=bd_users;Persist Security Info=False;User ID=alexmelk;Password=123123BDbd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                    connection.Open();

                    SqlCommand command = new SqlCommand("INSERT INTO Users (FIO) VALUES('" + FIO + "')", connection);

                    command.ExecuteScalar();

                    connection.Close();
                }
                return Json("OK");
            }
            catch (Exception err) { Console.WriteLine(err); }
            return Json("ERR");

        }
        public IActionResult Remove(int ID)
        {
            try
            {
                if (ID != 0)
                {
                    SqlConnection connection = new SqlConnection("Server=tcp:bd-server.database.windows.net,1433;Initial Catalog=bd_users;Persist Security Info=False;User ID=alexmelk;Password=123123BDbd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                    connection.Open();

                    SqlCommand command = new SqlCommand("DELETE FROM [dbo].[Users]WHERE ID = " + ID, connection);

                    command.ExecuteScalar();

                    connection.Close();
                }
                return Json("OK");
            }
            catch (Exception err) { Console.WriteLine(err); }
            return Json("ERR");

        }

    }
}