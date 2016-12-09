package com.scottlogic.libraryapp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.scottlogic.libraryapp.dao.BookReservationRepository;
import com.scottlogic.libraryapp.domain.BookReservation;

@Service
public class BookReservationServiceImpl implements BookReservationService {

	
	private final BookReservationRepository bookResRepository;
	
	public BookReservationServiceImpl(final BookReservationRepository bookResRepository) {
		this.bookResRepository = bookResRepository;
	}

	@Override
	public Optional<BookReservation> getById(Integer id) {
		return Optional.ofNullable(bookResRepository.findOne(id));
	}

	@Override
	public Optional<BookReservation> getByBookId(Integer bookId) {
		return bookResRepository.findByBook(bookId);
	}

	@Override
	public Iterable<BookReservation> getAll() {
		return bookResRepository.findAll();
	}

	@Override
	public void deleteReservation(Optional<BookReservation> bookRes) {
		bookResRepository.delete(bookRes.get());
	}

	@Override
	public void add(Optional<BookReservation> bookRes) {
		BookReservation b = bookRes.get();
		bookResRepository.save(b);
	}

	@Override
	public void editReservation(Optional<BookReservation> bookRes) {
		BookReservation b = bookRes.get();
		bookResRepository.save(b);
	}

}
