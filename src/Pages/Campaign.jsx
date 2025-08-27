import React, { useState } from "react";
import Select from "react-select";
import { FiClock, FiSend, FiEdit, FiTrash2 } from "react-icons/fi";

// Sample data
const sampleCustomers = [
  { id: 1, name: "John Doe", phone: "+2348012345678" },
  { id: 2, name: "Jane Smith", phone: "+2348023456789" },
  { id: 3, name: "Alex Johnson", phone: "+2348034567890" },
];

const sampleTemplates = [
  { id: 1, title: "New Month Promo" },
  { id: 2, title: "Birthday Wishes" },
];

const CampaignPage = () => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [autoSend, setAutoSend] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);

  const customerOptions = sampleCustomers.map((c) => ({
    value: c.id,
    label: `${c.name} (${c.phone})`,
  }));

  const templateOptions = sampleTemplates.map((t) => ({
    value: t.id,
    label: t.title,
  }));

  const resetForm = () => {
    setSelectedCustomers([]);
    setSelectedTemplate("");
    setScheduledTime("");
    setAutoSend(false);
    setEditingCampaign(null);
  };

  const handleCreateOrUpdateCampaign = () => {
    if (!selectedTemplate || !scheduledTime || selectedCustomers.length === 0)
      return alert("Fill all fields and select at least one customer.");

    if (editingCampaign) {
      // Update existing campaign
      setCampaigns(
        campaigns.map((c) =>
          c.id === editingCampaign.id
            ? {
                ...c,
                title: sampleTemplates.find((t) => t.id === selectedTemplate).title,
                customers: selectedCustomers.map(
                  (id) => sampleCustomers.find((c) => c.id === id).name
                ),
                time: scheduledTime,
                autoSend,
              }
            : c
        )
      );
      alert("Campaign updated successfully!");
    } else {
      // Create new campaign
      const newCampaign = {
        id: campaigns.length + 1,
        title: sampleTemplates.find((t) => t.id === selectedTemplate).title,
        customers: selectedCustomers.map(
          (id) => sampleCustomers.find((c) => c.id === id).name
        ),
        time: scheduledTime,
        autoSend,
      };
      setCampaigns([...campaigns, newCampaign]);
      alert("Campaign created successfully!");
    }

    resetForm();
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setSelectedTemplate(
      sampleTemplates.find((t) => t.title === campaign.title).id
    );
    setSelectedCustomers(
      campaign.customers.map(
        (name) => sampleCustomers.find((c) => c.name === name).id
      )
    );
    setScheduledTime(campaign.time);
    setAutoSend(campaign.autoSend);
  };

  const handleDeleteCampaign = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(campaigns.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Campaigns</h1>

      {/* Campaign Form */}
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
          onClick={handleCreateOrUpdateCampaign}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          <FiSend /> {editingCampaign ? "Update Campaign" : "Create Campaign"}
        </button>
      </div>

      {/* Created Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-2 relative"
          >
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-sm text-gray-600">
              <FiClock className="inline mr-1" />{" "}
              {new Date(c.time).toLocaleString()}
            </p>
            <p className="text-sm">
              Customers: {c.customers.join(", ")}
            </p>
            <p
              className={`font-semibold ${
                c.autoSend ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {c.autoSend ? "Auto Send Enabled" : "Manual Send"}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEditCampaign(c)}
                className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => handleDeleteCampaign(c.id)}
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignPage;
