import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import CustomerDetails from "./Pages/CustomerDetails";
import Messages from "./Pages/Messages";
import Leaflet from "./Pages/Leaflet";
import Campaign from "./Pages/Campaign";
import Template from "./Pages/Template";
import NotFound from "./pages/NotFound";

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard /> {/* Your Dashboard already has <Outlet /> */}
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="customers" element={<CustomerDetails />} />
          <Route path="messages" element={<Messages />} />
          <Route path="leaflet" element={<Leaflet />} />
          <Route path="campaigns" element={<Campaign />} />
          <Route path="templates" element={<Template />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
