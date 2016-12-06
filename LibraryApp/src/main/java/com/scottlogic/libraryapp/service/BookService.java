package com.scottlogic.libraryapp.service;

import java.util.Optional;

import com.scottlogic.libraryapp.domain.Book;

public interface BookService {
	Optional<Book> getByTitle(final String title);
	Optional<Book> getByAuthor(final String author);
	Optional<Book> getByIsbn(final String isbn);
	Optional<Book> getById(final Long id);
	Optional<Iterable<Book>> getAll();
	void deleteBook(final Long id);
	void add(final Book book);
}
