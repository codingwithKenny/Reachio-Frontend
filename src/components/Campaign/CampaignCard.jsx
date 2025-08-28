import React from "react";
import { FiClock, FiEdit, FiTrash2 } from "react-icons/fi";

const CampaignCard = ({ campaign, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-2 relative">
      <h3 className="font-semibold text-lg">{campaign.title}</h3>
      <p className="text-sm text-gray-600">
        <FiClock className="inline mr-1" />{" "}
        {new Date(campaign.time).toLocaleString()}
      </p>
      <p className="text-sm">Customers: {campaign.customers.join(", ")}</p>
      <p
        className={`font-semibold ${
          campaign.autoSend ? "text-green-600" : "text-yellow-600"
        }`}
      >
        {campaign.autoSend ? "Auto Send Enabled" : "Manual Send"}
      </p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => handleEdit(campaign)}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
        >
          <FiEdit /> Edit
        </button>
        <button
          onClick={() => handleDelete(campaign.id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
