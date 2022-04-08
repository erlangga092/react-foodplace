import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuardRoute(props) {
  const user = useSelector((state) => state.auth);

  return user ? props.children : <Navigate replace to="/login" />;
}
