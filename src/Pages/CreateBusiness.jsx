import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateBusiness() {
  const [newBusiness, setNewBusiness] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleSaveBusiness = async () => {
    if (!newBusiness.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/business", {
        name: newBusiness.trim(),
        userId: user.id,
      });

      // Redirect to the new business home
      navigate(`/dashboard/businesses/${res.data.id}/home`);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl animate-fadeIn">
        <h1 className="text-2xl font-bold text-purple-600 mb-4">Create Your Business</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          value={newBusiness}
          onChange={(e) => setNewBusiness(e.target.value)}
          placeholder="Business Name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveBusiness}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
