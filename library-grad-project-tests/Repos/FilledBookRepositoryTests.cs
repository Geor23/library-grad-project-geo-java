using LibraryGradProject.Context;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using Moq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class FilledBookRepositoryTests
    {

        FilledBookDbRepository repo;
        Book newBook, newBook2;

        private Mock<DbSet<Book>> setUpAsQueriable(IQueryable<Book> data)
        {
            var queriable = new Mock<DbSet<Book>>();
            queriable.As<IQueryable<Book>>().Setup(m => m.Provider).Returns(() => data.Provider);
            queriable.As<IQueryable<Book>>().Setup(m => m.Expression).Returns(() => data.Expression);
            queriable.As<IQueryable<Book>>().Setup(m => m.ElementType).Returns(() => data.ElementType);
            queriable.As<IQueryable<Book>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            return queriable;
        }

        public FilledBookRepositoryTests()
        {
            //Setup
            var books = new List<Book>()
            {
            };
            var data = books.AsQueryable();
            var mockSet = setUpAsQueriable(data);
            mockSet.Setup(d => d.Add(It.IsAny<Book>())).Callback<Book>((r) => books.Add(r));
            mockSet.Setup(d => d.Remove(It.IsAny<Book>())).Callback<Book>((r) => books.Remove(r));

            var mockContext = new Mock<BookContext>();
            mockContext.Setup(c => c.Books).Returns(mockSet.Object);

            // Arrange
            repo = new FilledBookDbRepository(mockContext.Object);
            newBook = new Book() { Title = "Test" };
            newBook2 = new Book() { Id = 1, Title = "Test2" };
        }

        [Fact]
        public void New_Book_Repository_Is_Not_Empty()
        { 
            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.NotEmpty(books);
        }

        [Fact]
        public void Add_Inserts_New_Book()
        {
            // Arrange
            Book newBook1 = new Book() { Id = 0, Title = "Book1" };
            Book newBook2 = new Book() { Id = 1, Title = "Book2" };
            Book newBook3 = new Book() { Id = 2, Title = "Book3" };
            Book newBook = new Book() { Title = "Test" };

            // Act
            repo.Add(newBook);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { newBook1, newBook2, newBook3, newBook }, books.ToArray());
        }
    }
}
