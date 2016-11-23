using System;

namespace LibraryGradProject.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublishDate { get; set; }

        public override bool Equals(object obj)
        {
            Book book = obj as Book;
            
            if(book == null)
            {
                return false;
            }

            return book.Author == Author &&
                   book.ISBN == ISBN &&
                   book.PublishDate == PublishDate &&
                   book.Title == Title;
        }
    }
}