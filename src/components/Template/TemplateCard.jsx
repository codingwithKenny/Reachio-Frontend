import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

const TemplateCard = ({ template, onEdit, onDelete }) => {
  const BadgeIcon = template.badgeIcon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white border-2 border-purple-200 shadow-md hover:shadow-xl rounded-2xl p-4 w-full sm:w-48 md:w-56 flex flex-col gap-2 relative hover:-translate-y-1 cursor-grab hover:animate-pulse"
    >
      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${template.badgeColor}`}>
        {BadgeIcon && <BadgeIcon />}
      </div>
      <h3 className="font-semibold text-sm md:text-base text-purple-700 truncate">{template.title}</h3>
      <p className="text-xs md:text-sm text-gray-600 line-clamp-3">{template.message}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(template)}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-xs md:text-sm"
        >
          <FiEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(template.id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs md:text-sm"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
