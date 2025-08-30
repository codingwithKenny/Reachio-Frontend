import React from "react";

const WelcomeSection = ({ selectedBusiness }) => {
  return (
    <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="w-full md:w-auto text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold">Hello, Ridwat! 👋</h1>
        <p className="mt-1 italic">
          You are managing: <span className="font-semibold">{selectedBusiness?.name}</span>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto justify-center md:justify-start">
        <button className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition w-full sm:w-auto">
          Add Customer
        </button>
        <button className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition w-full sm:w-auto">
          New Campaign
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
