package com.fso.backend.part03.service;

import com.fso.backend.part03.model.Contact;
import com.fso.backend.part03.model.dao.ContactRequest;
import org.springframework.stereotype.Service;

import java.util.List;
public interface ContactServices {
    List<Contact> getAllContacts();
    int getTotalContacts();
    Contact saveContact(ContactRequest contactRequest);
    void deleteContact(long id);
}
