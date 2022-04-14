package com.webapi;

import com.webapi.model.Account;
import com.webapi.model.Conversations;
import com.webapi.model.Messages;
import com.webapi.model.User;
import com.webapi.repositories.AccountRepository;
import com.webapi.repositories.ConversationsRepository;
import com.webapi.repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class WebapiApplication implements CommandLineRunner {
	@Autowired
	ConversationsRepository conRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AccountRepository accountRepository;
	@Autowired
	ConversationsRepository conversationsRepository;

	public static void main(String[] args)   {
		SpringApplication.run(WebapiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception{
    }

	public void test(){
		List<Conversations> con = conversationsRepository.findAllByUserId("0817415960");
		System.out.println(con);
	}




}


















