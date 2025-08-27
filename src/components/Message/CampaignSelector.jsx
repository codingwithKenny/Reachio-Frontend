// CampaignSelector.jsx
import React from "react";

const CampaignSelector = ({ campaigns, selectedCampaign, setSelectedCampaign }) => (
  <div>
    <label className="font-semibold">Select Campaign:</label>
    <select
      className="border px-3 py-2 rounded-lg w-full mt-1"
      value={selectedCampaign}
      onChange={(e) => setSelectedCampaign(e.target.value)}
    >
      <option value="">-- None --</option>
      {campaigns.map((c) => (
        <option key={c.id} value={c.id}>{c.title}</option>
      ))}
    </select>
  </div>
);

export default CampaignSelector;
