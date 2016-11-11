using LibraryGradProject.Context;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Collections.Generic;
using System.Web.Http;

namespace LibraryGradProject.Controllers
{
    public class BooksController : ApiController
    {
        private BookDbRepository _bookRepo;
        
        public BooksController(BookContext context)
        {
            _bookRepo = new BookDbRepository(context);
        }
        
        // GET api/books
        public IEnumerable<Book> Get()
        {
            return _bookRepo.GetAll();
        }

        // GET api/values/{int}
        public Book Get(int id)
        {
            return _bookRepo.Get(id);
        }

        // POST api/values
        public void Post(Book newBook)
        {
            _bookRepo.Add(newBook);
        }
        
        // DELETE api/values/{int}
        public void Delete(int id)
        {
            _bookRepo.Remove(id);
        }

        // PUT api/values/{int}
        public void Put(Book newBook)
        {
            Book oldBook = _bookRepo.Get(newBook.Id);
            if (oldBook!=null) {
                oldBook.ISBN = newBook.ISBN;
                oldBook.Title = newBook.Title;
                oldBook.Author = newBook.Author;
                oldBook.PublishDate = newBook.PublishDate;
            } else {
                _bookRepo.Add(newBook);
            }
        }
    }
}
