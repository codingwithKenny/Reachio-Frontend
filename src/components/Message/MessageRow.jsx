// MessageRow.jsx
import React from "react";
import { FiEdit } from "react-icons/fi";

const MessageRow = ({ message }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-b items-center">
    <span>{message.customer}</span>
    <span>{message.content}</span>
    <span
      className={`font-semibold ${
        message.status === "SENT" ? "text-green-600" : message.status === "PENDING" ? "text-yellow-600" : "text-red-600"
      }`}
    >
      {message.status}
    </span>
    <span className="flex justify-center md:justify-start gap-2">
      <button className="text-purple-600 hover:text-purple-800">
        <FiEdit />
      </button>
    </span>
  </div>
);

export default MessageRow;
