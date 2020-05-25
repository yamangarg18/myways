import React from "react";

const CertificationContext = React.createContext();

export const CertificationProvider = ({ children }) => {
  return (
    <CertificationContext.Provider>{children}</CertificationContext.Provider>
  );
};
