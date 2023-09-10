package com.fso.backend.part03.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "contacts")
@Entity
@Getter
@Setter
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String number;
}