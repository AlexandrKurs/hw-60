import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatHeader from "./chatHeader";
import MessageList from "../components/message/messageList";
import MessageInput from "../components/message/messageInput";
import { Message as MessageType } from "../types";

axios.defaults.baseURL = "http://146.185.154.90:8000";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [lastMessageDate, setLastMessageDate] = useState<string | null>(null);
  const author = "Alexandr";
  let intervalId: number | null = null;

  const fetchMessages = async () => {
    try {
      const response = await axios.get<MessageType[]>("/messages", {
        params: {
          datetime: lastMessageDate,
        },
      });
      if (response.data.length > 0) {
        const newMessages = [...messages, ...response.data];
        setMessages(newMessages.slice(-15));
        setLastMessageDate(response.data[response.data.length - 1].datetime);
      }
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
    }
  };

  const startInterval = () => {
    intervalId = setInterval(fetchMessages, 3000);
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const sendMessage = async (message: string) => {
    stopInterval();
    try {
      await axios.post<MessageType>("/messages", {
        message,
        author,
      });
      await fetchMessages();
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    } finally {
      startInterval();
    }
  };

  useEffect(() => {
    fetchMessages();
    startInterval();

    return () => {
      stopInterval();
    };
  }, []);

  return (
    <div className="container">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default Chat;