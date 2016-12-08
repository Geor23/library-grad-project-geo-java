package com.scottlogic.libraryapp.web;

import java.util.Arrays;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scottlogic.libraryapp.domain.Book;
import com.scottlogic.libraryapp.service.BookService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {LibraryController.class})
public class LibraryControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private BookService bookService;
	
	@Test
	public void shouldGetAllBooks() throws Exception {
		when(bookService.getAll())
			.thenReturn(Arrays.asList(new Book("Java", "Author", "Isbn")));
		
		mockMvc.perform(get("/books"))
		        .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
		        .andExpect(status().isOk());
	}
	
	@Test
	public void shouldGetBook() throws Exception {
		when(bookService.getById(1))
			.thenReturn(Optional.of(new Book("Java", "Author", "Isbn")));
		
		mockMvc.perform(get("/books/{Id}", 1))
		        .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
		        .andExpect(status().isOk());
	}
	
	@Test
    public void shouldAddBook() throws Exception {
        final Book book = new Book("Java", "Author", "Isbn");

        mockMvc.perform(post("/books")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(asJsonString(book)))
                .andExpect(status().isOk());

        verify(bookService).add(any(Optional.class));
    }
	
	@Test
    public void shouldEditBook() throws Exception {
        final Book book = new Book("Java", "Author", "Isbn");

        mockMvc.perform(put("/books", book)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(asJsonString(book)))
                .andExpect(status().isOk());

        verify(bookService).editBook(any(Optional.class));
    }
	
	public String asJsonString(final Object object) throws JsonProcessingException {
        final ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}
