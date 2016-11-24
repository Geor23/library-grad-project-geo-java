using LibraryGradProject.Context;
using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Data;

namespace LibraryGradProject.Repos
{
    public class BookDbRepository : IRepository<Book>
    {
        public BookContext context { get; private set; }

        public BookDbRepository(BookContext context)
        {
            this.context = context;
        }

        public void Add(Book entity)
        {
            if (entity != null)
            {
                context.Books.Attach(entity);
                context.Books.Add(entity);
                context.SaveChanges();
            }
        }

        public void EditBook(Book oldBook, Book newBook)
        {
            context.Entry(oldBook).CurrentValues.SetValues(newBook);
            context.SaveChanges();
        }

        public IEnumerable<Book> GetAll()
        {
            return context.Books.ToList();
        }

        public Book Get(int id)
        {
            return context.Books.Where(book => book.Id == id).SingleOrDefault();
        }

        public void Remove(int id)
        {
            Book book = Get(id);
            if (book != null)
            {
                context.Books.Attach(book);
                context.Books.Remove(book);
                context.SaveChanges();
            }
        }
    }
}