package com.scottlogic.libraryapp.web;

import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.scottlogic.libraryapp.dao.BookRepository;
import com.scottlogic.libraryapp.domain.Book;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class LibraryControllerIT {
	
	Book book, newbook;
	
	@Autowired
	private TestRestTemplate restTemplate;
	
	@Autowired
	private BookRepository bookRepository;

	private int id;
	
	@Before
	public void setup() {
		book = new Book("Java", "Author", "Isbn");
		newbook = new Book("Java1", "Author1", "Isbn1");
	}
	
	@After
	public void tearDown() {
		bookRepository.deleteAll();
	}
	
    @Test
    public void shouldAddBook(){
    	book.setBookId(1);
        final ResponseEntity<Void> response = restTemplate.postForEntity("/books", book, Void.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
        final Optional<Book> addedBook = bookRepository.findByTitleIgnoringCase("java");
        assertThat(addedBook.get(), equalTo(book));
    }	
    
	@Test
	public void shouldGetBook() {
    	book.setBookId(2);
        bookRepository.save(book);
        final ResponseEntity<Book> result = restTemplate.getForEntity("/books/{Id}", Book.class, 2);

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(result.getBody(), equalTo(book));
	}
    
	@Test
	public void shouldGetAllBooks() {
    	book.setBookId(3);
        bookRepository.save(book);
        final ResponseEntity<Book[]> result = restTemplate.getForEntity("/books", Book[].class);

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertTrue(Arrays.asList(result.getBody()).contains(book));
	}
	
    @Test
    public void shouldEditBook(){
    	book.setBookId(4);
    	newbook.setBookId(4);
    	bookRepository.save(book);
    	
    	final ResponseEntity<Book[]> result = restTemplate.getForEntity("/books", Book[].class);

        assertThat(result.getStatusCode(), equalTo(HttpStatus.OK));
        assertTrue(Arrays.asList(result.getBody()).contains(book));
    	
        restTemplate.put("/books", newbook);
        
	   	final ResponseEntity<Book[]> result2 = restTemplate.getForEntity("/books", Book[].class);
	
	    assertThat(result2.getStatusCode(), equalTo(HttpStatus.OK));
	    assertTrue(Arrays.asList(result2.getBody()).contains(newbook));
	    assertFalse(Arrays.asList(result2.getBody()).contains(book));
    }
    
}
