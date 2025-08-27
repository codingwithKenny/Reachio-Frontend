import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage"; // optional landing page
import Messages from "./pages/Messages";
import Leaflet from "./pages/Leaflet";
import NotFound from "./pages/NotFound";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import CustomerDetails from "./Pages/CustomerDetails";
import Dashboard from "./Pages/Dashboard";
import Template from "./Pages/Template";
import Campaign from "./Pages/Campaign";

// privateRoute- wrapper for protected route(DASHBORD)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token; // true if token exists
  return isLoggedIn ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing / public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
 
        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
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
