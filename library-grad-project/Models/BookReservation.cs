using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class BookReservation
    {
        public Book book;
        public DateTime from;
        public DateTime to;

        public BookReservation(Book bookToReserve, Double days)
        {
            book = bookToReserve;
            DateTime from = DateTime.UtcNow;
            to = from.AddDays(days);
        }
    } 
}