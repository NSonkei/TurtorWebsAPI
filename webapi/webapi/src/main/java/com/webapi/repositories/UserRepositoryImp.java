package com.webapi.repositories;

import com.webapi.model.Account;
import com.webapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepositoryImp implements UserRepository{
    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<String> deleteRequest(User user,String request){
        List<String> requestList = user.getRequestFriend();
        for (int i = 0 ; i < requestList.size() ; i++){
            if (requestList.get(i).equals(request)){
                System.out.println(i);
                requestList.remove(i);
                return requestList;
            }
        }
        return requestList;
    }
    @Override
    public User findbyId(String id) {
        Query query = new Query(Criteria.where("userId").is(id));
        User users = mongoTemplate.findOne(query,User.class);
        return users;
    }

    @Override
    public String addUser(User user, String password) {
        try{
            User newUser = new User();
            newUser.setUserId(user.getUserId());
            newUser.setAvatar(user.getAvatar());
            newUser.setEmail(user.getEmail());
            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());
            newUser.setBeFriend(new ArrayList<String>());
            newUser.setHintFriend(new ArrayList<String>());
            newUser.setRequestFriend(new ArrayList<String>());
            newUser.setRefuseBy(new ArrayList<String>());
            mongoTemplate.save(newUser);
            Account account = new Account();
            account.setRole("ROLE_USER");
            account.setAccountId(user.getUserId());
            account.setPassword(passwordEncoder.encode(password));
            accountRepository.save(account);
            return "ok";
        } catch (Exception ex){
            System.out.println(ex);
            return "not ok";
        }
    }

    @Override
    public Boolean addFriendRequest(String userId, String requester) {
        User user = findbyId(userId);
        Query query = new Query(Criteria.where("userId").is(userId));
        List<String> requestFriend = user.getRequestFriend();
        requestFriend.add(requester);
        Update update = new Update();
        update.set("requestFriend",requestFriend);
        mongoTemplate.findAndModify(query,update,User.class);
        return false;
    }

    @Override
    public Boolean addFriend(String userId, String friend) {
        User user = findbyId(userId);
        Query query = new Query(Criteria.where("userId").is(userId));
        List<String> requestFriend = user.getBeFriend();
        requestFriend.add(friend);
        Update update = new Update();
        update.set("beFriend",requestFriend);
        mongoTemplate.findAndModify(query,update,User.class);

        List<String> requestList = deleteRequest(user,friend);
        update.set("requestFriend",requestList);
        mongoTemplate.findAndModify(query,update,User.class);
        return false;
    }

    @Override
    public Boolean refuseRequest(String userId, String request) {
        User user = findbyId(userId);
        Query query = new Query(Criteria.where("userId").is(userId));
        List<String> requestList = deleteRequest(user,request);
        Update update = new Update();
        update.set("requestFriend",requestList);
        mongoTemplate.findAndModify(query,update,User.class);
        beRefuse(userId,request);
        return false;
    }

    @Override
    public Boolean deleteFriend(String userId, String friend) {
        User user = findbyId(userId);
        List<String> listFriend = user.getBeFriend();
        //Delete
        for (int i=0;i<listFriend.size();i++){
            if(listFriend.get(i).equals(friend)){
                listFriend.remove(i);
                break;
            }
        }
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.set("beFriend",listFriend);
        mongoTemplate.findAndModify(query,update,User.class);
        return false;
    }

    @Override
    public Boolean beRefuse(String userId, String person) {
        User user = findbyId(userId);
        Query query = new Query(Criteria.where("userId").is(userId));
        List<String> beRefuse = user.getRefuseBy();
        beRefuse.add(person);
        Update update = new Update();
        update.set("refuseBy",beRefuse);
        mongoTemplate.findAndModify(query,update,User.class);
        return false;
    }

    @Override
    public List<String> hintFriends(String userId) {
        User user = findbyId(userId);
        Query query = new Query(Criteria.where("userId").is(userId));
        List<String> hintFriend = user.getHintFriend();
        List<String> beFriends = user.getBeFriend();
        for (int i = 0;i<beFriends.size();i++){
            if (hintFriend.size()>50) break;
            User friend = findbyId(beFriends.get(i));
            List<String> friendsOfFriend = friend.getBeFriend();
            for (String j : friendsOfFriend){
                if (j.equals(userId)) continue;
                User hint = findbyId(j);
                Boolean ok = true;
                for (String z : hint.getRefuseBy()){
                    if (z.equals(userId)){
                        ok=false;
                        break;
                    }
                }
                if (ok) {
                    User person = findbyId(j);
                    Boolean ok2 = true;
                    for (String z : person.getRequestFriend()){
                        if (z.equals(userId)){
                            ok2=false;
                            break;
                        }
                    }
                    if (ok2) hintFriend.add(j);
                }
            }
        }
        if (hintFriend == null) return new ArrayList<String>();
        else
        return hintFriend;
    }


}
