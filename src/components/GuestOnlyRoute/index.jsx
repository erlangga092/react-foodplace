import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuestOnlyRoute(props) {
  const user = useSelector((state) => state.auth);

  return user.user === null ? props.children : <Navigate replace to="/" />;
}
