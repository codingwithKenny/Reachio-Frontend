import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import WelcomeSection from "../components/Home/WelcomeSection";
import StatsCards from "../components/Home/StatsCards";
import QuickActions from "../components/Home/QuickActions";
import RecentActivity from "../components/Home/RecentActivity";
import CustomerChart from "../components/Home/CustomerChart";
import ReachCredits from "../components/Home/ReachCredits";

const Home = () => {
  const { selectedBusiness } = useOutletContext(); // ✅ get from Dashboard

  const [reachCredits, setReachCredits] = useState({ used: 120, total: 500 });
  const [stats] = useState({
    customers: 124,
    campaigns: 5,
    messages: 12,
    revenue: 8500,
  });
  const [chartData] = useState([
    { day: "Mon", customers: 5 },
    { day: "Tue", customers: 8 },
    { day: "Wed", customers: 12 },
    { day: "Thu", customers: 7 },
    { day: "Fri", customers: 10 },
    { day: "Sat", customers: 6 },
    { day: "Sun", customers: 9 },
  ]);

  const handleBuyCredits = () => alert("Redirect to purchase page or open payment modal");

  return (
    <div className="p-6 md:p-10 space-y-6">
      <WelcomeSection selectedBusiness={selectedBusiness} />
      <ReachCredits reachCredits={reachCredits} handleBuyCredits={handleBuyCredits} />
      <StatsCards stats={stats} />
      <CustomerChart chartData={chartData} />
      <RecentActivity />
      <QuickActions />
    </div>
  );
};

export default Home;
