package com.webapi;

import com.webapi.model.Conversations;
import com.webapi.model.Messages;
import com.webapi.model.User;
import com.webapi.repositories.ConversationsRepository;
import com.webapi.repositories.MessagesRepository;
import com.webapi.repositories.UserRepository;
import com.webapi.security.jwt.JwtTokenProvider;
import com.webapi.security.payload.LoginRequest;
import com.webapi.security.payload.LoginResponse;
import com.webapi.security.user.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class API {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ConversationsRepository conversationsRepository;

    @Autowired
    MessagesRepository messagesRepository;

    //Login
    @PostMapping("/login")
    public LoginResponse authenticateUser(@RequestBody LoginRequest loginRequest,HttpServletRequest request){
        System.out.println(loginRequest);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        return new LoginResponse(jwt);
    }

    //User
    @GetMapping("/contact/{userid}")
    public List<User> getFriends(@PathVariable(name = "userid") String user){
        List<User> friendOfUser = new ArrayList<>();
        Optional<User> u = Optional.ofNullable(userRepository.findbyId(user));
        if (u.isPresent()){
            List<String> friends = u.get().getBeFriend();
            List<User> friendsU = new ArrayList<>();
            friends.forEach((friend)->{
                Optional<User> f = Optional.ofNullable(userRepository.findbyId(friend));
                friendsU.add(f.get());
            });
            return friendsU;
        }
        return null;
    }
    @GetMapping("/user/{userid}")
    public User getOne(@PathVariable(name = "userid") String userId){
        User user = userRepository.findbyId(userId);
        return user;
    }
    @PatchMapping("/user/addFriendRequest/{userid}")
    public ResponseEntity addFriendRequest(@RequestBody Map requester,@PathVariable(name="userid") String userid){
        userRepository.addFriendRequest(userid,requester.get("requester").toString());
        return ResponseEntity.ok().body("Add request complete");
    }
    @PatchMapping("/user/addFriend/{userId}")
    public ResponseEntity addFriend(@RequestBody Map friend,@PathVariable(name="userId") String userid){
        userRepository.addFriend(userid,friend.get("friend").toString());
        return ResponseEntity.ok().body("Add Friend Success");
    }
    @PatchMapping("/user/refuseRequest/{userId}")
    public ResponseEntity refuseRequest(@RequestBody Map request,@PathVariable(name="userId") String userid){
        userRepository.refuseRequest(userid,request.get("request").toString());
        return ResponseEntity.ok().body("Refuse Success");
    }
    @PatchMapping("/user/deleteFriend/{userId}")
    public ResponseEntity deleteFriend(@RequestBody Map friend,@PathVariable(name="userId") String userid){
        userRepository.deleteFriend(userid,friend.get("friend").toString());
        return ResponseEntity.ok().body("Delete success");
    }
    @PatchMapping("/user/beRefuse/{userId}")
    public ResponseEntity beRefuse(@RequestBody Map person,@PathVariable(name="userId") String userid){
        userRepository.beRefuse(userid,person.get("userid").toString());
        return ResponseEntity.ok().body("Refuse success");
    }
    @GetMapping("/user/getHintFriend/{userId}")
    public List<String> getHintFriend(@PathVariable(name = "userId") String userId){
        return userRepository.hintFriends(userId);
    }
    //Conversations
    @GetMapping("/conversations/{userid}")
    public List<Conversations> getConversationsOfUser(@PathVariable(name = "userid") String user){
        return conversationsRepository.findAllByUserId(user);
    }
    @GetMapping("/conversation/{idCon}")
    public Conversations getConversationsById(@PathVariable(name = "idCon") String idCon){
        return conversationsRepository.findOnebyId(idCon);
    }
    @PatchMapping("/conversation/{idCon}")
    public ResponseEntity updateConversation(@RequestBody Map isDelete, @PathVariable(name="idCon") String idCon){
        conversationsRepository.deleteConversation(idCon,isDelete.get("isDelete").toString());
        return ResponseEntity.ok().body("Delete Conversation Complete");
    }
    @PutMapping("/conversation/add/group")
    public ResponseEntity createGroupConversation(@RequestBody Conversations conversations){
        conversationsRepository.save(conversations);
        return ResponseEntity.ok().body("Create Group Complete");
    }
    @PatchMapping("/conversation/u/groupName/{idCon}")
    public ResponseEntity updateGroupNameConversation(@RequestBody Map groupName,@PathVariable(name="idCon") String idCon){
        conversationsRepository.updateGroupNameConversation(idCon,groupName.get("groupName").toString());
        return ResponseEntity.ok().body("Update Complete");
    }
    //Messeges
    @GetMapping("/mess/{messId}")
    public Messages getMessById(@PathVariable(name="messId") String messId){
        return messagesRepository.findById(messId);
    }

    @GetMapping("/mess/conversation/{conId}")
    public List<Messages> getMessByConId(@PathVariable(name="conId") String conId){
        List<String> listMessId = conversationsRepository.findMessIdByConId(conId);
        List<Messages> messages = new ArrayList<>();
        listMessId.forEach((value)->{
            messages.add(getMessById(value));
        });
        return messages;
    }

}
