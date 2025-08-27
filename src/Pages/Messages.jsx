// MessagesPage.jsx
import React, { useState } from "react";
import MessageForm from "../components/Message/MessageForm";
import MessageList from "../components/Message/MessageList";


const sampleCustomers = [
  { id: 1, name: "John Doe", phone: "+2348012345678" },
  { id: 2, name: "Jane Smith", phone: "+2348023456789" },
  { id: 3, name: "Alex Johnson", phone: "+2348034567890" },
];

const sampleCampaigns = [
  { id: 1, title: "New Month Promo" },
  { id: 2, title: "Birthday Wishes" },
];

const sampleMessages = [
  { id: 1, content: "Happy New Month!", customer: "John Doe", status: "SENT" },
  { id: 2, content: "We missed you last month", customer: "Jane Smith", status: "PENDING" },
];

const Messages = () => {
  const [messages, setMessages] = useState(sampleMessages);

  return (
    <div className="p-6 md:p-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Messages</h1>

      <MessageForm
        customers={sampleCustomers}
        campaigns={sampleCampaigns}
        messages={messages}
        setMessages={setMessages}
      />

      <MessageList messages={messages} />
    </div>
  );
};

export default Messages;
