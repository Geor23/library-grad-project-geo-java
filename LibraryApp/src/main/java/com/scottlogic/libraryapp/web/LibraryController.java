package com.scottlogic.libraryapp.web;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.web.bind.annotation.*;

import com.scottlogic.libraryapp.domain.Book;
import com.scottlogic.libraryapp.service.BookService;

@RestController
public class LibraryController {
	private final BookService bookService;
	
	public LibraryController(final BookService bookService) {
		this.bookService = bookService;
	}
	
	@GetMapping(value = "/books/{Title}")
	@ResponseBody
	public Book getBook(@PathVariable("Title") final String Title) {
		final Optional<Book> book = bookService.getByTitle(Title);
		if (book.isPresent()) {
			return book.get();
		} else {
			throw new EntityNotFoundException("No book found with title " + Title);
		}
	}
	
	@PostMapping(value = "/books")
	public void addBook(@RequestBody final Book book) {
		bookService.add(book);
	}

}
