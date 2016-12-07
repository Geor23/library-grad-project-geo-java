package com.scottlogic.libraryapp.dao;

import com.scottlogic.libraryapp.domain.Book;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Integer> {
	Optional<Book> findByTitleIgnoringCase(final String title);
	Optional<Book> findByAuthorIgnoringCase(final String author);
	Optional<Book> findByIsbnIgnoringCase(final String isbn);
}
