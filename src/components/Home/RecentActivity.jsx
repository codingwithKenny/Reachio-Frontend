import React from "react";

const RecentActivity = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        <li className="flex justify-between bg-purple-50 px-4 py-2 rounded-lg shadow hover:bg-purple-100 transition">
          <span>Campaign sent</span>
          <span className="italic text-gray-500">2 hours ago</span>
        </li>
        <li className="flex justify-between bg-purple-50 px-4 py-2 rounded-lg shadow hover:bg-purple-100 transition">
          <span>New customer added</span>
          <span className="italic text-gray-500">Yesterday</span>
        </li>
        <li className="flex justify-between bg-purple-50 px-4 py-2 rounded-lg shadow hover:bg-purple-100 transition">
          <span>Message delivered</span>
          <span className="italic text-gray-500">2 days ago</span>
        </li>
      </ul>
    </div>
  );
};

export default RecentActivity;
