package com.webapi.repositories;

import com.webapi.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository{
    public User findbyId(String id);
    public String addUser(User user,String password);
    public Boolean addFriendRequest(String userId, String requester);
    public Boolean addFriend(String userId,String friend);
    public Boolean refuseRequest(String userId,String request);
    public Boolean deleteFriend(String userId,String friend);
    public Boolean beRefuse(String userId,String person);
    public List<String> hintFriends(String userId);
}
