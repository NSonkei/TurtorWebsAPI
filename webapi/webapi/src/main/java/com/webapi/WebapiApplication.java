package com.webapi;

import com.webapi.model.Account;
import com.webapi.repositories.AccountRepository;
import com.webapi.repositories.ConversationsRepository;
import com.webapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class WebapiApplication implements CommandLineRunner {
	@Autowired
	ConversationsRepository conRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	AccountRepository accountRepository;
	@Autowired
	ConversationsRepository conversationsRepository;

	public static void main(String[] args)   {
		SpringApplication.run(WebapiApplication.class, args);
	}

	@Autowired
	PasswordEncoder passwordEncoder;
	@Override
	public void run(String... args) throws Exception{
		//test();
    }

	public void test(){
		Account account = new Account();
		account.setAccountId("0817415963");
		account.setPassword(passwordEncoder.encode("123456"));
		accountRepository.save(account);
		System.out.println(account);
	}




}


















