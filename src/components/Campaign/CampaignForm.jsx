import React from "react";
import Select from "react-select";
import { FiSend } from "react-icons/fi";

const CampaignForm = ({
  selectedTemplate,
  setSelectedTemplate,
  selectedCustomers,
  setSelectedCustomers,
  scheduledTime,
  setScheduledTime,
  autoSend,
  setAutoSend,
  handleSubmit,
  editingCampaign,
  templateOptions,
  customerOptions,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        {editingCampaign ? "Edit Campaign" : "Create New Campaign"}
      </h2>

      {/* Template Select */}
      <div>
        <label className="font-semibold">Select Template:</label>
        <Select
          options={templateOptions}
          value={templateOptions.find((t) => t.value === selectedTemplate)}
          onChange={(selected) => setSelectedTemplate(selected.value)}
          placeholder="Select template..."
          className="mt-1"
        />
      </div>

      {/* Customer Multi-Select */}
      <div>
        <label className="font-semibold">Select Customers:</label>
        <Select
          isMulti
          options={customerOptions}
          value={customerOptions.filter((c) =>
            selectedCustomers.includes(c.value)
          )}
          onChange={(selected) =>
            setSelectedCustomers(selected.map((s) => s.value))
          }
          className="mt-1"
          placeholder="Select customers..."
        />
      </div>

      {/* Scheduled Time */}
      <div>
        <label className="font-semibold">Scheduled Time:</label>
        <input
          type="datetime-local"
          className="border px-3 py-2 rounded-lg w-full mt-1"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
        />
      </div>

      {/* Auto Send Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={autoSend}
          onChange={(e) => setAutoSend(e.target.checked)}
          id="autoSend"
          className="w-4 h-4"
        />
        <label htmlFor="autoSend" className="font-semibold">
          Auto Send
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
      >
        <FiSend /> {editingCampaign ? "Update Campaign" : "Create Campaign"}
      </button>
    </div>
  );
};

export default CampaignForm;
