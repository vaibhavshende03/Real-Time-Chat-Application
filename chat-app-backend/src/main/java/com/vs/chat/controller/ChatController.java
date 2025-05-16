package com.vs.chat.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.vs.chat.model.Message;
import com.vs.chat.model.Room;
import com.vs.chat.repository.RoomRepository;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {
    @Autowired
    RoomRepository roomRepository;

    // for sending and receiving messages

    @MessageMapping("/sendMessage/{roomId}") // app/sendMessage/{roomId}
    @SendTo("/topic/messages/{roomId}") // subscribe
    public Message sendMessage(@DestinationVariable String roomId,
            @RequestBody MessageRequest request) {

        Room room = roomRepository.findByRoomId(request.getRoomId());
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimeStamp(LocalDateTime.now());

        if (room != null) {
            room.getMessages().add(message);
            roomRepository.save(room);
        } else {
            throw new RuntimeException("Room Not Found");
        }

        return message;
    }

}
