package com.scottlogic.libraryapp.service;

import java.util.Optional;

import com.scottlogic.libraryapp.domain.Book;

public interface BookService {
	Optional<Book> getByTitle(final String title);
	Optional<Book> getByAuthor(final String author);
	Optional<Book> getByISBN(final String isbn);
	
	void add(final Book book);
}
