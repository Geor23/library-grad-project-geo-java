package com.scottlogic.libraryapp.domain;

import java.sql.Date;

import javax.persistence.*;

@Entity
public class Book {
	private Integer id;
	private String title;
	private String author;
	private String isbn;
	private Date publishDate;
	
	public Book() {
	}
	
	public Book(final String title, final String author, final String isbn, final Date date) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.publishDate = date;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getBookId() {
		return id;
	}
	
	public void setBookId(final Integer id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(final String title) {
		this.title = title;
	}
	
	public String getAuthor() {
		return author;
	}
	
	public void setAuthor(final String author) {
		this.author = author;
	}
	
	public String getIsbn() {
		return isbn;
	}
	
	public void setIsbn(final String isbn) {
		this.isbn = isbn;
	}
	
	public Date getPublishDate() {
		return publishDate;
	}
	
	public void setPublishDate(final Date date) {
		this.publishDate = date;
	}
	
   @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final Book book = (Book) o;

        return title.equals(book.title)&&
        		author.equals(book.author)&&
        		isbn.equals(book.isbn)&&
        		publishDate.equals(book.publishDate);
    }
}
