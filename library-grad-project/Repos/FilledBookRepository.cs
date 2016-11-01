using System.Collections.Generic;
using LibraryGradProject.Models;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class FilledBookRepository : IRepository<Book>
    {
        private List<Book> _bookCollection = new List<Book>();

        public FilledBookRepository()
        {
            Book newBook1 = new Book() { Id = 0, Title = "Book1" };
            Book newBook2 = new Book() { Id = 1, Title = "Book2" };
            Book newBook3 = new Book() { Id = 2, Title = "Book3" };
            _bookCollection.Add(newBook1);
            _bookCollection.Add(newBook2);
            _bookCollection.Add(newBook3);
        }

        public void Add(Book entity)
        {
            entity.Id = _bookCollection.Count;
            _bookCollection.Add(entity);
        }

        public Book Get(int id)
        {
            return _bookCollection.Where(book => book.Id == id).SingleOrDefault();
        }

        public IEnumerable<Book> GetAll()
        {
            return _bookCollection;
        }

        public void Remove(int id)
        {
            Book bookToRemove = Get(id);
            _bookCollection.Remove(bookToRemove);
        }
    }
}