import React from "react";
import { ButtonCircle } from "upkit";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full t-0 l-0 h-16 bg-red-600 fixed z-20 flex justify-between px-8 items-center border-b border-white">
      <div className="brand">
        <Link to="/">
          <h1 className="text-white font-bold text-2xl">FOOD STORE</h1>
        </Link>
      </div>
      <div className="account">
        <Link to="/logout">
          <ButtonCircle color="white" />
        </Link>
      </div>
    </div>
  );
}
