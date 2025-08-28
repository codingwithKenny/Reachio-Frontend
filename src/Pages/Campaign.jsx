import React, { useState } from "react";
import CampaignForm from "../components/Campaign/CampaignForm";
import CampaignCard from "../components/Campaign/CampaignCard";
import CampaignGuidance from "../components/Campaign/CampaignGuidance";


// Sample data (same structure you used)
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
    if (!selectedTemplate || !scheduledTime || selectedCustomers.length === 0) {
      alert("Fill all fields and select at least one customer.");
      return;
    }

    const payload = {
      id: editingCampaign ? editingCampaign.id : campaigns.length + 1,
      title: sampleTemplates.find((t) => t.id === selectedTemplate).title,
      customers: selectedCustomers.map(
        (id) => sampleCustomers.find((c) => c.id === id).name
      ),
      time: scheduledTime,
      autoSend,
    };

    if (editingCampaign) {
      setCampaigns((prev) => prev.map((c) => (c.id === editingCampaign.id ? payload : c)));
      alert("Campaign updated successfully!");
    } else {
      setCampaigns((prev) => [...prev, payload]);
      alert("Campaign created successfully!");
    }

    resetForm();
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setSelectedTemplate(sampleTemplates.find((t) => t.title === campaign.title).id);
    setSelectedCustomers(
      campaign.customers.map((name) => sampleCustomers.find((c) => c.name === name).id)
    );
    setScheduledTime(campaign.time);
    setAutoSend(campaign.autoSend);
  };

  const handleDeleteCampaign = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-6">
      {/* Guidance */}
      <CampaignGuidance />

      {/* Form */}
      <CampaignForm
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        selectedCustomers={selectedCustomers}
        setSelectedCustomers={setSelectedCustomers}
        scheduledTime={scheduledTime}
        setScheduledTime={setScheduledTime}
        autoSend={autoSend}
        setAutoSend={setAutoSend}
        handleSubmit={handleCreateOrUpdateCampaign}
        editingCampaign={editingCampaign}
        templateOptions={templateOptions}
        customerOptions={customerOptions}
      />

      {/* Cards in a Box */}
      <div className="rounded-2xl p-4 md:p-6 shadow-inner bg-purple-100 border border-gray-200">
        <h3 className="font-semibold text-sm md:text-lg mb-4 text-gray-800">
          Your Campaigns
        </h3>

        {campaigns.length === 0 ? (
          <div className="text-gray-500 text-center text-sm md:text-base py-6">
            No campaigns yet. Create one above to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((c) => (
              <CampaignCard
                key={c.id}
                campaign={c}
                handleEdit={handleEditCampaign}
                handleDelete={handleDeleteCampaign}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;
