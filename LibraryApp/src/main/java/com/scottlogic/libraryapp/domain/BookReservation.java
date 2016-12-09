package com.scottlogic.libraryapp.domain;

import java.sql.Date;

import javax.persistence.*;

@Entity
public class BookReservation {
		
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private Integer book;
	private String fromDate;
	private String toDate;
	
	public BookReservation() {
	}
	
	public BookReservation(final Integer bookId, final String from, final String to) {
		this.book = bookId;
		this.fromDate = from;
		this.toDate= to;
	}

	public Integer getId() {
		return id;
	}
	
	public void setId(final Integer id) {
		this.id = id;
	}
	
	public Integer getBook() {
		return book;
	}
	
	public void setBook(final Integer bookId) {
		this.book = bookId;
	}
	
	public String getFrom() {
		return fromDate;
	}
	
	public void setFrom(final String from) {
		this.fromDate = from;
	}
	
	public String getTo() {
		return toDate;
	}
	
	public void setTo(final String to) {
		this.toDate = to;
	}
	
   @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final BookReservation res = (BookReservation) o;

        return book.equals(res.book)&&
        		fromDate.equals(res.fromDate)&&
        		toDate.equals(res.toDate);
    }
}
