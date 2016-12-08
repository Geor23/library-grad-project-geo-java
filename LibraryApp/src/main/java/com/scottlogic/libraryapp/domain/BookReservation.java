package com.scottlogic.libraryapp.domain;

import java.sql.Date;

import javax.persistence.*;

@Entity
public class BookReservation {
	private Integer id;
	private Integer bookId;
	private Date from;
	private Date to;
	
	public BookReservation() {
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getResId() {
		return id;
	}
	
	public void setResId(final Integer id) {
		this.id = id;
	}
	
	public Integer getResBookId() {
		return bookId;
	}
	
	public void setResBookId(final Integer bookId) {
		this.bookId = bookId;
	}
	
	public Date getFrom() {
		return from;
	}
	
	public void setFrom(final Date from) {
		this.from = from;
	}
	
	public Date getTo() {
		return to;
	}
	
	public void setTo(final Date to) {
		this.to = to;
	}
	
   @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final BookReservation res = (BookReservation) o;

        return bookId.equals(res.bookId)&&
        		from.equals(res.from)&&
        		to.equals(res.to);
    }
}
