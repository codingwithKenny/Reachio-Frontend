import React from "react";

const CampaignList = ({ campaigns }) => {
  if (campaigns.length === 0) {
    return (
      <p className="text-gray-500 italic text-center mt-6">
        No campaigns created yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {campaigns.map((c) => (
        <div
          key={c.id}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow p-5 border border-gray-200"
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-800">
            {c.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Scheduled for:{" "}
            <span className="font-medium text-gray-700">{c.time}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
