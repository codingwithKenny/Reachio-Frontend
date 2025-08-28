import React, { useEffect, useRef, useState } from "react";
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
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import axios from "axios";

export default function Sidebar() {
     const navigate = useNavigate();
       const dropdownRef = useRef(null);


  // keep businesses from backend
  const [businesses, setBusinesses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newBusiness, setNewBusiness] = useState("");
  const [error, setError] =useState('')

  // Example: get userId from localStorage (after login you probably store it)
  const user = JSON.parse(localStorage.getItem("user"));
// console.log(user.id); // now it should log 7
const userId = user.id


  // Load existing businesses when sidebar mounts
useEffect(() => {
  const fetchBusinesses = async () => {
    if (!userId) return; // skip if no userId

    try {
      const res = await axios.get(`http://localhost:5000/api/business?userId=${userId}`);
      if (res.data && res.data.length > 0) {
        setBusinesses(res.data);
      } else {
        setBusinesses([]);
        console.log("No businesses found for this user.");
      }
    } catch (err) {
      console.error("Failed to load businesses:", err);
      setBusinesses([]); // ensure UI doesn't break
    }
  };

  fetchBusinesses();
}, [userId]);



  // Add new business
const handleAddBusiness = async () => {
  if (newBusiness.trim()) {
    try {
      const res = await axios.post("http://localhost:5000/api/business", {
        name: newBusiness.trim(),
        userId: parseInt(user.id),
      });

      // update UI
      setBusinesses((prev) => [...prev, res.data]);
      setNewBusiness("");
      setShowModal(false);
      setError(""); // clear any previous error

      setTimeout(() => {
        if (dropdownRef.current) {
          dropdownRef.current.scrollTop = dropdownRef.current.scrollHeight;
        }
      }, 10);
    } catch (err) {
      // Get message from backend response
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong");
      }
    }
  }
};



  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("token");
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
  <div
  ref={dropdownRef}
      className="ml-0 md:ml-4 mt-3 flex flex-col gap-2 p-3 rounded-xl bg-white/10 shadow-inner border border-white/20 max-h-32 overflow-y-auto">    {/* List of businesses */}
    {businesses.length === 0 ? (
      <p className="text-sm text-white/70 italic">No businesses found.</p>
    ) : (
 businesses.map((biz) => (
  <div
    key={biz.id}
    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium italic text-purple-900 bg-white shadow-md hover:shadow-lg hover:bg-purple-100 transition-all duration-200"
  >
    {/* Business name and link */}
    <Link
      to={`/dashboard/businesses/${biz.id}`}
      className="flex items-center gap-2 flex-1"
    >
      <FiBriefcase size={14} className="text-purple-600" />
      <span className="hidden md:inline">{biz.name}</span>
    </Link>

    {/* Small edit/delete icons on the same card */}
    <div className="flex gap-1 ml-2">
      <button
        onClick={() => handleEditBusiness(biz.id)}
        className="text-blue-500 hover:text-blue-700 p-1 rounded transition"
        title="Edit Business"
      >
        <FiEdit size={14} />
      </button>

      <button
        onClick={() => handleDeleteBusiness(biz.id)}
        className="text-red-500 hover:text-red-700 p-1 rounded transition"
        title="Delete Business"
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  </div>
))



    )}

    {/* Add New Business button */}
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
        {error && (
  <p className="text-red-500 text-sm mb-2">{error}</p>
)}
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
