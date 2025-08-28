import React, { useState } from "react";

import { FiStar, FiGift, FiTag } from "react-icons/fi";
import TemplateForm from "../components/Template/TemplateForm";
import TemplateList from "../components/Template/TemplateList";

const badgeIcons = [FiStar, FiGift, FiTag];
const badgeColors = ["bg-purple-500", "bg-yellow-400", "bg-pink-500", "bg-green-400"];

const TemplatePage = () => {
  const [templates, setTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const handleAddOrUpdate = ({ title, message }) => {
    if (editingTemplate) {
      setTemplates(
        templates.map((t) => (t.id === editingTemplate.id ? { ...t, title, message } : t))
      );
      setEditingTemplate(null);
    } else {
      setTemplates([
        ...templates,
        {
          id: templates.length + 1,
          title,
          message,
          badgeColor: badgeColors[Math.floor(Math.random() * badgeColors.length)],
          badgeIcon: badgeIcons[Math.floor(Math.random() * badgeIcons.length)],
        },
      ]);
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-purple-700">Templates</h1>
      <TemplateForm onSubmit={handleAddOrUpdate} editingTemplate={editingTemplate} />
      <div className="bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 shadow-2xl rounded-3xl p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-purple-700 mb-3">All Templates</h2>
        <TemplateList templates={templates} setTemplates={setTemplates} onEdit={setEditingTemplate} onDelete={(id) => setTemplates(templates.filter(t => t.id !== id))} />
      </div>
    </div>
  );
};

export default TemplatePage;
