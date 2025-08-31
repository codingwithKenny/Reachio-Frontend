import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError("");

      const response = await axios.post("http://localhost:5000/api/auth/login", data);
      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Fetch user's businesses
      const res = await axios.get(`http://localhost:5000/api/business?userId=${user.id}`);
      const businesses = res.data || [];

      if (businesses.length === 0) {
        // First-time login → redirect to modal page
        navigate("/create-business");
      } else {
        // Redirect to first business
        navigate(`/dashboard/businesses/${businesses[0].id}/home`);
      }
    } catch (err) {
      setServerError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
  <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md backdrop-blur-md bg-opacity-90">
    <img src={"/reachio.png"} alt="Reachio Logo" className="mx-auto mb-6 w-28" />
    <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
      Welcome Back
    </h2>
    <p className="text-center text-gray-600 mb-6">
      Log in to continue using Reachio
    </p>

    {serverError && <p className="text-red-500 text-center mb-2">{serverError}</p>}

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
        className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>

    <div className="flex items-center my-4">
      <hr className="flex-grow border-gray-300" />
      <span className="mx-2 text-gray-500 font-medium">OR</span>
      <hr className="flex-grow border-gray-300" />
    </div>

    <button className="flex w-full items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:shadow-md transition">
      <FcGoogle size={24} />
      Sign in with Google
    </button>

    <p className="mt-6 text-center text-gray-700">
      Don't have an account?{" "}
      <Link
        to="/register"
        className="text-purple-600 font-semibold hover:underline"
      >
        Register
      </Link>
    </p>
  </div>
</div>

  );
};

export default Login;
