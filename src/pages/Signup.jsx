import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
// import { supabase } from '../lib/supabaseClient';

const Signup = ({ setAuth }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // 1. Send data to YOUR backend (Port 5000)
      const response = await fetch(
        "https://skillswap-api-7ysx.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const parseRes = await response.json();

      if (response.ok) {
        // Success!

        localStorage.setItem("token", parseRes.token);
        setAuth(true);

        console.log("User Created:", parseRes);
        alert("Account Created Successfully!");
        navigate("/login");
      } else {
        // Error from server (like "User already exists")
        setError(parseRes);
      }
    } catch (err) {
      console.error(err.message);
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-12 flex items-center justify-center px-4 relative overflow-hidden bg-slate-950">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Simple Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-500 font-bold mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Form Card */}
        <div className="bg-slate-900 border-2 border-slate-800 p-8 shadow-[8px_8px_0px_rgba(16,185,129,1)]">
          <div className="mb-6">
            <h2 className="text-3xl font-black uppercase italic text-white mb-2">
              Create Identity
            </h2>
            <p className="text-slate-400">Join the hybrid economy today.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border-2 border-red-500 p-4 flex items-center gap-3 text-red-500 font-bold text-sm">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-slate-300 font-bold text-sm uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white font-medium focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-700"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-300 font-bold text-sm uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white font-medium focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-700"
                placeholder="user@example.com"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 font-bold text-sm uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white font-medium focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-700"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-300 font-bold text-sm uppercase mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white font-medium focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-700"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-slate-950 font-black uppercase italic tracking-wider py-4 border-2 border-emerald-400 hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              {loading ? "Creating Account..." : "Initialize Account"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800 pt-6">
            <p className="text-slate-500 text-sm">
              Already have an ID?{" "}
              <Link
                to="/login"
                className="text-emerald-500 font-bold hover:underline"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
