import HiEye from "@meronex/icons/hi/HiEye";
import HiEyeOff from "@meronex/icons/hi/HiEyeOff";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, FormControl, InputText, LayoutOne } from "upkit";
import { login } from "../../api/auth";
import StoreLogo from "../../components/StoreLogo";
import { userLogin } from "../../features/Auth/actions";
import { rules } from "./validation";

// status state
const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [status, setStatus] = useState(() => statusList.idle);
  const [isShowPassword, setShowPassword] = useState(() => false);

  const onSubmit = async ({ email, password }) => {
    setStatus(statusList.process);

    let { data } = await login(email, password);

    if (data.error) {
      setError("password", {
        type: "invalidCredential",
        message: data.message,
      });

      setStatus(statusList.error);
      return;
    } else {
      let { user, token } = data;
      dispatch(userLogin(user, token));

      navigate("/");
    }

    setStatus(statusList.success);
  };

  return (
    <div className="register-container min-h-screen flex items-center justify-center">
      <LayoutOne size="medium">
        <div className="text-center mb-5">
          <StoreLogo />
        </div>

        <Card color="white">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    onClick={() => setShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <HiEye /> : <HiEyeOff />}
                  </div>
                }
              />
            </FormControl>

            <button
              className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2"
              disabled={status === statusList.process}
            >
              {status === statusList.process ? "Loading" : "Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            Belum punya akun?{" "}
            <Link to="/register">
              <b>Daftar Sekarang</b>
            </Link>
          </div>
        </Card>
      </LayoutOne>
    </div>
  );
}
