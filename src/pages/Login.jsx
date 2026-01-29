import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import { ArrowLeft, AlertCircle } from "lucide-react";
import Toast from "../components/Toast";
import { useEffect } from "react";
// import { supabase } from "../lib/supabaseClient";

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "Access Granted. Welcome back, Operator."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const location = useLocation();

  useEffect(() => {
    // Check if we were redirected here with a message
    if (location.state?.message) {
      setToastMessage(location.state.message); // Set the error message
      setShowToast(true); // Show the toast immediately

      // Clean up the state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://skillswap-api-7ysx.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const parseRes = await response.json();

      if (response.ok) {
        // 1. Save Token
        localStorage.setItem("token", parseRes.token);

        // 2. SHOW TOAST FIRST (While still on this page)
        setToastMessage("Access Granted. Welcome back, Operator.");
        setShowToast(true);

        // 3. WAIT... let the user read the toast
        setTimeout(() => {
          setAuth(true);
          navigate("/");
        }, 2000);
      } else {
        setError(parseRes || "Invalid Credentials");
      }
    } catch (err) {
      console.error(err.message);
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage} // 👈 Use the variable here
          onClose={() => setShowToast(false)}
          type={toastMessage.includes("Access Denied") ? "error" : "success"} // Optional: Change color
        />
      )}
      <div className="min-h-screen pb-18 flex items-center justify-center px-4 relative overflow-hidden bg-slate-950">
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
                Welcome Back
              </h2>
              <p className="text-slate-400">Enter your details to continue.</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-500/10 border-2 border-red-500 p-4 flex items-center gap-3 text-red-500 font-bold text-sm">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
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

              {/* Password Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-slate-300 font-bold text-sm uppercase">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    class="text-xs text-emerald-500 hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
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
                className="w-full bg-emerald-500 text-slate-950 font-black uppercase italic tracking-wider py-4 border-2 border-emerald-400 hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-slate-800 pt-6">
              <p className="text-slate-500 text-sm">
                New to SkillSwap?{" "}
                <Link
                  to="/signup"
                  className="text-emerald-500 font-bold hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
