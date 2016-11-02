using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class BookRepositoryTests
    {
        BookRepository repo;
        Book newBook, newBook2;

        public BookRepositoryTests()
        {
            // Arrange
            repo = new BookRepository();
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
