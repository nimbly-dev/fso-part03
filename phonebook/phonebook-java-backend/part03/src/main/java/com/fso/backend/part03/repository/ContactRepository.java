package com.fso.backend.part03.repository;

import com.fso.backend.part03.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactRepository  extends JpaRepository<Contact, Long> {
    @Query("select c from Contact c where c.name = ?1")
    Optional<Contact> findByName(String name);

    boolean existsByName(String name);

    @Query("select COUNT(c) from Contact c")
    int countContacts();
}
