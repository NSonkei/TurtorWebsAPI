package com.webapi.repositories;

import com.webapi.model.Conversations;
import com.webapi.model.Messages;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessagesRepository{
    public Messages findById(String messId);
    public boolean save(Messages mess);
}
