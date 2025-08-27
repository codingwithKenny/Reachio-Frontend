import React, { useState } from "react";
import { FiEdit, FiMessageSquare } from "react-icons/fi";
import EditCustomerModal from "./EditCustomerModal";

const CustomerRow = ({ customer, onUpdate }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center md:text-left py-2 border-b items-center">
        <span>{customer.name}</span>
        <span>{customer.email}</span>
        <span>{customer.phone}</span>
        <span
          className={`font-semibold ${
            customer.status === "Active" ? "text-green-600" : "text-red-600"
          }`}
        >
          {customer.status}
        </span>
        <span className="flex justify-center md:justify-start gap-2">
          <button
            className="text-purple-600 hover:text-purple-800"
            onClick={() => setIsEditOpen(true)}
          >
            <FiEdit />
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            <FiMessageSquare />
          </button>
        </span>
      </div>

      {/* Edit Modal */}
      <EditCustomerModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        customer={customer}
        onSubmit={onUpdate}
      />
    </>
  );
};

export default CustomerRow;
