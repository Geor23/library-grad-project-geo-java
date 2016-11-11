using LibraryGradProject.Models;
using System.Data.Entity;

namespace LibraryGradProject.Context
{
    public class BookContext : DbContext
    {
        public BookContext() : base()
        {
        }
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<BookReservation> BookReservations { get; set; }
    }
}