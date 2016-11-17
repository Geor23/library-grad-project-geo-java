using LibraryGradProject.Context;
using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject
{
    public class Program
    {
        static void Main(string[] args)
        {
            using (var db = new BookContext())
            {
                db.Books.Add(new Book { Title = "Another Blog " });
                db.SaveChanges();

                foreach (var book in db.Books)
                {
                    Console.WriteLine(book.Title);
                }
            }
        }
    }
}