import React, { useState } from 'react';
import './Chatbot-bubble.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";

import Chatbot_img from './assets/images/chat-bot.png' 

// Your API key
const API_KEY = process.env.REACT_APP_API_KEY;

function Chatbot() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, how can I help?",
            sender: "ChatGPT",
            direction: "incoming"
        }
    ]);
    const [isChatVisible, setChatVisible] = useState(false); // State to control chatbot visibility

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages); // Update messages state
        setTyping(true); // Set typing indicator

        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role: role, content: messageObject.message };
        });
    
        const systemMessage = {
            role: "system",
            content: "You are an assistant that is incorporated into a referral website. Remain on topic and avoid going off-topic."
        };
    
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [systemMessage, ...apiMessages]
        };

        // Try block implemented to catch errors. 
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });
    
            const data = await response.json();
    
            // Check if the response has valid choices
            if (data.choices && data.choices.length > 0) {
                setMessages([...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: "ChatGPT",
                        direction: "incoming"
                    }
                ]);
            } else {
                // Fallback if choices are missing or if could not retreive a response from OpenAI API.
                setMessages([...chatMessages,
                    {
                        message: "I am currently unavailable. Please try again later.",
                        sender: "ChatGPT",
                        direction: "incoming"
                    }
                ]);
            }
             //Handle network or server errors (failure to connect)
        } catch (error) {
            setMessages([...chatMessages,
                {
                    message: "I am currently unavailable due to a technical issue. Please try again later.",
                    sender: "ChatGPT",
                    direction: "incoming"
                }
            ]);
        } finally {
            setTyping(false); // Ensure typing indicator is hidden
        }
    }

       // Function to toggle visibility of chatbot
    const toggleChatVisibility = () => {
        setChatVisible(!isChatVisible);
    };

    return (
        <div className="Chatbot">
            {/* Floating chat bubble with an image */}
            <div className="chatbot-bubble" onClick={toggleChatVisibility}>
                <img src={Chatbot_img} alt="chatbot " />
            </div>
            
            {/* Chat container */}
            {isChatVisible && (
                <div className="chatbot-container">
                    <MainContainer>
                        <ChatContainer> 
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={typing ? <TypingIndicator content="Chatbot is typing" /> : null}
                            >
                                {messages.map((message, i) => (
                                    <Message key={i} model={message} />
                                ))}
                            </MessageList>
                            <MessageInput placeholder="Write a message" onSend={handleSend} />
                        </ChatContainer>
                    </MainContainer>
                </div>
            )}
        </div>
    );
}

export default Chatbot;