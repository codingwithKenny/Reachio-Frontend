import React from "react";
import CustomerRow from "./CustomerRow";

const CustomerList = ({ customers, onUpdate, loading }) => {
  if (loading)
    return (
      <p className="text-center text-gray-500 py-10 text-lg">Loading customers...</p>
    );
  if (!customers || customers.length === 0)
    return (
      <p className="text-center text-gray-500 py-10 text-lg">No customers found.</p>
    );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer List</h2>

      {/* Table header for desktop */}
      <div className="hidden md:grid grid-cols-5 gap-4 text-left font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-3 uppercase tracking-wider">
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-3">
        {customers.map((customer, index) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
            onUpdate={onUpdate}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
