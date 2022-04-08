import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import "upkit/dist/style.min.css";
import { listen } from "./app/listener";
import store from "./app/store";
import GuardRoute from "./components/GuardRoute";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import UserAddress from "./pages/UserAddress";
import UserAddressAdd from "./pages/UserAddressAdd";

export default function App() {
    useEffect(() => {
        listen();
    }, []);

    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path="/logout" element={<Logout />} />
                    <Route
                        path="/checkout"
                        element={
                            <GuardRoute>
                                <Checkout />
                            </GuardRoute>
                        }
                    />

                    <Route
                        path="/alamat-pengiriman/tambah"
                        element={
                            <GuardRoute>
                                <UserAddressAdd />
                            </GuardRoute>
                        }
                    />

                    <Route
                        path="/alamat-pengiriman"
                        element={
                            <GuardRoute>
                                <UserAddress />
                            </GuardRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <GuestOnlyRoute>
                                <Login />
                            </GuestOnlyRoute>
                        }
                    />

                    <Route
                        path="/register-success"
                        element={
                            <GuestOnlyRoute>
                                <RegisterSuccess />
                            </GuestOnlyRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <GuestOnlyRoute>
                                <Register />
                            </GuestOnlyRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <GuestOnlyRoute>
                                <Login />
                            </GuestOnlyRoute>
                        }
                    />

                    <Route path="/" element={<Home />} />
                </Routes>
            </HashRouter>
        </Provider>
    );
}
