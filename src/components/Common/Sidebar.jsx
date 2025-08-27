import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiLayers,
  FiMail,
  FiBriefcase,
  FiFileText,
  FiLogOut,
  FiPlus,
  FiChevronDown,
} from "react-icons/fi";

export default function Sidebar() {
    const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([
    "My First Business",
    "Second Biz",
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newBusiness, setNewBusiness] = useState("");

  const handleAddBusiness = () => {
    if (newBusiness.trim() && !businesses.includes(newBusiness.trim())) {
      setBusinesses([...businesses, newBusiness.trim()]);
      setNewBusiness("");
      setShowModal(false);
    }
  };
  function handleLogout() {
  // 1. Remove any authentication tokens or user info
  localStorage.removeItem("authToken"); // or whatever key you use
  sessionStorage.removeItem("authToken");

  // 2. Optionally clear other user-related data
  localStorage.removeItem("userData");

  // 3. Redirect the user to login page
  navigate("/login");
}

  return (
    <aside
  className="fixed top-0 left-0 w-20 md:w-64 bg-gradient-to-b from-[#9300ff] to-[#90dfe3] 
  h-[98%] rounded-3xl flex flex-col p-4 mt-2 ml-2 mb-2 md:p-6 shadow-xl z-40"
>
  {/* Logo */}
  <div className="mb-8 flex justify-between items-center">
    <h1 className="text-xl md:text-2xl font-extrabold italic text-white tracking-wider text-center md:text-left w-full drop-shadow">
      <span className="text-white">R</span>
      <span className="hidden md:inline">eachio</span>
    </h1>
  </div>

  {/* Businesses Dropdown */}
  <div className="mb-6">
    <button
      onClick={() => setShowDropdown(!showDropdown)}
      className="w-full flex items-center justify-center md:justify-between px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
    >
      <span className="flex items-center gap-3">
        <FiBriefcase />
        <span className="hidden md:inline">Businesses</span>
      </span>
      <FiChevronDown
        className={`hidden md:block transition-transform ${
          showDropdown ? "rotate-180" : ""
        }`}
      />
    </button>

    {showDropdown && (
      <div className="ml-0 md:ml-4 mt-3 flex flex-col gap-2 p-3 rounded-xl bg-white/10 shadow-inner border border-white/20">
        {/* List of businesses */}
        <Link
          to="/dashboard/businesses/my-first-business"
          className="flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg text-sm font-medium italic text-purple-900 bg-white shadow-md hover:shadow-lg hover:bg-purple-100 transition-all duration-200"
        >
          <FiBriefcase size={14} className="text-purple-600" />
          <span className="hidden md:inline">My First Business</span>
        </Link>

        <Link
          to="/dashboard/businesses/second-biz"
          className="flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg text-sm font-medium italic text-purple-900 bg-white shadow-md hover:shadow-lg hover:bg-purple-100 transition-all duration-200"
        >
          <FiBriefcase size={14} className="text-purple-600" />
          <span className="hidden md:inline">Second Biz</span>
        </Link>

        {/* Add New Business button inside dropdown */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg text-sm font-medium italic text-purple-900 bg-purple-500 hover:bg-purple-600 text-white transition-all shadow-md"
        >
          <FiPlus size={14} />
          <span className="hidden md:inline">Add New Business</span>
        </button>
      </div>
    )}
  </div>

  {/* Navigation */}
  <nav className="flex flex-col mt-6 gap-2 flex-1">
    <Link
      to="/dashboard"
      className="flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
    >
      <FiHome />
      <span className="hidden md:inline">Home</span>
    </Link>

    <Link
      to="/dashboard/customers"
      className="flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
    >
      <FiUsers />
      <span className="hidden md:inline">Customers</span>
    </Link>

    <Link
      to="/dashboard/campaigns"
      className="flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
    >
      <FiLayers />
      <span className="hidden md:inline">Campaigns</span>
    </Link>

    <Link
      to="/dashboard/templates"
      className="flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
    >
      <FiFileText />
      <span className="hidden md:inline">Templates</span>
    </Link>

    <Link
      to="/dashboard/messages"
      className="flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
    >
      <FiMail />
      <span className="hidden md:inline">Messages</span>
    </Link>
  </nav>

  {/* Logout */}
  <button
    className="mt-6 bg-purple-500 px-2 md:px-4 py-2 rounded-lg text-white flex items-center justify-center md:justify-start gap-3 font-semibold italic hover:bg-purple-600 transition-all shadow-md"
    onClick={handleLogout}
  >
    <FiLogOut size={18} />
    <span className="hidden md:inline">Logout</span>
  </button>

  {/* Add Business Modal */}
  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm md:max-w-md shadow-2xl animate-fadeIn">
        <h2 className="text-lg font-bold mb-4 text-purple-600">
          Add New Business
        </h2>
        <input
          type="text"
          value={newBusiness}
          onChange={(e) => setNewBusiness(e.target.value)}
          placeholder="Business name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddBusiness}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )}
</aside>

  );
}
