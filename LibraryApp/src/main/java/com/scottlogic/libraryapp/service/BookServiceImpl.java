package com.scottlogic.libraryapp.service;

import java.util.Optional;

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
	public void add(Book book) {
		bookRepository.save(book);
	}

	@Override
	public Optional<Book> getById(Long id) {
		return Optional.of(bookRepository.findOne(id));
	}

	@Override
	public Optional<Iterable<Book>> getAll() {
		return Optional.of(bookRepository.findAll());
	}

	@Override
	public void deleteBook(Long id) {
		Book book = bookRepository.findOne(id);
		bookRepository.delete(book);
	}
}
