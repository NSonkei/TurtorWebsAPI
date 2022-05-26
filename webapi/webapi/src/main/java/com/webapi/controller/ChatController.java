package com.webapi.controller;

import com.webapi.model.Messages;
import com.webapi.repositories.ConversationsRepository;
import com.webapi.repositories.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {
    @Autowired
    MessagesRepository messagesRepository;
    @Autowired
    ConversationsRepository conversationsRepository;
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/conver")
    public Messages sendMessage(@Payload Messages message){
        System.out.println("save");
        messagesRepository.save(message);
        conversationsRepository.addMessToCon(message.getToCon(), message.getIdMess());
        return message;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/conver")
    public Messages addUser(@Payload Messages message,
                            SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username",message.getFromUser());
        return message;
    }
}
