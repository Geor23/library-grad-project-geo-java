﻿using LibraryGradProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Repos
{
    public class BookReservationRepository : IRepository<BookReservation>
    {
        private List<BookReservation> _bookResCollection = new List<BookReservation>(); 

        public void Add(BookReservation entity)
        {
            entity.Id = _bookResCollection.Count;
            _bookResCollection.Add(entity);
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
    }
}