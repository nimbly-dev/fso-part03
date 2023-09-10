package com.fso.backend.part03.controller;

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

        if(contact.isEmpty()) {
            return ResponseEntity.notFound().build();
        }else {
            return ResponseEntity.ok(new ApiResponse<Contact>("success",contact.get()));
        }
    }

    @PostMapping(value = "/saveContact")
    public ResponseEntity<ApiResponse<Contact>> saveContact(@RequestBody ContactRequest contactRequest){
        return ResponseEntity.ok(new ApiResponse<>("success",contactServices.saveContact(contactRequest)));
    }

    @DeleteMapping(value = "/deleteContact")
    //TODO: Fix bug where deleting non-existing Contact causes 500 instead of 404
    public void deleteContact(@RequestParam long id){
        contactServices.deleteContact(id);
    }
}
