import React, { useState, useRef, useEffect } from 'react';
import './Chatbot-bubble.css';
import Chatbot_img from './assets/images/chat-bot.png';

const API_KEY = process.env.REACT_APP_API_KEY;

function Chatbot() {
    const messageListRef = useRef(null); // Reference for the message list
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, how can I help?",
            sender: "ChatGPT",
            direction: "incoming"
        }
    ]);
    const [isChatVisible, setChatVisible] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setTyping(true);

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

            if (data.choices && data.choices.length > 0) {
                setMessages([...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: "ChatGPT",
                        direction: "incoming"
                    }
                ]);
            } else {
                setMessages([...chatMessages,
                    {
                        message: "I am currently unavailable. Please try again later.",
                        sender: "ChatGPT",
                        direction: "incoming"
                    }
                ]);
            }
        } catch (error) {
            setMessages([...chatMessages,
                {
                    message: "I am currently unavailable due to a technical issue. Please try again later.",
                    sender: "ChatGPT",
                    direction: "incoming"
                }
            ]);
        } finally {
            setTyping(false);
        }
    }

    const toggleChatVisibility = () => {
        setChatVisible(!isChatVisible);
    };

    const scrollToBottom = () => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom whenever messages change
    }, [messages]);

    return (
        <div className="Chatbot">
            <div className="chatbot-bubble" onClick={toggleChatVisibility}>
                <img src={Chatbot_img} alt="chatbot" />
            </div>
            {isChatVisible && (
                <div className="chatbot-container">
                    <div className="message-list" ref={messageListRef}>
                        {messages.map((message, i) => (
                            <div key={i} className={`message ${message.direction}`}>
                                <div className={`message-bubble ${message.sender}`}>
                                    {message.message}
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className="message incoming">
                                <div className="message-bubble typing-indicator">
                                    Chatbot is typing...
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            placeholder="Write a message"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.target.value.trim() !== "") {
                                    handleSend(e.target.value.trim());
                                    e.target.value = "";
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;