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
            this.context = context;
        }

        public void Add(BookDbReservation entity)
        {
            if ( CheckReservationArguments(entity) )
            {  
                if (CheckTimeSlot(GetAllForBook(entity.book), entity))
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
            return context.BookReservations.ToList();
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

        public bool CheckTimeSlot (IEnumerable<BookDbReservation> bookReservations, BookDbReservation entity)
        {
            foreach (BookDbReservation bookRes in bookReservations)
            {
                if (!(DateTime.Compare(bookRes.to, entity.from) <= 0 || DateTime.Compare(bookRes.from, entity.to) >= 0))
                {
                    return false;
                }
            }
            return true;
        }

        public IEnumerable<BookDbReservation> GetAllForBook (Book book)
        {
            return context.BookReservations.Where(bookRes => bookRes.book.Equals(book));
        }
    }
}