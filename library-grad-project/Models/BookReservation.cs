using System;

namespace LibraryGradProject.Models
{
    public class BookReservation
    {
        public int Id { get; set; }
        public Book book { get; set; }
        public DateTime from { get; set; }
        public DateTime to { get; set; }
    } 
}