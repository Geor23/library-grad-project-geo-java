using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookReservationRepository : IRepository<BookReservation>
    {
        private List<BookReservation> _bookResCollection = new List<BookReservation>(); 

        public void Add(BookReservation entity)
        {
            if ( CheckReservationArguments(entity) )
            {  
                if (CheckTimeSlot(GetAllForBook(entity.book), entity))
                {
                    entity.Id = _bookResCollection.Count;
                    _bookResCollection.Add(entity);
                }
                else
                {
                    throw new ArgumentException("The book is already reserver for some or all of the time slot required!");
                }
            }
        }

        public BookReservation Get(int id)
        {
            return _bookResCollection.Where(bookRes => bookRes.Id == id).SingleOrDefault();
        }

        public IEnumerable<BookReservation> GetAll()
        {
            return _bookResCollection;
        }

        public void Remove(int id)
        {
            BookReservation bookResToRemove = Get(id);
            _bookResCollection.Remove(bookResToRemove);
        }

        public bool CheckReservationArguments (BookReservation entity)
        {
            if (entity.book != null && entity.from != null && entity.to != null)
            {
                if (DateTime.Compare(entity.from, entity.to) < 0)
                {
                    return true;
                }
                else
                {
                    throw new ArgumentException("You cannot make a reservation with an invalid time slot!");
                }
            }
            else
            {
                throw new ArgumentNullException("You cannot make a reservation for an undefined book or with an undefined or valid time slot!");
            }
        }

        public bool CheckTimeSlot (IEnumerable<BookReservation> bookReservations, BookReservation entity)
        {
            foreach (BookReservation bookRes in bookReservations)
            {
                if (!(DateTime.Compare(bookRes.to, entity.from) <= 0 || DateTime.Compare(bookRes.from, entity.to) >= 0))
                {
                    return false;
                }
            }
            return true;
        }

        public IEnumerable<BookReservation> GetAllForBook (Book book)
        {
            return _bookResCollection.Where(bookRes => bookRes.book.Equals(book) );
        }
    }
}