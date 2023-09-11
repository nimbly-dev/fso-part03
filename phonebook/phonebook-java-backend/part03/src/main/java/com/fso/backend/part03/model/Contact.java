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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contact_generator")
    @SequenceGenerator(name = "contact_generator", initialValue = 10)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String number;
}
