using LibraryGradProject.Context;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using Moq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class BookReservationRepositoryTests
    {
        BookReservationDbRepository repo;
        Book book, book2;
        DateTime from, to;
        BookDbReservation newBookReservation, newBookReservation2;

        private Mock<DbSet<BookDbReservation>> setUpAsQueriable(IQueryable<BookDbReservation> data)
        {
            var queriable = new Mock<DbSet<BookDbReservation>>();
            queriable.As<IQueryable<BookDbReservation>>().Setup(m => m.Provider).Returns(() => data.Provider);
            queriable.As<IQueryable<BookDbReservation>>().Setup(m => m.Expression).Returns(() => data.Expression);
            queriable.As<IQueryable<BookDbReservation>>().Setup(m => m.ElementType).Returns(() => data.ElementType);
            queriable.As<IQueryable<BookDbReservation>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            return queriable;
        }

        public BookReservationRepositoryTests()
        {
            //Setup
            var bookReservations = new List<BookDbReservation>()
            {
            };
            var data = bookReservations.AsQueryable();
            var mockSet = setUpAsQueriable(data);
            mockSet.Setup(d => d.Add(It.IsAny<BookDbReservation>())).Callback<BookDbReservation>((r) => bookReservations.Add(r));
            mockSet.Setup(d => d.Remove(It.IsAny<BookDbReservation>())).Callback<BookDbReservation>((r) => bookReservations.Remove(r));

            var mockContext = new Mock<BookContext>();
            mockContext.Setup(c => c.BookReservations).Returns(mockSet.Object);

            // Arrange
            repo = new BookReservationDbRepository(mockContext.Object);
            book = new Book() { Title = "Test" };
            book2 = new Book() { Title = "Test2" };
            from = DateTime.UtcNow;
            to = from.AddDays(2);
            newBookReservation = new BookDbReservation() { book = book, from = from, to = to };
            newBookReservation2 = new BookDbReservation() { book = book2, from = to, to = to.AddDays(2) };
        }

        [Fact]
        public void New_Book_Repository_Is_Empty()
        {
            // Act
            IEnumerable<BookDbReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Empty(bookReservations);
        }

        [Fact]
        public void Add_Inserts_New_Book_Reservation()
        {
            // Act
            repo.Add(newBookReservation);
            IEnumerable<BookDbReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookDbReservation[] { newBookReservation }, bookReservations.ToArray());
        }

        [Fact]
        public void Add_Sets_New_Id()
        {
            // Act
            repo.Add(newBookReservation);
            IEnumerable<BookDbReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(0, bookReservations.First().Id);
        }

        [Fact]
        public void Get_Returns_Specific_Book_Reservation()
        {
            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            // Act
            BookDbReservation bookReservation = repo.Get(1);

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
            IEnumerable<BookDbReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookDbReservation[] { newBookReservation, newBookReservation2 }, bookReservations.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Book_Reservation()
        {
            // Arrange
            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            // Act
            repo.Remove(1);
            IEnumerable<BookDbReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookDbReservation[] { newBookReservation }, bookReservations.ToArray());
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
            BookDbReservation newBookReservation3 = new BookDbReservation() { book = book, from = to.AddDays(2), to = to.AddDays(4) };

            repo.Add(newBookReservation);
            repo.Add(newBookReservation2);

            Assert.True(repo.CheckTimeSlot(repo.GetAllForBook(book), newBookReservation3));
        }
    }
}
