import React from "react";
import { Message as MessageType } from "../../types";

interface MessageListProps {
  messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div className="message" key={msg._id}>
          <p className="message-author">{msg.author}</p>
          <p className="message-text">{msg.message}</p>
          <span>{new Date(msg.datetime).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
