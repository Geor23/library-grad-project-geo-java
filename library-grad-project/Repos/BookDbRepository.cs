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
        public BookDbRepository() : base()
        {
        }

        public BookDbRepository(BookContext ctx) : base(ctx)
        {
        }

        public override void Add(Book entity)
        {
            using (BookContext context = GetContext())
            {
                context.Books.Attach(entity);
                context.Books.Add(entity);
                context.SaveChanges();
            }
        }

        public override IEnumerable<Book> GetAll()
        {
            using (BookContext context = GetContext())
            {
                return context.Books.ToList();
            }
        }

        public override Book Get(int id)
        {
            using (BookContext context = GetContext())
            {
                return context.Books.Where(book => book.Id == id).SingleOrDefault();
            }
        }

        public override void Remove(int id)
        {
            using (BookContext context = GetContext())
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
}