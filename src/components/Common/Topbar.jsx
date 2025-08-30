import React from "react";

const Topbar = ({ selectedBusiness }) => {
  return (
    <header className="flex items-center justify-between bg-white p-4 rounded-2xl shadow">
      <h1 className="text-xl md:text-2xl font-bold">
        {selectedBusiness ? selectedBusiness.name : "No Business Selected"}
      </h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <div className="text-gray-600 font-semibold">Hello, Ridwat</div>
        <img
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Topbar;
