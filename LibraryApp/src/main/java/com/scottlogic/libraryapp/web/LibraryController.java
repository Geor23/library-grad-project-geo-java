package com.scottlogic.libraryapp.web;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

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
	
	@GetMapping(value = "/books/{Id}")
	@ResponseBody
	public Book getBook(@PathVariable("Id") final Integer Id) {
		final Optional<Book> book = bookService.getById(Id);
		if (book.isPresent()) {
			return book.get();
		} else {
			throw new EntityNotFoundException("No book found with id " + Id);
		}
	}
	
	@PostMapping(value = "/books")
	public void addBook(@RequestBody final Book book) {
		bookService.add(Optional.of(book));
	}
	
	@GetMapping(value = "/books")
	@ResponseBody
	public Iterable<Book> getBooks() {
		return bookService.getAll();
	}
	
	@DeleteMapping(value = "/books")
	public void deleteBook(@RequestBody final Integer id) {
		final Optional<Book> book = bookService.getById(id);
		if (book.isPresent()) {
			bookService.deleteBook(book);
		} else {
			throw new EntityNotFoundException("No book found with id " + id);
		}
	}
	
	@PutMapping(value = "/books")
	public void editBook(@RequestBody final Book book) {
		bookService.editBook(Optional.of(book));
	}
}
