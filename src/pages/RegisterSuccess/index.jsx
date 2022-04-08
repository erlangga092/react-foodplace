import React from "react";
import { Link } from "react-router-dom";
import { LayoutOne } from "upkit";
import SuccessRegister from "./success-register.svg";

export default function RegisterSuccess() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <LayoutOne size="medium">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-gray-800 font-bold text-4xl">Success Register</h1>

          <div className="my-10">
            <img
              src={SuccessRegister}
              width={300}
              height={300}
              alt="success-register"
            />
          </div>

          <Link to="/login">
            <button className="bg-red-600 text-white px-4 py-2">Login</button>
          </Link>
        </div>
      </LayoutOne>
    </div>
  );
}
