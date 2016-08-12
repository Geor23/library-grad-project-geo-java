using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookRepository : IRepository<Book>
    {
        private List<Book> _bookColection = new List<Book>();

        public void Add(Book entity)
        {
            entity.Id = _bookColection.Count;
            _bookColection.Add(entity);
        }

        public IEnumerable<Book> GetAll()
        {
            return _bookColection;
        }

        public Book Get(int id)
        {
            return _bookColection.Where(book => book.Id == id).SingleOrDefault();
        }

        public void Remove(int id)
        {
            Book bookToRemove = Get(id);
            _bookColection.Remove(bookToRemove);            
        }
    }
}