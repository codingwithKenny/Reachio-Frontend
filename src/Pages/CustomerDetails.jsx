import React, { useState } from "react";
import CustomerList from "../components/Customer/CustomerList";
import CustomerStatsCards from "../components/Customer/CustomerStatsCards";
import AddCustomerModal from "../components/Customer/AddCustomerModal";



const CustomerDetails = ({ selectedBusinessId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCustomer = (customerData) => {
    console.log("Send to backend:", customerData);
    // Call your API or Prisma function to save customer
  };

  const stats = {
    total: 124,
    active: 98,
    inactive: 26,
    recent: 5,
  };

  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Customers</h1>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <CustomerStatsCards stats={stats} />

      {/* Customer List */}
      <CustomerList/>
      {/* ... your customer table here ... */}

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCustomer}
        selectedBusinessId={selectedBusinessId}
      />
    </div>
  );
};

export default CustomerDetails;
