package com.scottlogic.libraryapp.web;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.scottlogic.libraryapp.domain.BookReservation;
import com.scottlogic.libraryapp.service.BookReservationService;

@RestController
public class ReservationController {
	private final BookReservationService bookResService;
	
	public ReservationController(final BookReservationService bookResService) {
		this.bookResService = bookResService;
	}
	
	@GetMapping(value = "/bookreservations/{Id}")
	@ResponseBody
	public BookReservation getBookReservation(@PathVariable("Id") final Integer Id) {
		final Optional<BookReservation> bookRes = bookResService.getById(Id);
		if (bookRes.isPresent()) {
			return bookRes.get();
		} else {
			throw new EntityNotFoundException("No reservation found with id " + Id);
		}
	}
	
	@PostMapping(value = "/bookreservations")
	public void addBook(@RequestBody final BookReservation bookRes) {
		System.out.println("reservation : " + bookRes);
		bookResService.add(Optional.of(bookRes));
	}
	
	@GetMapping(value = "/bookreservations")
	@ResponseBody
	public Iterable<BookReservation> getReservations() {
		return bookResService.getAll();
	}
	
	@DeleteMapping(value = "/bookreservations")
	public void deleteReservation(@RequestBody final Integer id) {
		final Optional<BookReservation> book = bookResService.getById(id);
		if (book.isPresent()) {
			bookResService.deleteReservation(book);
		} else {
			throw new EntityNotFoundException("No book found with id " + id);
		}
	}
	
	@PutMapping(value = "/bookreservations")
	public void editReservation(@RequestBody final BookReservation book) {
		bookResService.editReservation(Optional.of(book));
	}
}
