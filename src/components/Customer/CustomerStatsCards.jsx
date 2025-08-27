import React from "react";
import { FiUser } from "react-icons/fi";

const CustomerStatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
        <FiUser size={28} className="text-purple-600 mb-2" />
        <p className="text-lg font-semibold">Total Customers</p>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
        <FiUser size={28} className="text-green-600 mb-2" />
        <p className="text-lg font-semibold">Active</p>
        <p className="text-2xl font-bold">{stats.active}</p>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
        <FiUser size={28} className="text-red-600 mb-2" />
        <p className="text-lg font-semibold">Inactive</p>
        <p className="text-2xl font-bold">{stats.inactive}</p>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
        <FiUser size={28} className="text-yellow-600 mb-2" />
        <p className="text-lg font-semibold">Recently Added</p>
        <p className="text-2xl font-bold">{stats.recent}</p>
      </div>
    </div>
  );
};

export default CustomerStatsCards;
