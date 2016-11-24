using LibraryGradProject.Context;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Collections.Generic;
using System.Web.Http;

namespace LibraryGradProject.Controllers
{
    public class BookReservationsController : ApiController
    {
        private BookReservationDbRepository _bookResRepo;

        public BookReservationsController(BookContext context)
        {
            _bookResRepo = new BookReservationDbRepository(context);
        }

        // GET api/books
        public IEnumerable<BookDbReservation> Get()
        {
            return _bookResRepo.GetAll();
        }

        // GET api/values/{int}
        public BookDbReservation Get(int id)
        {
            return _bookResRepo.Get(id);
        }

        // POST api/values
        public void Post(BookDbReservation newBookRes)
        {
            _bookResRepo.Add(newBookRes);
        }

        // DELETE api/values/{int}
        public void Delete(int id)
        {
            _bookResRepo.Remove(id);
        }

        // PUT api/values/{int}
        public void Put(BookDbReservation newBookRes)
        {
            BookDbReservation oldBookRes = _bookResRepo.Get(newBookRes.Id);
            if (oldBookRes != null)
            {
                _bookResRepo.EditReservation(oldBookRes, newBookRes);
            }
            else
            {
                _bookResRepo.Add(newBookRes);
            }
        }
    }
}