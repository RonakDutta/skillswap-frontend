import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import Modal from "./Modal";

const Navbar = ({ isAuth, setAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token"); // Throw away wristband
    setAuth(false); // Update state
    setIsLogoutModalOpen(false);
    // navigate('/login'); // Optional
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4 md:px-0">
      <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-none md:rounded-full px-6 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,1)] flex items-center justify-between transition-all duration-300 hover:border-emerald-500/30">
        {/* --- LEFT: Brand --- */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-500 p-1.5 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-200 border border-slate-900">
            <Zap className="w-5 h-5 text-slate-950 fill-current" />
          </div>
          <span className="font-black text-xl italic tracking-tighter text-white group-hover:text-emerald-400 transition-colors uppercase">
            SkillSwap
          </span>
        </Link>

        {/* --- CENTER: Neo-Brutal Links --- */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/marketplace">Marketplace</NavItem>
          <NavItem to="/about">About</NavItem>
        </div>

        {/* --- RIGHT: Buttons --- */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuth ? (
            <>
              <NavLink
                to="/login"
                className="text-sm font-black uppercase italic tracking-wider text-slate-500 hover:text-white transition-colors"
              >
                Log in
              </NavLink>

              {/* Hard-Edge Button */}
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center overflow-hidden shadow-[4px_4px_0px_#10b981] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
              >
                <span className="bg-emerald-500 px-6 py-2 border-2 border-emerald-400">
                  <span className="relative text-sm font-black uppercase italic tracking-wider text-slate-950">
                    Join Now
                  </span>
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* 1. DASHBOARD BUTTON: The "Go" Button */}
              {/* White Text, Emerald Border, Emerald Shadow. High contrast. */}
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-6 py-2 border-2 border-emerald-500 font-black uppercase italic tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 shadow-none translate-x-0.75 translate-y-0.75" // ACTIVE: Filled, Shadow gone, Pressed down
                      : "bg-slate-950 text-emerald-500 shadow-[4px_4px_0px_#10b981] hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75 hover:bg-emerald-500 hover:text-slate-950" // NORMAL: Popped up
                  }`
                }
              >
                Dashboard
              </NavLink>

              {/* 2. LOGOUT BUTTON: The "Stop" Button */}
              {/* Red Text, Red Border, Red Shadow. Distinct from Dashboard. */}
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="px-6 py-2 bg-slate-950 border-2 border-red-500 text-red-500 font-black uppercase italic tracking-wider shadow-[4px_4px_0px_#ef4444] hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                Logout
              </button>
              {/* 4. Render Modal */}
              <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="Terminate Session?"
                message="Are you sure you want to disconnect from the SkillSwap network?"
                confirmText="Logout"
                onConfirm={handleLogout}
                isWarning={true} // Makes it Red/Danger style
              />
            </div>
          )}
        </div>

        {/* --- Mobile Toggle --- */}
        <button
          className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-slate-950 border-2 border-slate-800 p-4 flex flex-col gap-2 shadow-[8px_8px_0px_#000] md:hidden z-50">
          <MobileNavItem to="/">Home</MobileNavItem>
          <MobileNavItem to="/marketplace">Marketplace</MobileNavItem>
          <MobileNavItem to="/about">About</MobileNavItem>

          <div className="h-px bg-slate-800 my-2" />
          <MobileNavItem to="/login">Log in</MobileNavItem>
          <MobileNavItem to="/signup" highlight>
            Join Now
          </MobileNavItem>
        </div>
      )}
    </nav>
  );
};

// --- THE NEW NAV ITEM (The "Vibe" Fix) ---
const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative text-sm font-black uppercase italic tracking-tighter transition-all duration-200 ${
        isActive
          ? "text-emerald-500" // Active Color
          : "text-slate-400 hover:text-white" // Inactive Color
      }`
    }
  >
    {({ isActive }) => (
      <span className="flex items-center gap-1">
        {/* The 'Tech' Prefix that appears when active */}
        <span
          className={`${
            isActive ? "opacity-100" : "opacity-0"
          } text-emerald-500 transition-opacity duration-200`}
        >
          //
        </span>
        {children}
      </span>
    )}
  </NavLink>
);

const MobileNavItem = ({ to, children, highlight }) => (
  <Link
    to={to}
    className={`block px-4 py-3 text-center font-black uppercase italic tracking-widest transition-colors border-2 ${
      highlight
        ? "bg-emerald-500 border-emerald-400 text-slate-950"
        : "border-transparent text-slate-300 hover:bg-slate-900 hover:border-slate-700 hover:text-white"
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
