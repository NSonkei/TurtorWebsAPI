package com.webapi.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@RequiredArgsConstructor
@Document(collection = "messages")
public class Messages {
    @Id
    private String idMess;
    private String type;
    private String content;
    private String fromUser;
    private String toUser;
    private Boolean isDelete;
    private state state;
    public enum state{
        CHAT,
        JOIN,
        LEAVE
    }
}
