import React, { useState } from 'react';
import './Button.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";

// Your API key
const API_KEY = process.env.REACT_APP_API_KEY

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
        let apiMessages = chatMessages.map((messageObjet) => {
            let role = messageObjet.sender === "ChatGPT" ? "assistant" : "user";
            return { role: role, content: messageObjet.message };
        });

        const systemMessage = {
            role: "system",
            content: "Be a helpful assistant."
        };

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [systemMessage, ...apiMessages]
        };

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT",
                direction: "incoming"
            }]);
            setTyping(false);
        });
    }

    // Function to toggle visibility of chatbot
    const toggleChatVisibility = () => {
        setChatVisible(!isChatVisible);
    };

    return (
        <div className="Chatbot">
            {/* Button to open the chat */}
            <button onClick={toggleChatVisibility} className="chat-button">
                Open Chat
            </button>

            {/* Conditional rendering of the chatbot */}
            {isChatVisible && (
                <div className="chat-container" style={{ position: "fixed", bottom: "20px", right: "20px", width: "300px", height: "400px", zIndex: 1000 }}>
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
                            >
                                {messages.map((message, i) => (
                                    <Message key={i} model={message} />
                                ))}
                            </MessageList>
                            <MessageInput placeholder="Type message here" onSend={handleSend} />
                        </ChatContainer>
                    </MainContainer>
                    <button onClick={toggleChatVisibility} className="close-chat-button">Close Chat</button>
                </div>
            )}
        </div>
    );
}

export default Chatbot;