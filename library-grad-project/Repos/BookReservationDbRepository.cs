using LibraryGradProject.Context;
using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookReservationDbRepository : IRepository<BookReservation>
    {
        public override void Add(BookReservation entity)
        {
            if ( CheckReservationArguments(entity) )
            {  
                if (CheckTimeSlot(GetAllForBook(entity.book), entity))
                {
                    using (BookContext context = GetContext())
                    {
                        context.Attach(entity);
                        context.BookReservations.Add(entity);
                        context.SaveChanges();
                    }
                }
                else
                {
                    throw new ArgumentException("The book is already reserver for some or all of the time slot required!");
                }
            }
        }

        public override BookReservation Get(int id)
        {
            using (BookContext context = GetContext())
            {
                return context.BookReservations.Where(bookRes => bookRes.Id == id).SingleOrDefault();
            }
        }

        public override IEnumerable<BookReservation> GetAll()
        {
            using (BookContext context = GetContext())
            {
                return context.BookReservations.ToList();
            }
        }

        public override void Remove(int id)
        {
            BookReservation bookResToRemove = Get(id);
            using (BookContext context = GetContext())
            {
                context.Attach(bookResToRemove);
                context.BookReservations.Remove(bookResToRemove);
                context.SaveChanges();
            }
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
            using (BookContext context = GetContext())
            {
                return context.BookReservations.Where(bookRes => bookRes.book.Equals(book));
            }
        }
    }
}