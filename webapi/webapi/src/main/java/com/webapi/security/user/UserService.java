package com.webapi.security.user;

import com.webapi.model.Account;
import com.webapi.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public UserDetails loadUserByUsername(String username){
        System.out.println("UserService");
        Optional<Account> account = accountRepository.findById (username);
        if (account == null){
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(account.get());
    }
}
