import React from "react";
import { createContext, useContext, useState } from "react";

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  return (
    <BusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);
