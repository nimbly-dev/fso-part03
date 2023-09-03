package com.fso.backend.part03.service;

import com.fso.backend.part03.model.Contact;

import java.util.List;

public interface ContactServices {
    List<Contact> getAllContacts();
    Contact saveContact();

}
