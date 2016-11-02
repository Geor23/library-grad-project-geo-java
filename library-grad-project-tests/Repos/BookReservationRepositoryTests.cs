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
        [Fact]
        public void New_Book_Repository_Is_Empty()
        {
            // Arrange
            BookReservationRepository repo = new BookReservationRepository();

            // Act
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Empty(bookReservations);
        }

        [Fact]
        public void Add_Inserts_New_Book_Reservation()
        {
            // Arrange
            BookReservationRepository repo = new BookReservationRepository();
            Book book = new Book() { Title = "Test" };

            DateTime from = DateTime.UtcNow;
            DateTime to = from.AddDays(2);

            BookReservation newBookReservation = new BookReservation() { book = book, from = from, to = to };

            // Act
            repo.Add(newBookReservation);
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookReservation[] { newBookReservation }, bookReservations.ToArray());
        }

        [Fact]
        public void Add_Sets_New_Id()
        {
            // Arrange
            BookReservationRepository repo = new BookReservationRepository();
            Book book = new Book() { Title = "Test" };

            DateTime from = DateTime.UtcNow;
            DateTime to = from.AddDays(2);

            BookReservation newBookReservation = new BookReservation() { book = book, from = from, to = to };

            // Act
            repo.Add(newBookReservation);
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(0, bookReservations.First().Id);
        }

        [Fact]
        public void Get_Returns_Specific_Book_Reservation()
        {
            // Arrange
            BookReservationRepository repo = new BookReservationRepository();
            Book book = new Book() { Title = "Test" };

            DateTime from = DateTime.UtcNow;
            DateTime to = from.AddDays(2);

            BookReservation newBookReservation1 = new BookReservation() { Id = 0, book = book, from = from, to = to };
            BookReservation newBookReservation2 = new BookReservation() { Id = 1, book = book, from = to, to = to.AddDays(2) };
            repo.Add(newBookReservation1);
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
            BookReservationRepository repo = new BookReservationRepository();
            Book book1 = new Book() { Title = "Test1" };
            Book book2 = new Book() { Title = "Test2" };

            DateTime from = DateTime.UtcNow;
            DateTime to = from.AddDays(2);

            BookReservation newBookReservation1 = new BookReservation() { book = book1, from = from, to = to };
            BookReservation newBookReservation2 = new BookReservation() { book = book2, from = from, to = to };
            repo.Add(newBookReservation1);
            repo.Add(newBookReservation2);

            // Act
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookReservation[] { newBookReservation1, newBookReservation2 }, bookReservations.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Book_Reservation()
        {
            // Arrange
            BookReservationRepository repo = new BookReservationRepository();
            Book book1 = new Book() { Title = "Test1" };
            Book book2 = new Book() { Title = "Test2" };

            DateTime from = DateTime.UtcNow;
            DateTime to = from.AddDays(2);

            BookReservation newBookReservation1 = new BookReservation() { book = book1, from = from, to = to };
            BookReservation newBookReservation2 = new BookReservation() { book = book2, from = from, to = to };
            repo.Add(newBookReservation1);
            repo.Add(newBookReservation2);

            // Act
            repo.Remove(1);
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookReservation[] { newBookReservation1 }, bookReservations.ToArray());
        }

        [Fact]
        public void GetAllForBook_Returns_All_Reservations_For_A_Certain_Book()
        {
            BookReservationRepository repo = new BookReservationRepository();
            Book book1 = new Book() { Id = 0, Title = "Test1" };
            Book book2 = new Book() { Id = 1, Title = "Test2" };

            DateTime from = DateTime.UtcNow;
            DateTime to = from.AddDays(2);

            BookReservation newBookReservation1 = new BookReservation() { book = book1, from = from, to = to };
            BookReservation newBookReservation2 = new BookReservation() { book = book2, from = to, to = to.AddDays(2) };

            repo.Add(newBookReservation1);
            repo.Add(newBookReservation2);

            Assert.True(newBookReservation1.Equals(repo.GetAllForBook(book1)));
        }
    }
}
