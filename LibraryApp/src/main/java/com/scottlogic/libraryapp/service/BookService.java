package com.scottlogic.libraryapp.service;

import java.util.Optional;

import com.scottlogic.libraryapp.domain.Book;

public interface BookService {
	Book getByTitle(final String title);
	Book getByAuthor(final String author);
	Book getByIsbn(final String isbn);
	Book getById(final Integer id);
	Iterable<Book> getAll();
	void deleteBook(final Book book);
	void add(final Book book);
}
