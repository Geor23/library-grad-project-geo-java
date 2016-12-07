package com.scottlogic.libraryapp.dao;

import java.util.Optional;

import org.assertj.core.util.Lists;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.repository.CrudRepository;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

import com.scottlogic.libraryapp.domain.Book;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
public class BookRepositoryIT {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private TestEntityManager entityManager;
    
    @After
    public void tearDown(){
        bookRepository.deleteAll();
    }

    @Test
    public void shouldAddBook(){
        final Book book = new Book("Java", "author", "isbn");

        bookRepository.save(book);

        final Book result = entityManager.find(Book.class, book.getBookId());
        assertThat(result, equalTo(book));
    }
    
    @Test
    public void shouldGetBookByTitleIgnoringCase(){
        entityManager.persist(new Book("Java", "Author", "Isbn"));

        final Optional<Book> result = bookRepository.findByTitleIgnoringCase("java");

        assertThat(result.get().getTitle(), equalTo("Java"));
    }
    
    
    @Test
    public void shouldGetBookByAuthorIgnoringCase(){
        entityManager.persist(new Book("Java", "Author", "Isbn"));

        final Optional<Book> result = bookRepository.findByAuthorIgnoringCase("author");

        assertThat(result.get().getAuthor(), equalTo("Author"));
    }
    
    @Test
    public void shouldGetBookByIsbnIgnoringCase(){
        entityManager.persist(new Book("Java", "Author", "Isbn"));

        final Optional<Book> result = bookRepository.findByIsbnIgnoringCase("isbn");

        assertThat(result.get().getIsbn(), equalTo("Isbn"));
    }
    

    @Test
    public void shouldEditBook(){
        final Book book = new Book("Java", "Author", "Isbn");
        bookRepository.save(book);
        
        final Book newbook = new Book("Java1", "Author1", "Isbn1");
        newbook.setBookId(book.getBookId());
        bookRepository.save(newbook);

        final Book result = entityManager.find(Book.class, book.getBookId());
        assertThat(result, equalTo(newbook));
    }

    @Test
    public void shouldDeleteBook(){
        final Book book = new Book("Java", "Author", "Isbn");
        bookRepository.save(book);

        Book result = entityManager.find(Book.class, book.getBookId());
        assertThat(result, equalTo(book));        
        
        bookRepository.delete(book);
        
        result = entityManager.find(Book.class, book.getBookId());
        assertThat(result, equalTo(null)); 
    }

    @Test
    public void shouldGetAllBooks(){
        final Book book = new Book("Java", "Author", "Isbn");
        bookRepository.save(book);
        
        final Book newbook = new Book("Java1", "Author1", "Isbn1");
        bookRepository.save(newbook);

        Iterable<Book> result = bookRepository.findAll();
        assertThat(Lists.newArrayList(result).size(), equalTo(2));        
    }
    
}
