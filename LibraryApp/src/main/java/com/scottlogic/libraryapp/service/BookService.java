package com.scottlogic.libraryapp.service;

import com.scottlogic.libraryapp.domain.Book;

public interface BookService {
	Book getById(final Long id);
	Iterable<Book> getAll();
	void deleteBook(final Book book);
	void add(final Book book);
}
