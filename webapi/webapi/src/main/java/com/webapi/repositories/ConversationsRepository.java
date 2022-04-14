package com.webapi.repositories;

import com.webapi.model.Conversations;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ConversationsRepository{
    public boolean save(Conversations con);
    public Conversations findOnebyId(String idCon);
    public Conversations findOnebyNumber(int number);
    public List<Conversations> findAll();
    public List<Conversations> findAllByUserId(String userId);
    public List<String> findMessIdByConId(String conId);
    public Boolean deleteConversation(String conId,String userid);
    public Boolean updateGroupNameConversation(String conId, String GroupName);
}
