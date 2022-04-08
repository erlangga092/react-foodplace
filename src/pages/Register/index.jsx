import HiEye from "@meronex/icons/hi/HiEye";
import HiEyeOff from "@meronex/icons/hi/HiEyeOff";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Card, FormControl, InputText, LayoutOne } from "upkit";
import { registerUser } from "../../api/auth";
import StoreLogo from "../../components/StoreLogo";
import { rules } from "./validation";

// status state
const statusList = {
    idle: "idle",
    process: "process",
    success: "success",
    error: "error",
};

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const navigate = useNavigate();

    const [status, setStatus] = useState(() => statusList.idle);
    const [isShowPassword, setShowPassword] = useState(() => false);
    const [isShowPasswordConfirmation, setShowPasswordConfirmation] = useState(
        () => false
    );

    const onSubmit = async (formData) => {
        let { password, password_confirmation } = formData;

        if (password !== password_confirmation) {
            setError("password_confirmation", {
                type: "equality",
                message: "Konfirmasi password tidak sesuai",
            });
            return;
        }

        setStatus(statusList.process);

        let { data } = await registerUser(formData);

        if (data.error) {
            let fields = Object.keys(data.fields);

            fields.forEach((field) => {
                setError(field, {
                    type: "server",
                    message: data.fields[field]?.properties?.message,
                });
            });

            setStatus(statusList.error);
            return;
        }

        setStatus(statusList.success);

        navigate("/register-success");
    };

    return (
        <div className="register-container min-h-screen flex items-center justify-center">
            <LayoutOne size="medium">
                <div className="text-center mb-5">
                    <StoreLogo />
                </div>

                <Card color="white">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl errorMessage={errors.full_name?.message}>
                            <InputText
                                name="full_name"
                                placeholder="Nama Lengkap"
                                fitContainer
                                {...register("full_name", rules.full_name)}
                            />
                        </FormControl>

                        <FormControl errorMessage={errors.email?.message}>
                            <InputText
                                name="email"
                                placeholder="Email Address"
                                fitContainer
                                {...register("email", rules.email)}
                            />
                        </FormControl>

                        <FormControl errorMessage={errors.password?.message}>
                            <InputText
                                name="password"
                                type={isShowPassword ? "text" : "password"}
                                placeholder="Password"
                                fitContainer
                                {...register("password", rules.password)}
                                iconAfter={
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setShowPassword(!isShowPassword)
                                        }
                                    >
                                        {isShowPassword ? (
                                            <HiEye />
                                        ) : (
                                            <HiEyeOff />
                                        )}
                                    </div>
                                }
                            />
                        </FormControl>

                        <FormControl
                            errorMessage={errors.password_confirmation?.message}
                        >
                            <InputText
                                name="password_confirmation"
                                type={
                                    isShowPasswordConfirmation
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Konfirmasi Password"
                                fitContainer
                                {...register(
                                    "password_confirmation",
                                    rules.password_confirmation
                                )}
                                iconAfter={
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                !isShowPasswordConfirmation
                                            )
                                        }
                                    >
                                        {isShowPasswordConfirmation ? (
                                            <HiEye />
                                        ) : (
                                            <HiEyeOff />
                                        )}
                                    </div>
                                }
                            />
                        </FormControl>

                        <button
                            className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2"
                            disabled={status === statusList.process}
                        >
                            {status === statusList.process
                                ? "Loading"
                                : "Register"}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        Sudah punya akun?{" "}
                        <Link to="/login">
                            <b>Masuk Sekarang</b>
                        </Link>
                    </div>
                </Card>
            </LayoutOne>
        </div>
    );
}
