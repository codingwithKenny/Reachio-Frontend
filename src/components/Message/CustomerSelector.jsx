// CustomerSelector.jsx
import React from "react";

const CustomerSelector = ({ customers, selectedCustomers, toggleCustomer }) => (
  <div>
    <label className="font-semibold">Select Customers:</label>
    <div className="flex flex-wrap gap-2 mt-1">
      {customers.map((customer) => (
        <button
          key={customer.id}
          onClick={() => toggleCustomer(customer.id)}
          className={`px-3 py-1 rounded-lg border ${
            selectedCustomers.includes(customer.id)
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {customer.name}
        </button>
      ))}
    </div>
  </div>
);

export default CustomerSelector;
