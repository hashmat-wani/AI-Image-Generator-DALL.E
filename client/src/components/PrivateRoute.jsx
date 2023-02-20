import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { pathname } = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: pathname }} replace />
  );
};

export default PrivateRoute;
