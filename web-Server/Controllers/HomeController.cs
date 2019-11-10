using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Web_Server.Controllers
{
    public class HomeController : Controller
    {
        public static bd_usersModel _bd { get; set; }
        public IActionResult Index()
        {
            try { return Json(_bd.Users.ToList()); }

            catch (Exception err) { Console.WriteLine(err); }

            return Json("ERR");
        }
        public IActionResult Add(string FIO)
        {
            try
            {
                if (FIO != null)
                {
                     var user = new User();
                     user.FIO = FIO;

                    _bd.Users.Add(user);
                    _bd.SaveChanges();
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
                     var user = _bd.Users.Where(X => X.ID == ID).FirstOrDefault();
                    _bd.Users.Remove(user);
                    _bd.SaveChanges();
                }
                return Json("OK");
            }
            catch (Exception err) { Console.WriteLine(err); }
            return Json("ERR");

        }

    }
}