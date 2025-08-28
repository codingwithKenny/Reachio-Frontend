import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiZap } from "react-icons/fi";

const TemplatePage = () => {
  const [templates, setTemplates] = useState([
    { id: 1, title: "New Month Promo", message: "Happy new month! Check our latest offers." },
    { id: 2, title: "Birthday Wishes", message: "Happy Birthday! Wishing you a wonderful year ahead." },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const resetForm = () => {
    setNewTitle("");
    setNewMessage("");
    setEditingTemplate(null);
  };

  const handleAddOrUpdateTemplate = () => {
    if (!newTitle.trim() || !newMessage.trim()) return alert("Both title and message are required.");

    if (editingTemplate) {
      setTemplates(
        templates.map((t) => (t.id === editingTemplate.id ? { ...t, title: newTitle, message: newMessage } : t))
      );
      alert("Template updated successfully!");
    } else {
      setTemplates([...templates, { id: templates.length + 1, title: newTitle, message: newMessage }]);
      alert("Template created successfully!");
    }

    resetForm();
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setNewTitle(template.title);
    setNewMessage(template.message);
  };

  const handleDeleteTemplate = (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates(templates.filter((t) => t.id !== id));
    }
  };

  const handleGenerateAIMessage = () => {
    if (!newTitle.trim()) return alert("Enter a title first to generate an AI message.");
    setLoadingAI(true);

    setTimeout(() => {
      setNewMessage(`✨ AI Magic: Your "${newTitle}" template is now ultra-engaging! 🚀`);
      setLoadingAI(false);
    }, 1000);
  };

  return (
    <div className="p-4 md:p-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-purple-700">Templates</h1>

      {/* Template Form */}
      <div className="bg-white shadow-lg rounded-3xl p-5 md:p-6 space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-purple-600">
          {editingTemplate ? "Edit Template" : "Create New Template"}
        </h2>

        <input
          type="text"
          className="border border-purple-300 px-3 py-2 rounded-lg w-full mt-1 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          placeholder="Template title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <div className="relative">
          <textarea
            className="border border-purple-300 px-3 py-2 rounded-lg w-full mt-1 resize-none focus:ring-2 focus:ring-purple-400 focus:outline-none"
            rows={4}
            placeholder="Template message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
          onClick={handleAddOrUpdateTemplate}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2 text-sm md:text-base"
        >
          <FiPlus /> {editingTemplate ? "Update Template" : "Add Template"}
        </button>
      </div>

      {/* All Templates Box */}
      <div className="bg-purple-50 shadow-xl rounded-3xl p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-purple-600 mb-3">All Templates</h2>
        {templates.length === 0 && <p className="text-sm text-gray-500">No templates yet. Add one above!</p>}

        <div className="flex flex-wrap gap-3">
          {templates.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow-md rounded-2xl p-3 w-full sm:w-48 md:w-60 flex flex-col gap-2 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-sm md:text-base text-purple-700 truncate">{t.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-3">{t.message}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditTemplate(t)}
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-xs md:text-sm"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteTemplate(t.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs md:text-sm"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
