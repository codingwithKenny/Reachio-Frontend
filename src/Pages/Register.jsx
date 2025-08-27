import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserZodSchema } from "../utils";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  // React hook for easy validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserZodSchema),
    mode: "onChange", // ✅ validate while typing
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setServerError("");
      // SEND DATA TO BACKEND
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data
      );

      setSuccess("Registration successful! Redirecting...");
      setLoading(false);
      // REDIRECT TO LOGIN PAGE
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setLoading(false);
      setServerError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-lg">
        <img
          src={"/reachio.png"}
          alt="Reachio Logo"
          className="mx-auto mb-6 w-28"
        />
        <h2 className="text-3xl font-bold mb-2 text-center text-purple-700">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Start using Reachio to grow your business
        </p>
        {serverError && (
          <p className="text-red-500 mb-2 text-center">{serverError}</p>
        )}

        {success && <p className="text-green-500 mb-2">{success}</p>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-purple-400"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-purple-400"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-400"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex-1">
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phoneNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-400"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-400"
              }`}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 font-medium">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:shadow-lg transition w-full font-medium">
          <FcGoogle size={24} />
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
