import React, { useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";

const SendMessageModal = ({ isOpen, onClose, customer }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; // hide modal when not open

  const handleSend = async () => {
    if (!content.trim()) return alert("Message cannot be empty");

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/messages", {
        content,
        businessId: customer.businessId, // assuming available in your customer object
        customerId: customer.id,
      });
      alert("Message sent successfully!");
      setContent("");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Send Message to {customer.name}
          </h2>
          <button onClick={onClose}>
            <FiX size={22} className="text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Footer */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessageModal;
