using System.Collections.Generic;
using LibraryGradProject.Models;
using System.Linq;
using LibraryGradProject.Context;

namespace LibraryGradProject.Repos
{
    public class FilledBookDbRepository : IRepository<Book>
    {
        public BookContext context { get; private set; }

        public FilledBookDbRepository(BookContext ctx)
        {
            this.context = ctx;

            Book newBook1 = new Book() { Id = 0, Title = "Book1" };
            Book newBook2 = new Book() { Id = 1, Title = "Book2" };
            Book newBook3 = new Book() { Id = 2, Title = "Book3" };
            this.Add(newBook1);
            this.Add(newBook2);
            this.Add(newBook3);
        }

        public void Add(Book entity)
        {
            context.Books.Attach(entity);
            context.Books.Add(entity);
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