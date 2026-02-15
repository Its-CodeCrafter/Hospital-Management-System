import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../utils/validations.js";
import { LuLoaderCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.png";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
export default function Login() {

  const {login} =useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const handleLoginData = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/auth/login`,
        data,
      );
      console.log(res);
      // if (res.data.statusText == "OK") {
      // if (res.data.error != "") {
      //   alert(res.data.error);

      // }
      // if (res.data) {
      login({ user: res?.data?.user, token: res?.data?.token });
      alert(res?.data?.message);
      // }
      // } else {
      //   alert(res.data.message);
      // }
    } catch (error) {
      alert(error.message);
    }
  };
  const onSubmit = (data) => {
    handleLoginData(data);
    reset();
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SECTION */}
      <div className="flex items-center justify-center bg-[#0b7285] px-4">
        <div className="w-full max-w-md bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl">
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
            SIGN IN
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Role */}
            <div>
              <select className="w-full rounded-xl border bg-gray-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0b7285]">
                <option>Employee</option>
                <option>Doctor</option>
                <option>Admin</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className={`w-full rounded-xl bg-gray-50 px-4 py-2 text-sm outline-none border focus:ring-2 focus:ring-[#0b7285]
                  ${errors?.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className={`w-full rounded-xl bg-gray-50 px-4 py-2 text-sm outline-none border focus:ring-2 focus:ring-[#0b7285]
                  ${errors?.password ? "border-red-500" : "border-gray-300"}`}
              />
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0b7285] hover:bg-[#095c6b] transition text-white font-medium px-6 py-2 rounded-lg flex items-center justify-center"
              >
                {isSubmitting ? (
                  <LuLoaderCircle size={20} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </button>

              <Link
                to="/forgot-password"
                className="text-gray-500 hover:text-[#0b7285]"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Footer */}
            <p className="text-center text-sm text-gray-500 pt-2">
              Already haven't an account?{" "}
              <Link
                to="/signup"
                className="text-[#0b7285] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative hidden lg:block">
        <img src={loginImage} alt="Doctor" className="h-full w-full object-cover" />

        {/* Logo */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="text-white font-bold text-xl">HIMS</span>
        </div>
      </div>
    </div>
  );
}
