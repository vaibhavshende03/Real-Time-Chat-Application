package com.vs.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    // Configure the message broker
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");// Enables a simple in-memory message broker
        // /topic/messages
        registry.setApplicationDestinationPrefixes("/app");// Prefix for messages bound for @MessageMapping

    }

    @Override
    // Register STOMP endpoints
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")// WebSocket endpoint for connectio establishment
                // .setAllowedOrigins("*")// WebSocket endpoint
                .setAllowedOrigins("http://localhost:5173")
                .withSockJS();// Fallback to SockJS for browsers that don't support WebSocket
        // /chat endpointpar connection establish hoga
        // client-side: new SockJS('/chat')

    }

}
