import React from "react";
import { FiPlus, FiMail } from "react-icons/fi";

const QuickActions = () => {
  return (
    <div className="bg-purple-50 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition flex items-center gap-2">
          <FiPlus /> Add Note
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition flex items-center gap-2">
          <FiMail /> Send Reminder
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
