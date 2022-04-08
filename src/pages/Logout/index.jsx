import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { LayoutOne } from "upkit";
import { logout } from "../../api/auth";
import { userLogout } from "../../features/Auth/actions";
import { clearItems } from "../../features/Cart/actions";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        logout()
            .then(() => dispatch(userLogout()))
            .then(() => dispatch(clearItems()))
            .then(() => navigate("/login"));
    }, [navigate, dispatch]);

    return (
        <LayoutOne>
            <div className="text-center flex flex-col justify-center items-center">
                <BounceLoader color="red" />
                <br />
                Logout ...
            </div>
        </LayoutOne>
    );
}
