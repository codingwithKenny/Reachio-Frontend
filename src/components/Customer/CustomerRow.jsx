import React, { useState } from "react";
import { FiEdit, FiMessageSquare } from "react-icons/fi";
import EditCustomerModal from "./EditCustomerModal";
import SendMessageModal from "../Message/SendMessageModal";

const CustomerRow = ({ customer, onUpdate, index }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false); // ✅ for message modal

  return (
    <>
      <div
        className={`bg-white rounded-xl shadow-md p-4 md:p-3 grid grid-cols-1 md:grid-cols-5 items-center gap-4 transition-all duration-200 hover:shadow-lg ${
          index % 2 === 0 ? "md:bg-gray-50" : "md:bg-white"
        }`}
      >
        {/* Mobile view */}
        <div className="md:hidden flex flex-col gap-1">
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Name:</span>
            <span>{customer.name}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Email:</span>
            <span>{customer.email || "-"}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Phone:</span>
            <span>{customer.phoneNumber}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                customer.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {customer.status}
            </span>
          </div>
        </div>

        {/* Desktop view */}
        <span className="hidden md:inline text-gray-800">{customer.name}</span>
        <span className="hidden md:inline text-gray-600">{customer.email || "-"}</span>
        <span className="hidden md:inline text-gray-600">{customer.phoneNumber}</span>
        <span className="hidden md:inline">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              customer.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {customer.status}
          </span>
        </span>

        {/* Actions */}
        <span className="flex justify-end md:justify-start gap-3">
          {/* Edit */}
          <button
            className="text-purple-600 hover:text-purple-800 transition"
            onClick={() => setIsEditOpen(true)}
          >
            <FiEdit size={18} />
          </button>

          {/* Message */}
          <button
            className="text-blue-600 hover:text-blue-800 transition"
            onClick={() => setIsMessageOpen(true)}
          >
            <FiMessageSquare size={18} />
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

      {/* Send Message Modal */}
      <SendMessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        customer={customer}
      />
    </>
  );
};

export default CustomerRow;
