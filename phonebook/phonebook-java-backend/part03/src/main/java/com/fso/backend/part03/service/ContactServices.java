package com.fso.backend.part03.service;

import com.fso.backend.part03.model.Contact;
import com.fso.backend.part03.model.dao.ContactRequest;

import java.util.List;
import java.util.Optional;

public interface ContactServices {
    List<Contact> getAllContacts();
    int getTotalContacts();
    Optional<Contact> getContactById(long id);
    Contact saveContact(ContactRequest contactRequest);
    void deleteContact(long id);
}
