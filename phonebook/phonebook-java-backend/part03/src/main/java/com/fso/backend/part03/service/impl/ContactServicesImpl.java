package com.fso.backend.part03.service.impl;


import com.fso.backend.part03.exceptions.NotFoundException;
import com.fso.backend.part03.model.Contact;
import com.fso.backend.part03.model.dao.ContactRequest;
import com.fso.backend.part03.repository.ContactRepository;
import com.fso.backend.part03.service.ContactServices;
import com.fso.backend.part03.util.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactServicesImpl implements ContactServices {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    public int getTotalContacts() {
        return contactRepository.countContacts();
    }

    @Override
    public Contact saveContact(ContactRequest contactRequest) {
        return contactRepository.save(EntityMapper.mapContacyRequestToContact(contactRequest));
    }

    @Override
    public void deleteContact(long id) {
        Optional<Contact> contact = contactRepository.findById(id);

        if(contact.isEmpty()){
            throw new NotFoundException("Contact Info not found");
        }

        contactRepository.delete(contact.get());
    }
}
