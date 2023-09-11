package com.fso.backend.part03.controller;

import com.fso.backend.part03.exceptions.EmptyValuesException;
import com.fso.backend.part03.model.ApiResponse;
import com.fso.backend.part03.model.Contact;
import com.fso.backend.part03.model.dao.ContactRequest;
import com.fso.backend.part03.service.ContactServices;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    @Resource
    private ContactServices contactServices;

    @GetMapping(value = "/")
    public ResponseEntity<ApiResponse<List<Contact>>> getContacts(){
        return ResponseEntity.ok(new ApiResponse("success",contactServices.getAllContacts()));
    }

    @GetMapping(value = "/info")
    public ResponseEntity<ApiResponse<Integer>> getTotalContacts(){
        return ResponseEntity.ok(new ApiResponse<>("success", contactServices.getTotalContacts()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ApiResponse<Contact>> getContact(@PathVariable String id){
        Optional<Contact> contact = contactServices.getContactById(Long.parseLong(id));
        return ResponseEntity.ok(new ApiResponse<Contact>("success",contact.get()));
    }

    @PostMapping(value = "/")
    public ResponseEntity<ApiResponse<Contact>> saveContact(@RequestBody ContactRequest contactRequest){
        if(contactRequest.getName().isEmpty() || contactRequest.getNumber().isEmpty()){
            throw new EmptyValuesException("fields must not be empty");
        }

        return ResponseEntity.ok(new ApiResponse<>("success",contactServices.saveContact(contactRequest)));
    }

    @DeleteMapping(value = "/{id}")
    public void deleteContact(@PathVariable long id){
        contactServices.deleteContact(id);
    }
}
