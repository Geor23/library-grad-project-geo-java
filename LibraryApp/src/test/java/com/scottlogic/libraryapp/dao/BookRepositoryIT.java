package com.scottlogic.libraryapp.dao;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

import com.scottlogic.libraryapp.domain.Book;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BookRepositoryIT {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void shouldAddBook(){
        final Book book = new Book("Java", "author", "isbn");

        bookRepository.save(book);

        final Book result = entityManager.find(Book.class, book.getBookId());
        assertThat(result, equalTo(book));
    }
}
