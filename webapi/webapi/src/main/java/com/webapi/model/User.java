package com.webapi.model;

import com.mongodb.lang.NonNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user")
public class User {
    @Id
    private String userId;
    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
    private String address;
    private String avatar;
    private String email;
    private List<String> beFriend;
    private List<String> block;
    private List<String> follow;
    private List<String> beFollowed;
    private List<String> requestFriend;
    private List<String> refuseBy;
    private List<String> hintFriend;
}
