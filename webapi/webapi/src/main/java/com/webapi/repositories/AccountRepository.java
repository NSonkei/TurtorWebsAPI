package com.webapi.repositories;

import com.webapi.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account,String> {
    Optional<Account> findById(String accountId);
}
