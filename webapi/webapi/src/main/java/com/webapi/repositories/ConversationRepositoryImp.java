package com.webapi.repositories;

import com.webapi.model.Conversations;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ConversationRepositoryImp implements ConversationsRepository{
    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public boolean save(Conversations con) {
        mongoTemplate.save(con);
        return true;
    }

    @Override
    public Conversations findOnebyId(String conId){
        Query query = new Query(Criteria.where("idConver").is(conId));
        Conversations conversation = mongoTemplate.findOne(query,Conversations.class);
        return conversation;
    }

    @Override
    public Conversations findOnebyNumber(int number){
        Query query = new Query(Criteria.where("numberParticipate").is(number));
        Conversations conversation = mongoTemplate.findOne(query,Conversations.class);
        return conversation;
    }

    @Override
    public List<Conversations> findAll(){
        return mongoTemplate.findAll(Conversations.class);
    }

    @Override
    public List<Conversations> findAllByUserId(String userId) {
        Query query = new Query(Criteria.where("userInCon").in(userId).and("messages").ne(null).and("isDelete").not().in(userId));
        List<Conversations> conversations = mongoTemplate.find(query,Conversations.class);
        return conversations;
    }

    @Override
    public List<String> findMessIdByConId(String conId) {
        Conversations conver = findOnebyId(conId);
        return conver.getMessages();
    }

    @Override
    public Boolean deleteConversation(String conId, String userid) {
        Query query = new Query(Criteria.where("idConver").is(conId));
        Update update = new Update();
        Conversations conversation = findOnebyId(conId);
        List<String> listDelete = conversation.getIsDelete();
        if (listDelete == null) listDelete = new ArrayList<String>();
        System.out.println(listDelete.add(userid));
        update.set("isDelete",listDelete);
        mongoTemplate.findAndModify(query,update,Conversations.class);
        return false;
    }

    @Override
    public Boolean updateGroupNameConversation(String conId, String groupName) {
        Query query = new Query(Criteria.where("idConver").is(conId));
        Update update = new Update();
        update.set("groupName",groupName);
        mongoTemplate.findAndModify(query,update,Conversations.class);
        return false;
    }

    @Override
    public Boolean addParticipateToGroup(List<String> listParticipate, String conId) {
        Query query = new Query(Criteria.where("idConver").is(conId));
        Conversations con = findOnebyId(conId);
        List<String> userInCon = con.getUserInCon();
        userInCon.addAll(listParticipate);
        Update update = new Update();
        update.set("userInCon",userInCon);
        update.set("numberParticipate",userInCon.size());
        System.out.println(userInCon);
        try{
            mongoTemplate.findAndModify(query,update,Conversations.class);
            return true;
        } catch (Exception ex) {
            System.out.println("Error from conversation " + ex);
            return false;
        }


    }


}
