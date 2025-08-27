// MessageForm.jsx
import React, { useState } from "react";
import { FiPlus, FiSend, FiEdit } from "react-icons/fi";
import CustomerSelector from "./CustomerSelector";
import CampaignSelector from "./CampaignSelector";

const MessageForm = ({ customers, campaigns, messages, setMessages }) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [messageContent, setMessageContent] = useState("");

  const toggleCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter((c) => c !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const handleSendMessage = () => {
    if (!messageContent || selectedCustomers.length === 0) return alert("Select customers and enter message.");

    const newMessages = selectedCustomers.map((customerId, index) => {
      const customer = customers.find((c) => c.id === customerId);
      return {
        id: messages.length + index + 1,
        content: messageContent,
        customer: customer.name,
        status: "PENDING",
      };
    });

    setMessages([...messages, ...newMessages]);
    setMessageContent("");
    setSelectedCustomers([]);
    alert("Messages queued successfully!");
  };

  const handleAiGenerate = () => {
    setMessageContent("Hello {customerName}, we have a special offer for you!");
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Compose Message</h2>

      <CampaignSelector campaigns={campaigns} selectedCampaign={selectedCampaign} setSelectedCampaign={setSelectedCampaign} />

      <CustomerSelector customers={customers} selectedCustomers={selectedCustomers} toggleCustomer={toggleCustomer} />

      <div>
        <label className="font-semibold">Message Content:</label>
        <textarea
          className="w-full border rounded-lg p-2 mt-1"
          rows={3}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleAiGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            <FiEdit /> Generate with AI
          </button>
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            <FiSend /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
