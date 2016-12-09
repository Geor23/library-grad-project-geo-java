package com.scottlogic.libraryapp.dao;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository; 
import com.scottlogic.libraryapp.domain.BookReservation;

public interface BookReservationRepository extends CrudRepository<BookReservation, Integer> {
	Optional<BookReservation> findByBook(final Integer book);
}
