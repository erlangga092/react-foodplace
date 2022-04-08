import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonCircle, Responsive } from "upkit";
import StoreLogo from "../StoreLogo";

export default function TopBar() {
  let auth = useSelector((state) => state.auth);

  return (
    <Responsive desktop={2} justify="between" items="center">
      <div>
        <StoreLogo textSize="text-3xl" />
      </div>

      <div className="mr-5 text-right">
        <Link to={auth.user ? "/account" : "/login"}>
          <div className="mr-2 inline-block text-red-600 font-bold">
            {auth?.user?.full_name}
          </div>
          <ButtonCircle />
        </Link>
      </div>
    </Responsive>
  );
}
