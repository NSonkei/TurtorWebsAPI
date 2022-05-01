package com.webapi.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@RequiredArgsConstructor
@Document(collection = "conversations")
public class Conversations {
    @Id
    private String idConver;
    private int numberParticipate;
    private List<String> userInCon;
    private List<String> messages;
    private List<String> isDelete;
    private String groupAvatar;
    private String groupName;
}
