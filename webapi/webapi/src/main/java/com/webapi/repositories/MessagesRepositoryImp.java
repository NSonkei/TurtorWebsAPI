package com.webapi.repositories;

import com.webapi.model.Messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class MessagesRepositoryImp implements MessagesRepository {
    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Messages findById(String messId) {
        Query query = new Query(Criteria.where("idMess").is(messId));
        Messages mess = mongoTemplate.findOne(query,Messages.class);
        return mess;
    }

    @Override
    public boolean save(Messages mess) {
        mongoTemplate.save(mess);
        return true;
    }
}
