package com.scottlogic.libraryapp.service;

import java.util.Arrays;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.scottlogic.libraryapp.dao.BookRepository;
import com.scottlogic.libraryapp.domain.Book;

@RunWith(MockitoJUnitRunner.class)
public class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    private BookService bookService;

    @Before
    public void setUp(){
        bookService = new BookServiceImpl(bookRepository);
    }
    
    @Test
    public void shouldAddBook() {
    	final Book book = new Book("Title", "Author", "Isbn", null);
    	
    	bookService.add(Optional.of(book));
    	verify(bookRepository).save(book);
    } 
    
    @Test
    public void shouldEditBook() {
    	final Book book = new Book("Title", "Author", "Isbn", null);
    	
    	bookService.editBook(Optional.of(book));
    	verify(bookRepository).save(book);
    }
    
    @Test
    public void shouldDeleteBook() {
    	final Book book = new Book("Title", "Author", "Isbn", null);
    	
    	bookService.deleteBook(Optional.of(book));
    	verify(bookRepository).delete(book);
    }
    
    @Test
    public void shouldGetBookByTitle() {
    	when(bookRepository.findByTitleIgnoringCase("Title")).thenReturn(Optional.of(new Book("Title", "Author", "Isbn", null)));
    	
    	final Optional<Book> result = bookService.getByTitle("Title");
    	assertThat(result.get().getTitle(), equalTo("Title"));
    }
    
    @Test
    public void shouldGetBookByAuthor() {
    	when(bookRepository.findByAuthorIgnoringCase("Author")).thenReturn(Optional.of(new Book("Title", "Author", "Isbn", null)));
    	
    	final Optional<Book> result = bookService.getByAuthor("Author");
    	assertThat(result.get().getAuthor(), equalTo("Author"));
    }
    
    @Test
    public void shouldGetBookByIsbn() {
    	when(bookRepository.findByIsbnIgnoringCase("Isbn")).thenReturn(Optional.of(new Book("Title", "Author", "Isbn", null)));
    	
    	final Optional<Book> result = bookService.getByIsbn("Isbn");
    	assertThat(result.get().getIsbn(), equalTo("Isbn"));
    }
    
    @Test
    public void shouldGetBookById() {
    	when(bookRepository.findOne(1)).thenReturn(new Book("Title", "Author", "Isbn", null));
    	
    	final Optional<Book> result = bookService.getById(1);
    	assertThat(result.get().getIsbn(), equalTo("Isbn"));
    }
    
    @Test
    public void shouldGetAll() {
    	when(bookRepository.findAll()).thenReturn(Arrays.asList(new Book("Title", "Author", "Isbn", null)));
    	assertThat(bookService.getAll(), equalTo(Arrays.asList(new Book("Title", "Author", "Isbn", null))));
    }

}
