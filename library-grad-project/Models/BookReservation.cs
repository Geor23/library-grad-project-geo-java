using System;

namespace LibraryGradProject.Models
{
    public class BookDbReservation
    {
        public int Id { get; set; }
        public int bookId { get; set; }
        public DateTime from { get; set; }
        public DateTime to { get; set; }

        public override bool Equals(object obj)
        {
            BookDbReservation bookRes = obj as BookDbReservation;

            if (bookRes == null)
            {
                return false;
            }

            return bookRes.bookId.Equals(bookId) &&
                   bookRes.from == from &&
                   bookRes.to == to ;
        }
    } 
}