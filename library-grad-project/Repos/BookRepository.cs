using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookRepository : IRepository<Book>
    {
        private List<Book> _bookCollection = new List<Book>();

        public void Add(Book entity)
        {
            entity.Id = _bookCollection.Count;
            _bookCollection.Add(entity);
        }

        public IEnumerable<Book> GetAll()
        {
            return _bookCollection;
        }

        public Book Get(int id)
        {
            return _bookCollection.Where(book => book.Id == id).SingleOrDefault();
        }

        public void Remove(int id)
        {
            Book bookToRemove = Get(id);
            _bookCollection.Remove(bookToRemove);            
        }
    }
}