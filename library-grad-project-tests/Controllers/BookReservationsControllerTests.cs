using LibraryGradProject.Controllers;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using Moq;
using Xunit;

namespace LibraryGradProjectTests.Controllers
{
    public class BookReservationsControllerTests
    {
        [Fact]
        public void Get_Calls_Repo_GetAll()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<BookReservation>>();
            mockRepo.Setup(mock => mock.GetAll());
            BookReservationsController controller = new BookReservationsController(mockRepo.Object);

            // Act
            controller.Get();

            // Assert
            mockRepo.Verify(mock => mock.GetAll(), Times.Once);
        }

        [Fact]
        public void Get_With_Id_Calls_Repo_Get()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<BookReservation>>();
            mockRepo.Setup(mock => mock.Get(It.IsAny<int>()));
            BookReservationsController controller = new BookReservationsController(mockRepo.Object);

            // Act
            controller.Get(1);

            // Assert
            mockRepo.Verify(mock => mock.Get(It.Is<int>(x => x == 1)), Times.Once);
        }

        [Fact]
        public void Post_With_Book_Calls_Repo_Add()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<BookReservation>>();
            mockRepo.Setup(mock => mock.Add(It.IsAny<BookReservation>()));
            BookReservationsController controller = new BookReservationsController(mockRepo.Object);

            Book book = new Book() { Title = "Test"};

            BookReservation newBookReservation = new BookReservation() { book = book };

            // Act
            controller.Post(newBookReservation);

            // Assert
            mockRepo.Verify(mock => mock.Add(It.Is<BookReservation>(b => b == newBookReservation)), Times.Once);
        }

        [Fact]
        public void Delete_With_Id_Calls_Repo_Remove()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<BookReservation>>();
            mockRepo.Setup(mock => mock.Remove(It.IsAny<int>()));
            BookReservationsController controller = new BookReservationsController(mockRepo.Object);

            // Act
            controller.Delete(1);

            // Assert
            mockRepo.Verify(mock => mock.Remove(It.Is<int>(x => x == 1)), Times.Once);
        }

        [Fact]
        public void Put_With_Book_Calls_Repo_Add_If_Its_Not_In_List()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<BookReservation>>();
            mockRepo.Setup(mock => mock.Add(It.IsAny<BookReservation>()));
            BookReservationsController controller = new BookReservationsController(mockRepo.Object);

            Book book = new Book() { Title = "Test" };
            BookReservation newBookReservation = new BookReservation() { book = book };

            // Act
            controller.Put(newBookReservation);

            // Assert
            mockRepo.Verify(mock => mock.Add(It.Is<BookReservation>(b => b == newBookReservation)), Times.Once);
        }

        [Fact]
        public void Put_With_Book_Changed_Book_If_Its_In_List()
        {
            // Arrange
            var mockRepo = new BookReservationRepository();
            BookReservationsController controller = new BookReservationsController(mockRepo);
            Book book = new Book() { Title = "Test" };
            Book book2 = new Book() { Id = 0, Title = "NewTitle" };
            BookReservation oldBookReservation = new BookReservation() { book = book };
            BookReservation newBookReservation = new BookReservation() { Id = 0, book = book2 };

            // Act
            controller.Post(oldBookReservation);
            BookReservation bookReservation = controller.Get(0);

            controller.Put(newBookReservation);
            BookReservation bookReservation2 = controller.Get(0);

            // Asert
            Assert.True(newBookReservation.Equals(bookReservation2));
        }
    }
}
