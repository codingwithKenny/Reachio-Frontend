import React, { useState } from "react";
import { FiPlus, FiZap } from "react-icons/fi";

const TemplateForm = ({ onSubmit, editingTemplate }) => {
  const [title, setTitle] = useState(editingTemplate?.title || "");
  const [message, setMessage] = useState(editingTemplate?.message || "");
  const [loadingAI, setLoadingAI] = useState(false);

  const handleGenerateAIMessage = () => {
    if (!title.trim()) return alert("Enter a title first to generate an AI message.");
    setLoadingAI(true);
    setTimeout(() => {
      setMessage(`✨ AI Magic: Your "${title}" template will WOW your customers! 🚀`);
      setLoadingAI(false);
    }, 1000);
  };

  const handleSubmit = () => {
    onSubmit({ title, message });
    setTitle("");
    setMessage("");
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-5 md:p-6 space-y-4 border-2 border-purple-300">
      <h2 className="text-lg md:text-xl font-semibold text-purple-600">
        {editingTemplate ? "Edit Template" : "Create New Template"}
      </h2>

      <input
        type="text"
        className="border border-purple-300 px-3 py-2 rounded-lg w-full mt-1 focus:ring-2 focus:ring-purple-400 focus:outline-none"
        placeholder="Template title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="relative">
        <textarea
          className="border border-purple-300 px-3 py-2 rounded-lg w-full mt-1 resize-none focus:ring-2 focus:ring-purple-400 focus:outline-none"
          rows={4}
          placeholder="Template message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleGenerateAIMessage}
          disabled={loadingAI}
          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition text-xs md:text-sm"
        >
          <FiZap /> {loadingAI ? "Generating..." : "AI"}
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2 text-sm md:text-base"
      >
        <FiPlus /> {editingTemplate ? "Update Template" : "Add Template"}
      </button>
    </div>
  );
};

export default TemplateForm;
