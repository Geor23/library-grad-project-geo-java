using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class BookReservationRepositoryTests
    {
        BookReservationRepository repo;
        Book book, book2;
        DateTime from, to;
        BookReservation newBookReservation, newBookReservation2;

        public BookReservationRepositoryTests()
        {
            // Arrange
            repo = new BookReservationRepository();
            book = new Book() { Title = "Test" };
            book2 = new Book() { Title = "Test2" };
            from = DateTime.UtcNow;
            to = from.AddDays(2);
            newBookReservation = new BookReservation() { book = book, from = from, to = to };
            newBookReservation2 = new BookReservation() { book = book2, from = to, to = to.AddDays(2) };
        }

        [Fact]
        public void New_Book_Repository_Is_Empty()
        {
            // Act
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Empty(bookReservations);
        }

        [Fact]
        public void Add_Inserts_New_Book_Reservation()
        {
            // Act
            repo.Add(newBookReservation);
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookReservation[] { newBookReservation }, bookReservations.ToArray());
        }

        [Fact]
        public void Add_Sets_New_Id()
        {
            // Act
            repo.Add(newBookReservation);
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(0, bookReservations.First().Id);
        }

        [Fact]
        public void Get_Returns_Specific_Book_Reservation()
        {
            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            // Act
            BookReservation bookReservation = repo.Get(1);

            // Asert
            Assert.Equal(newBookReservation2, bookReservation);
        }

        [Fact]
        public void Get_All_Returns_All_Book_Reservations()
        {
            // Arrange
            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            // Act
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookReservation[] { newBookReservation, newBookReservation2 }, bookReservations.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Book_Reservation()
        {
            // Arrange
            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            // Act
            repo.Remove(1);
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookReservation[] { newBookReservation }, bookReservations.ToArray());
        }

        [Fact]
        public void GetAllForBook_Returns_All_Reservations_For_A_Certain_Book()
        {
            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            Assert.True(newBookReservation.Equals(repo.GetAllForBook(book).First()));
        }

        [Fact]
        public void CheckTimeSlot_Returns_False_If_Timeslot_Invalid()
        {
            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            Assert.False(repo.CheckTimeSlot(repo.GetAllForBook(book), newBookReservation));
        }

        [Fact]
        public void CheckTimeSlot_Returns_True_If_Timeslot_Valid()
        {
            BookReservation newBookReservation3 = new BookReservation() { book = book, from = to.AddDays(2), to = to.AddDays(4) };

            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            Assert.True(repo.CheckTimeSlot(repo.GetAllForBook(book), newBookReservation3));
        }
    }
}
