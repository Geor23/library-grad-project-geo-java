using LibraryGradProject.Models;
using System.Data.Entity;

namespace LibraryGradProject.Context
{
    public class BookContext : DbContext, IBookContext
    {
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<BookDbReservation> BookReservations { get; set; }
    }
}