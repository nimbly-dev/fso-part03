package com.fso.backend.part03.util;

import com.fso.backend.part03.model.Contact;
import com.fso.backend.part03.model.dao.ContactRequest;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

@Component
public class EntityMapper {

    public static Contact mapContacyRequestToContact(ContactRequest contactRequest){
        Contact contact = new Contact();

        contact.setName(contactRequest.getName());
        contact.setNumber(contactRequest.getNumber());
        return contact;
    }
}
