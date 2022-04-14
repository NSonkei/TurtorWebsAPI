package com.webapi.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "account")
@Data
public class Account {
    @Id
    private String accountId;
    private String password;
    private String role;
}
