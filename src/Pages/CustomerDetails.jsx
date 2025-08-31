import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerStatsCards from "../components/Customer/CustomerStatsCards";
import CustomerList from "../components/Customer/CustomerList";
import AddCustomerModal from "../components/Customer/AddCustomerModal";
import { useParams } from "react-router-dom";

const CustomerDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // message to display
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const { businessId } = useParams();

  // Fetch customers for the business
  const fetchCustomers = async () => {
    if (!businessId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/customer?businessId=${businessId}`);
      setCustomers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch customers:", err.response || err);
      setMessage("Failed to load customers");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [businessId]);

  // Add new customer
  const handleAddCustomer = async (customerData) => {
    const dataToSend = { ...customerData, businessId: parseInt(businessId) };
    console.log("Sending customer data:", dataToSend);

    try {
      const res = await axios.post("http://localhost:5000/api/customer", dataToSend);
      setCustomers((prev) => [...prev, res.data]);
      setIsModalOpen(false);

      setMessage("Customer added successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to add customer";
      setMessage(errorMsg);
      setMessageType("error");
      console.error("Error adding customer:", err.response || err);
      setTimeout(() => setMessage(""), 3000);
    }
  };
 const handleUpdateCustomer = async (updatedCustomer) => {
  try {
    const { id, name, email, phoneNumber, birthday, businessId } = updatedCustomer;

    const res = await axios.put(`http://localhost:5000/api/customer/${id}`, {
      name,
      email,
      phoneNumber,
      birthday: birthday ? new Date(birthday) : null, // parse to Date
      businessId,
    });

    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? res.data : c))
    );

    setMessage("Customer updated successfully!");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  } catch (err) {
    console.error(err.response || err);
    setMessage("Failed to update customer");
    setMessageType("error");
    setTimeout(() => setMessage(""), 3000);
  }
};


  // Stats
  const stats = {
    total: customers.length,
    active: customers.length,
    inactive: 0,
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

      {/* Message */}
      {message && (
        <div
          className={`px-4 py-2 rounded-md font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Stats Cards */}
      <CustomerStatsCards stats={stats} />

      {/* Customer List */}
      <CustomerList customers={customers} loading={loading} onUpdate={handleUpdateCustomer} />

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
};

export default CustomerDetails;
