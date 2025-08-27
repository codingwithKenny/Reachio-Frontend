import React from "react";
import { FiUser, FiMail, FiBarChart2, FiLayers } from "react-icons/fi";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
        <FiUser size={28} className="text-purple-600 mb-2" />
        <p className="text-lg font-semibold">Customers</p>
        <p className="text-2xl font-bold">{stats.customers}</p>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
        <FiLayers size={28} className="text-purple-600 mb-2" />
        <p className="text-lg font-semibold">Campaigns</p>
        <p className="text-2xl font-bold">{stats.campaigns}</p>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
        <FiMail size={28} className="text-purple-600 mb-2" />
        <p className="text-lg font-semibold">Messages</p>
        <p className="text-2xl font-bold">{stats.messages}</p>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
        <FiBarChart2 size={28} className="text-purple-600 mb-2" />
        <p className="text-lg font-semibold">Revenue</p>
        <p className="text-2xl font-bold">${stats.revenue}</p>
      </div>
    </div>
  );
};

export default StatsCards;
