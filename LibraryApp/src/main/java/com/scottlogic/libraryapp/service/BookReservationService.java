package com.scottlogic.libraryapp.service;

import java.util.Optional;

import com.scottlogic.libraryapp.domain.BookReservation;

public interface BookReservationService {
	Optional<BookReservation> getById(final Integer id);
	Optional<BookReservation> getByBookId(final Integer bookId);
	Iterable<BookReservation> getAll();
	void deleteReservation(final Optional<BookReservation> book);
	void add(final Optional<BookReservation> book);
	void editReservation(Optional<BookReservation> book);
}
