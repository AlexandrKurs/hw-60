import React from "react";
import { Message as MessageType } from "../../types";

const Message: React.FC<MessageType> = ({ message, author, datetime }) => {
  return (
    <div>
      <strong>{author}</strong>: {message}{" "}
      <small>{new Date(datetime).toLocaleString()}</small>
    </div>
  );
};

export default Message;
