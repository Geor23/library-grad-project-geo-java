using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class FilledBookRepositoryTests
    {
        [Fact]
        public void New_Book_Repository_Is_Empty()
        {
            // Arrange
            FilledBookRepository repo = new FilledBookRepository();

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.NotEmpty(books);
        }

        [Fact]
        public void Add_Inserts_New_Book()
        {
            // Arrange
            FilledBookRepository repo = new FilledBookRepository();
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
