import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
