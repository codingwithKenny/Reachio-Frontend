// MessageList.jsx
import React from "react";
import MessageRow from "./MessageRow";

const MessageList = ({ messages }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4">Sent / Queued Messages</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center md:text-left font-semibold text-gray-700 border-b pb-2 mb-2">
      <span>Customer</span>
      <span>Content</span>
      <span>Status</span>
      <span>Actions</span>
    </div>

    {messages.map((msg) => (
      <MessageRow key={msg.id} message={msg} />
    ))}
  </div>
);

export default MessageList;
