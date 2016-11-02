using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Collections.Generic;
using System.Web.Http;

namespace LibraryGradProject.Controllers
{
    public class BookReservationsController : ApiController
    {
        private IRepository<BookReservation> _bookResRepo;

        public BookReservationsController(IRepository<BookReservation> bookReservationsRepository)
        {
            _bookResRepo = bookReservationsRepository;
        }

        // GET api/books
        public IEnumerable<BookReservation> Get()
        {
            return _bookResRepo.GetAll();
        }

        // GET api/values/{int}
        public BookReservation Get(int id)
        {
            return _bookResRepo.Get(id);
        }

        // POST api/values
        public void Post(BookReservation newBookRes)
        {
            _bookResRepo.Add(newBookRes);
        }

        // DELETE api/values/{int}
        public void Delete(int id)
        {
            _bookResRepo.Remove(id);
        }

        // PUT api/values/{int}
        public void Put(BookReservation newBookRes)
        {
            BookReservation oldBookRes = _bookResRepo.Get(newBookRes.Id);
            if (oldBookRes != null)
            {
                oldBookRes.book = newBookRes.book;
                oldBookRes.from = newBookRes.from;
                oldBookRes.to = newBookRes.to;
            }
            else
            {
                _bookResRepo.Add(newBookRes);
            }
        }
    }
}