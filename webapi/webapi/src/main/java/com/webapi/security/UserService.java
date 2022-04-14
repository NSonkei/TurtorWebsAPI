package com.webapi.security;

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
    AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String accountId) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findById(accountId);
        if (!account.isPresent()){
            throw new UsernameNotFoundException(accountId);
        } else
            return new CustomUserDetail(account.get());
    }
}
