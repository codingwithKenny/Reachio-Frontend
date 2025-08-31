import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../components/Common/Sidebar";
import Topbar from "../components/Common/Topbar";

export default function Dashboard() {
  const { businessId } = useParams(); // current selected business from URL
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // fetch businesses once
  useEffect(() => {
    if (!userId) return;

    const fetchBusinesses = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/business?userId=${userId}`
        );
        const data = await res.json();
        setBusinesses(data);

        // set selected business by ID from URL
        const selected = data.find((b) => b.id === parseInt(businessId));
        setSelectedBusiness(selected || null);
      } catch (err) {
        console.error("Error fetching businesses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [userId, businessId]);

  if (loading) return <div className="p-6">Loading business data...</div>;
  if (!selectedBusiness) return <div className="p-6">Business not found</div>;

  return (
    <div className="flex h-screen rounded-3xl bg-purple-100">
      <Sidebar
        businesses={businesses} // Pass list of businesses
        setBusinesses={setBusinesses} // Pass setter so Sidebar can update
        businessId={selectedBusiness.id}
      />
      <div className="flex-1 flex flex-col overflow-hidden ml-20 md:ml-64">
        <div className="mt-2">
          <Topbar selectedBusiness={selectedBusiness} />
        </div>
        <main className="p-6 overflow-auto">
          {/* Pass selectedBusiness and setSelectedBusiness to all nested routes */}
          <Outlet context={{ selectedBusiness, setSelectedBusiness }} />
        </main>
      </div>
    </div>
  );
}
