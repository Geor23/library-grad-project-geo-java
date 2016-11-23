using LibraryGradProject.Context;
using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookReservationDbRepository : IRepository<BookDbReservation>
    {

        public BookContext context { get; private set; }

        public BookReservationDbRepository(BookContext ctx)
        {
            context = ctx;
        }

        public void Add(BookDbReservation entity)
        {
            if ( CheckReservationArguments(entity) )
            {  
                if (CheckTimeSlot(GetAllForBook(entity.bookId), entity))
                {
                    
                        context.BookReservations.Attach(entity);
                        context.BookReservations.Add(entity);
                        context.SaveChanges();
                }
                else
                {
                    throw new ArgumentException("The book is already reserver for some or all of the time slot required!");
                }
            }
        }

        public BookDbReservation Get(int id)
        {
            return context.BookReservations.Where(bookRes => bookRes.Id == id).SingleOrDefault();
        }

        public IEnumerable<BookDbReservation> GetAll()
        {
            return context.BookReservations;
        }

        public void Remove(int id)
        {
            BookDbReservation bookResToRemove = Get(id);
            context.BookReservations.Attach(bookResToRemove);
            context.BookReservations.Remove(bookResToRemove);
            context.SaveChanges();
        }

        public bool CheckReservationArguments (BookDbReservation entity)
        {
            if (entity.bookId != null && entity.from != null && entity.to != null)
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
                throw new ArgumentNullException("You cannot make a reservation for an undefined book or with an undefined or valid time slot! entity: "+ entity);
            }
        }

        public bool CheckTimeSlot (IEnumerable<BookDbReservation> bookReservations, BookDbReservation entity)
        {
            if(bookReservations.ToList().FirstOrDefault() != null)
            {
                foreach (BookDbReservation bookRes in bookReservations.ToList())
                {
                    if (!(DateTime.Compare(bookRes.to, entity.from) <= 0 || DateTime.Compare(bookRes.from, entity.to) >= 0))
                    {
                        return false;
                    }
                }
            }

            return true;
            
        }

        public IEnumerable<BookDbReservation> GetAllForBook (int bookId)
        {
            return context.BookReservations.Where(bookRes => bookRes.bookId.Equals(bookId));
        }
    }
}