package com.fso.backend.part03;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.fso.backend.part03"})
public class Part03Application {

	public static void main(String[] args) {
		SpringApplication.run(Part03Application.class, args);
	}

}
