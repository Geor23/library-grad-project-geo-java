using LibraryGradProject.Models;
using System;
using System.Data.Entity;

namespace LibraryGradProject.Context
{
    public interface IBookContext : IDisposable
    {
        DbSet<Book> Books { get; set; }
        DbSet<BookDbReservation> BookReservations { get; set; }
        
        int SaveChanges();
    }
}