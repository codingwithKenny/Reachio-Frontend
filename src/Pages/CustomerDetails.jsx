import React, { useState, useEffect } from "react";
import CustomerList from "../components/Customer/CustomerList";
import CustomerStatsCards from "../components/Customer/CustomerStatsCards";
import AddCustomerModal from "../components/Customer/AddCustomerModal";
import { useParams } from "react-router-dom";

const CustomerDetails = ({ selectedBusinessId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
      const { businessId } = useParams(); // 👈 current business from URL


  // Fetch customers for selected business
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/customers?businessId=${businessId}`
        );
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedBusinessId) fetchCustomers();
  }, [selectedBusinessId]);

  // Add new customer
  const handleAddCustomer = async (customerData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData,businessId),
      });
      const newCustomer = await res.json();
      setCustomers((prev) => [...prev, newCustomer]); // add to list
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };

  // Stats
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.active !== false).length,
    inactive: customers.filter(c => c.active === false).length,
    recent: customers.slice(-5).length,
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
      <CustomerList customers={customers} loading={loading} />

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
