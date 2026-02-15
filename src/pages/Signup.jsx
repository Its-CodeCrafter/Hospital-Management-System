import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../utils/validations.js";
import { LuLoaderCircle } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import loginLogo from "../assets/login.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Signup() {
  const { user, setUser, login } = useContext(AuthContext);
const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
  });

  const submitSignupData = async (data) => {
    console.log(data)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/auth/register`,
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
      if(res.data.user.role=="doctor"){
        navigate("/dashboard");
      }else{
        navigate("/")
      }
      // }
      // } else {
      //   alert(res.data.message);
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmit = (data) => {
    submitSignupData(data);
    reset();
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SECTION */}
      <div className="flex items-center justify-center bg-[#0b7285] px-4">
        <div className="w-full max-w-md bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl">
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
            CREATE ACCOUNT
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                {...register("name")}
                placeholder="Full Name"
                className={`w-full rounded-xl bg-gray-50 px-4 py-2 text-sm outline-none border focus:ring-2 focus:ring-[#0b7285]
                  ${errors?.name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
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
            {/* Role */}
            <select
              {...register("role", { required: true })}
              defaultValue="employee"
              className="w-full rounded-xl border bg-gray-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0b7285]"
            >
              <option value="employee">Employee</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>

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

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className={`w-full rounded-xl bg-gray-50 px-4 py-2 text-sm outline-none border focus:ring-2 focus:ring-[#0b7285]
                  ${
                    errors?.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
              />
              {errors?.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0b7285] hover:bg-[#095c6b] transition text-white font-medium py-2 rounded-lg flex justify-center items-center"
            >
              {isSubmitting ? (
                <LuLoaderCircle size={20} className="animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#0b7285] font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative hidden lg:block">
        <img
          src={loginLogo}
          alt="Doctor"
          className="h-full w-full object-cover"
        />

        {/* Logo */}
        <div className="absolute top-6 right-6">
          <span className="text-white font-bold text-xl">HIMS</span>
        </div>
      </div>
    </div>
  );
}
