package com.scottlogic.libraryapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import com.scottlogic.libraryapp.dao.BookRepository;
import com.scottlogic.libraryapp.domain.Book;

@Service
public class BookServiceImpl implements BookService {
	
	private final BookRepository bookRepository;
	
	public BookServiceImpl(final BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	@Override
	public Optional<Book> getByTitle(String title) {
		return bookRepository.findByTitleIgnoringCase(title);
	}

	@Override
	public Optional<Book> getByAuthor(String author) {
		return bookRepository.findByAuthorIgnoringCase(author);
	}

	@Override
	public Optional<Book> getByIsbn(String isbn) {
		return bookRepository.findByIsbnIgnoringCase(isbn);
	}

	@Override
	public void add(Optional<Book> book) {
		Book b = book.get();
		bookRepository.save(b);
	}

	@Override
	public Optional<Book> getById(Integer id) {
		return Optional.of(bookRepository.findOne(id));
	}

	@Override
	public Iterable<Book> getAll() {
		return bookRepository.findAll();
	}

	@Override
	public void deleteBook(Optional<Book> book) {
		bookRepository.delete(book.get());
	}
	
	@Override
	public void editBook(Optional<Book> book) {
		Book b = book.get();
		bookRepository.save(b);
	}
}
