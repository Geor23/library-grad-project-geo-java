package com.scottlogic.libraryapp.dao;

import com.scottlogic.libraryapp.domain.Book;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Integer> {
	Book findByTitleIgnoringCase(final String title);
	Book findByAuthorIgnoringCase(final String author);
	Book findByIsbnIgnoringCase(final String isbn);
}
