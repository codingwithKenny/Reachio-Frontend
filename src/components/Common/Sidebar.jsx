import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  FiMenu,
} from "react-icons/fi";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";

export default function Sidebar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [businesses, setBusinesses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newBusiness, setNewBusiness] = useState("");
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  // For delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);
    const { businessId } = useParams(); // 👈 current business from URL


  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/business?userId=${userId}`
        );
        setBusinesses(res.data || []);
      } catch (err) {
        console.error("Failed to load businesses:", err);
        setBusinesses([]);
      }
    };
    fetchBusinesses();
  }, [userId]);

  // Add or Update Business
  const handleSaveBusiness = async () => {
    if (!newBusiness.trim()) return;
    try {
      if (editingBusiness) {
        const res = await axios.put(
          `http://localhost:5000/api/business/${editingBusiness.id}`,
          { name: newBusiness.trim() }
        );
        setBusinesses((prev) =>
          prev.map((b) => (b.id === editingBusiness.id ? res.data : b))
        );
      } else {
        const res = await axios.post("http://localhost:5000/api/business", {
          name: newBusiness.trim(),
          userId: parseInt(user.id),
        });
        setBusinesses((prev) => [...prev, res.data]);
        setTimeout(() => {
          dropdownRef.current?.scrollTo({
            top: dropdownRef.current.scrollHeight,
          });
        }, 10);
      }
      setNewBusiness("");
      setEditingBusiness(null);
      setShowModal(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  // Delete Business
  const handleDeleteBusiness = async () => {
    if (!businessToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/business/${businessToDelete.id}`);
      setBusinesses((prev) => prev.filter((b) => b.id !== businessToDelete.id));
      setIsDeleteModalOpen(false);
      setBusinessToDelete(null);
    } catch (err) {
      alert("Failed to delete business");
    }
  };

  const handleEditBusiness = (business) => {
    setEditingBusiness(business);
    setNewBusiness(business.name);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-[98%] mt-2 ml-2 mb-2 rounded-3xl bg-gradient-to-b from-[#9300ff] to-[#90dfe3] shadow-xl flex flex-col p-4 md:p-6 z-40 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 text-white text-xl flex items-center justify-center hover:text-purple-200 transition md:hidden"
      >
        <FiMenu />
      </button>

      {/* Logo */}
      <div
        className={`mb-8 flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <h1 className="text-xl md:text-2xl font-extrabold italic text-white tracking-wider drop-shadow">
          <span>R</span>
          {!collapsed && <span className="ml-1">eachio</span>}
        </h1>
      </div>

      {/* Businesses Dropdown */}
      <div className="mb-6">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300`}
        >
          <span className="flex items-center gap-3">
            <FiBriefcase />
            {!collapsed && <span>Businesses</span>}
          </span>
          {!collapsed && (
            <FiChevronDown
              className={`transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {showDropdown && !collapsed && (
          <div
            ref={dropdownRef}
            className="ml-0 md:ml-4 mt-3 flex flex-col gap-2 p-3 rounded-xl bg-white/10 shadow-inner border border-white/20 max-h-32 overflow-y-auto"
          >
            {businesses.length === 0 ? (
              <p className="text-sm text-white/70 italic">No businesses found.</p>
            ) : (
              businesses.map((business) => (
                <div
                  key={business.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium italic text-purple-900 bg-white shadow-md hover:shadow-lg hover:bg-purple-100 transition-all duration-200"
                >
                  <Link
                    to={`/dashboard/businesses/${business.id}/home`}
                    className="flex items-center gap-2 flex-1"
                  >
                    <FiBriefcase size={14} className="text-purple-600" />
                    <span>{business.name}</span>
                  </Link>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => handleEditBusiness(business)}
                      className="text-blue-500 hover:text-blue-700 p-1 rounded transition"
                      title="Edit"
                    >
                      <FiEdit size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setBusinessToDelete(business);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition"
                      title="Delete"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
            <button
              onClick={() => {
                setEditingBusiness(null);
                setNewBusiness("");
                setShowModal(true);
              }}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium italic text-purple-900 bg-purple-500 hover:bg-purple-600 text-white transition-all shadow-md"
            >
              <FiPlus size={14} />
              {!collapsed && <span>Add New Business</span>}
            </button>
          </div>
        )}
      </div>

     {/* Navigation */}
<nav className="flex flex-col mt-6 gap-2 flex-1">
  <Link
    to={`/dashboard/businesses/${businessId}/home`}
    className={`flex items-center ${
      collapsed ? "justify-center" : "justify-start"
    } gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300`}
  >
    <FiHome />
    {!collapsed && <span>Home</span>}
  </Link>

  <Link
    to={`/dashboard/businesses/${businessId}/customers`}
    className={`flex items-center ${
      collapsed ? "justify-center" : "justify-start"
    } gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300`}
  >
    <FiUsers />
    {!collapsed && <span>Customers</span>}
  </Link>

  <Link
    to={`/dashboard/businesses/${businessId}/campaigns`}
    className={`flex items-center ${
      collapsed ? "justify-center" : "justify-start"
    } gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300`}
  >
    <FiLayers />
    {!collapsed && <span>Campaigns</span>}
  </Link>

  <Link
    to={`/dashboard/businesses/${businessId}/templates`}
    className={`flex items-center ${
      collapsed ? "justify-center" : "justify-start"
    } gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300`}
  >
    <FiFileText />
    {!collapsed && <span>Templates</span>}
  </Link>

  <Link
    to={`/dashboard/businesses/${businessId}/messages`}
    className={`flex items-center ${
      collapsed ? "justify-center" : "justify-start"
    } gap-3 px-3 md:px-5 py-3 rounded-xl font-semibold italic text-white hover:bg-white hover:text-purple-600 transition-all duration-300`}
  >
    <FiMail />
    {!collapsed && <span>Messages</span>}
  </Link>
</nav>


      {/* Logout */}
      <button
        className={`mt-6 bg-purple-500 px-2 md:px-4 py-2 rounded-lg text-white flex items-center ${
          collapsed ? "justify-center" : "justify-start"
        } gap-3 font-semibold italic hover:bg-purple-600 transition-all shadow-md`}
        onClick={handleLogout}
      >
        <FiLogOut size={18} />
        {!collapsed && <span>Logout</span>}
      </button>

      {/* Add / Edit Business Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm md:max-w-md shadow-2xl animate-fadeIn">
            <h2 className="text-lg font-bold mb-4 text-purple-600">
              {editingBusiness ? "Edit Business" : "Add New Business"}
            </h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <input
              type="text"
              value={newBusiness}
              onChange={(e) => setNewBusiness(e.target.value)}
              placeholder="Business name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingBusiness(null);
                  setNewBusiness("");
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBusiness}
                className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
              >
                {editingBusiness ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteBusiness}
        title="Delete Business"
        message={`Are you sure you want to delete "${
          businessToDelete?.name || "this business"
        }"? This action cannot be undone.`}
      />
    </aside>
  );
}
