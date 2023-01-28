import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { useStateContext } from "../context";

const RequireAuth = ({ children }) => {
  const { user } = useStateContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
