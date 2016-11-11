using System.Collections.Generic;
using LibraryGradProject.Models;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class FilledBookDbRepository : BookDbRepository
    {
        public FilledBookDbRepository()
        {
            Book newBook1 = new Book() { Id = 0, Title = "Book1" };
            Book newBook2 = new Book() { Id = 1, Title = "Book2" };
            Book newBook3 = new Book() { Id = 2, Title = "Book3" };
            this.Add(newBook1);
            this.Add(newBook2);
            this.Add(newBook3);
        }
    }
}