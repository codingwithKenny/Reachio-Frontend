import React, { useState } from "react";
import { FiPlus, FiSend, FiEdit } from "react-icons/fi";

// Sample data
const sampleCustomers = [
  { id: 1, name: "John Doe", phone: "+2348012345678" },
  { id: 2, name: "Jane Smith", phone: "+2348023456789" },
  { id: 3, name: "Alex Johnson", phone: "+2348034567890" },
];

const sampleTemplates = [
  { id: 1, title: "New Month Message", content: "Hello {customerName}, Happy New Month!" },
  { id: 2, title: "Birthday Wishes", content: "Happy Birthday {customerName}!" },
];

const CampaignPage = () => {
  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [autoSend, setAutoSend] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  const toggleCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter((c) => c !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const handleCreateCampaign = () => {
    if (!title || !selectedTemplate || selectedCustomers.length === 0 || !scheduledDate || !scheduledTime) {
      return alert("Please fill in all required fields.");
    }

    const newCampaign = {
      id: campaigns.length + 1,
      title,
      template: sampleTemplates.find((t) => t.id === parseInt(selectedTemplate)),
      customers: selectedCustomers.map((id) => sampleCustomers.find((c) => c.id === id).name),
      scheduledAt: `${scheduledDate} ${scheduledTime}`,
      autoSend,
    };

    setCampaigns([...campaigns, newCampaign]);
    setTitle("");
    setSelectedTemplate("");
    setSelectedCustomers([]);
    setScheduledDate("");
    setScheduledTime("");
    alert("Campaign created successfully!");
  };

  return (
    <div className="p-6 md:p-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Campaigns</h1>

      {/* Campaign Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Create Campaign</h2>

        {/* Title */}
        <div>
          <label className="font-semibold">Campaign Title:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Birthday Campaign"
          />
        </div>

        {/* Template Selection */}
        <div>
          <label className="font-semibold">Select Template:</label>
          <select
            className="w-full border rounded-lg p-2 mt-1"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">-- Select Template --</option>
            {sampleTemplates.map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        {/* Customer Selection */}
        <div>
          <label className="font-semibold">Select Customers:</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {sampleCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => toggleCustomer(customer.id)}
                className={`px-3 py-1 rounded-lg border ${
                  selectedCustomers.includes(customer.id) ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {customer.name}
              </button>
            ))}
          </div>
        </div>

        {/* Scheduled Date & Time */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <label className="font-semibold">Scheduled Date:</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="font-semibold">Scheduled Time:</label>
            <input
              type="time"
              className="w-full border rounded-lg p-2 mt-1"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>
        </div>

        {/* Auto Send */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoSend}
            onChange={(e) => setAutoSend(e.target.checked)}
            id="autoSend"
          />
          <label htmlFor="autoSend" className="font-semibold">Send Automatically</label>
        </div>

        <button
          onClick={handleCreateCampaign}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          <FiPlus /> Create Campaign
        </button>
      </div>

      {/* Campaign List */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Scheduled Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>No campaigns scheduled yet.</p>
        ) : (
          <div className="space-y-2">
            {campaigns.map((c) => (
              <div key={c.id} className="border rounded-lg p-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-gray-600 text-sm">
                    Template: {c.template.title} | Recipients: {c.customers.join(", ")}
                  </p>
                  <p className="text-gray-600 text-sm">Scheduled At: {c.scheduledAt} | Auto-send: {c.autoSend ? "Yes" : "No"}</p>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  <FiEdit />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;
