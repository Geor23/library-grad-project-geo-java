package com.scottlogic.libraryapp.service;

import java.util.Optional;

import com.scottlogic.libraryapp.domain.Book;

public interface BookService {
	Optional<Book> getByTitle(final String title);
	Optional<Book> getByAuthor(final String author);
	Optional<Book> getByIsbn(final String isbn);
	Optional<Book> getById(final Long id);
	Iterable<Optional<Book>> getAll();
	void deleteBook(final Optional<Book> book);
	void add(final Book book);
}
