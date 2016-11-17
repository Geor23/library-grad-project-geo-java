using System;

namespace LibraryGradProject.Models
{
    public class BookDbReservation
    {
        public int Id { get; set; }
        public Book book { get; set; }
        public DateTime from { get; set; }
        public DateTime to { get; set; }

        public override bool Equals(object obj)
        {
            BookDbReservation bookRes = obj as BookDbReservation;

            if (bookRes == null)
            {
                return false;
            }

            return bookRes.book.Equals(book) &&
                   bookRes.from == from &&
                   bookRes.to == to ;
        }
    } 
}