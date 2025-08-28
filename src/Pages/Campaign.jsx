import React, { useState } from "react";
import CampaignForm from "../components/Campaign/CampaignForm";
import CampaignCard from "../components/Campaign/CampaignCard";


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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <CampaignCard
            key={c.id}
            campaign={c}
            handleEdit={handleEditCampaign}
            handleDelete={handleDeleteCampaign}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignPage;
