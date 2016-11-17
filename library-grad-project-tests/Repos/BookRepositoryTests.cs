using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using LibraryGradProject.Context;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using Moq;
using System.Data.Entity;

namespace LibraryGradProjectTests.Repos
{
    public class BookRepositoryTests
    {
        BookDbRepository repo;
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

        public BookRepositoryTests()
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
            repo = new BookDbRepository(mockContext.Object);
            newBook = new Book() { Title = "Test" };
            newBook2 = new Book() { Id = 1, Title = "Test2" };
        }

        [Fact]
        public void New_Book_Repository_Is_Empty()
        {
            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Empty(books);
        }

        [Fact]
        public void Add_Inserts_New_Book()
        {
            // Act
            repo.Add(newBook);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] {newBook}, books.ToArray());
        }

        [Fact]
        public void Add_Sets_New_Id()
        {
            // Act
            repo.Add(newBook);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(0, books.First().Id);
        }

        [Fact]
        public void Get_Returns_Specific_Book()
        {
            repo.Add(newBook);
            repo.Add(newBook2);

            // Act
            Book book = repo.Get(1);

            // Asert
            Assert.Equal(newBook2, book);
        }

        [Fact]
        public void Get_All_Returns_All_Books()
        {
            repo.Add(newBook);
            repo.Add(newBook2);

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { newBook, newBook2 }, books.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Book()
        {
            Book newBook3 = new Book() { Title = "Test3" };
            repo.Add(newBook);
            repo.Add(newBook2);
            repo.Add(newBook3);

            // Act
            repo.Remove(1);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { newBook, newBook3 }, books.ToArray());
        }
    }
}
