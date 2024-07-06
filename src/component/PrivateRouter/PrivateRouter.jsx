import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const isLogged = localStorage.getItem("token");

  return isLogged ? children : <Navigate to="/" />;
};

export default PrivateRouter;
