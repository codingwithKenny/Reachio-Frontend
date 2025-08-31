import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import CreateBusiness from "./Pages/CreateBusiness";

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

        {/* Protected create-business route */}
        <Route
          path="/create-business"
          element={
            <PrivateRoute>
              <CreateBusiness/>
            </PrivateRoute>
          }
        />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Default redirect if user just goes to /dashboard */}
          <Route index element={<Navigate to="businesses/1/home" replace />} />

          {/* Business-specific routes */}
          <Route path="businesses/:businessId/home" element={<Home />} />
          <Route
            path="businesses/:businessId/customers"
            element={<CustomerDetails />}
          />
          <Route path="businesses/:businessId/messages" element={<Messages />} />
          <Route path="businesses/:businessId/leaflet" element={<Leaflet />} />
          <Route
            path="businesses/:businessId/campaigns"
            element={<Campaign />}
          />
          <Route
            path="businesses/:businessId/templates"
            element={<Template />}
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
