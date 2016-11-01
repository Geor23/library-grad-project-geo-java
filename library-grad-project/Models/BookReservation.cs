using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class BookReservation
    {
        public Book book;
        public DateTime timestamp;

        public BookReservation(Book bookToReserve)
        {
            book = bookToReserve;
            DateTime timestamp = DateTime.UtcNow;
        }
    } 
}