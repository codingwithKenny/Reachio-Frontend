import React, { useState } from "react";
import CustomerRow from "./CustomerRow";

const CustomerList = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+234 801 234 5678",
      status: "Active",
      birthday: "1990-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+234 802 345 6789",
      status: "Inactive",
      birthday: "1992-03-14",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+234 803 456 7890",
      status: "Active",
      birthday: "1988-07-21",
    },
  ]);

  const handleUpdate = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Customer List</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center md:text-left font-semibold text-gray-700 border-b pb-2 mb-2">
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {/* Customer Rows */}
      {customers.map((customer) => (
        <CustomerRow
          key={customer.id}
          customer={customer}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default CustomerList;
