import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20 rounded-2xl">
      {/* --- Background Glowing Orbs (Updated to Green/Teal) --- */}
      {/* --- HERO SECTION (Neo-Brutal System Override) --- */}
      <div className="relative pb-10 overflow-hidden">
        {/* Background: Technical Grid instead of Blobs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          {/* Badge: Technical "System Ready" Tag */}
          <div className="inline-flex items-center gap-3 mb-8 border-2 border-slate-800 bg-slate-950 px-4 py-2 shadow-[4px_4px_0px_rgba(30,41,59,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default">
            <div className="w-2 h-2 bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">
              // SYSTEM_STATUS: ONLINE
            </span>
          </div>

          {/* Headline: Massive, Italic, Heavy */}
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8 text-white">
            Master <span className="text-slate-700">Skills.</span> <br />
            <span className="text-emerald-500 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Trade Value.
            </span>
          </h1>

          {/* Subtext: Technical Block */}
          <div className="max-w-2xl mx-auto mb-12 border-l-4 border-emerald-500 pl-6 text-left md:text-center md:border-l-0 md:border-t-4 md:pt-6">
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              The first marketplace where you can barter knowledge or pay with a
              hybrid wallet.
              <span className="text-white bg-slate-800 px-1 ml-1">
                Learn, teach, and earn.
              </span>
            </p>
          </div>

          {/* Buttons: Hard Shadows & Clicky */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Button 1: Start Swapping (Solid Emerald Block) */}
            <Link
              to="/signup"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-slate-950 text-lg font-black uppercase italic tracking-wider border-2 border-emerald-400 shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150"
            >
              Start Swapping
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-3" />
            </Link>

            {/* Button 2: Explore (Outline Block) */}
            <Link
              to="/marketplace"
              className="px-8 py-4 bg-slate-950 text-white text-lg font-bold uppercase tracking-wide border-2 border-slate-700 hover:border-emerald-500 hover:text-emerald-500 transition-colors shadow-[6px_6px_0px_rgba(30,41,59,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none "
            >
              Explore Market
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Indicators (Optional, but looks pro) */}
      {/* --- Feature Stats Section (Centered Hard-Wired Style) --- */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-20">
        {/* Feature 1: The Economy */}
        <div className="group relative bg-slate-900 border-2 border-slate-800 p-8 hover:border-emerald-500 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_rgba(30,41,59,1)] hover:shadow-[8px_8px_0px_#10b981] flex flex-col items-center text-center">
          {/* Icon: Centered with mx-auto */}
          <div className="w-16 h-16 mx-auto bg-slate-950 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-[4px_4px_0px_rgba(30,41,59,1)] group-hover:bg-emerald-500 group-hover:border-slate-950 group-hover:text-slate-950 group-hover:shadow-[4px_4px_0px_#000] transition-all duration-200">
            <TrendingUp className="w-8 h-8 text-emerald-500 group-hover:text-slate-950 transition-colors" />
          </div>

          <h3 className="text-xl font-black uppercase italic text-white mb-3 group-hover:text-emerald-400 transition-colors">
            Hybrid Economy
          </h3>

          {/* Text: Centered, removed the left border since it's now centered */}
          <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
            Trade skills directly or use the secure wallet. <br />
            <span className="text-white bg-slate-800 px-1 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
              Your choice.
            </span>
          </p>
        </div>

        {/* Feature 2: Trust */}
        <div className="group relative bg-slate-900 border-2 border-slate-800 p-8 hover:border-emerald-500 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_rgba(30,41,59,1)] hover:shadow-[8px_8px_0px_#10b981] flex flex-col items-center text-center">
          <div className="w-16 h-16 mx-auto bg-slate-950 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-[4px_4px_0px_rgba(30,41,59,1)] group-hover:bg-emerald-500 group-hover:border-slate-950 group-hover:text-slate-950 group-hover:shadow-[4px_4px_0px_#000] transition-all duration-200">
            <ShieldCheck className="w-8 h-8 text-emerald-500 group-hover:text-slate-950 transition-colors" />
          </div>

          <h3 className="text-xl font-black uppercase italic text-white mb-3 group-hover:text-emerald-400 transition-colors">
            Verified Users
          </h3>

          <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
            Every profile is vetted manually to ensure <br />
            <span className="text-white bg-slate-800 px-1 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
              high-quality learning.
            </span>
          </p>
        </div>

        {/* Feature 3: Security */}
        <div className="group relative bg-slate-900 border-2 border-slate-800 p-8 hover:border-emerald-500 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_rgba(30,41,59,1)] hover:shadow-[8px_8px_0px_#10b981] flex flex-col items-center text-center">
          <div className="w-16 h-16 mx-auto bg-slate-950 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-[4px_4px_0px_rgba(30,41,59,1)] group-hover:bg-emerald-500 group-hover:border-slate-950 group-hover:text-slate-950 group-hover:shadow-[4px_4px_0px_#000] transition-all duration-200">
            <Sparkles className="w-8 h-8 text-emerald-500 group-hover:text-slate-950 transition-colors" />
          </div>

          <h3 className="text-xl font-black uppercase italic text-white mb-3 group-hover:text-emerald-400 transition-colors">
            Zero Friction
          </h3>

          <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
            Instant booking and seamless video calls <br />
            <span className="text-white bg-slate-800 px-1 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
              built right in.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
