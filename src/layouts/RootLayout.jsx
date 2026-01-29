import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import ClickSpark from "../bits/ClickSpark";

const RootLayout = ({ isAuth, setAuth }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30">
      <ClickSpark
        sparkColor="#10b981"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
        className="block w-full h-full"
      >
        <ScrollRestoration />
        <Navbar isAuth={isAuth} setAuth={setAuth} />
        <div className="pt-24 px-4 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </ClickSpark>
    </div>
  );
};

export default RootLayout;
