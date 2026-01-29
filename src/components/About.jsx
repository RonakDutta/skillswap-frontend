import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ShieldCheck,
  Coins,
  ArrowRight,
  Activity,
  Server,
  Hash,
  Globe,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 overflow-x-hidden">
      {/* --- SECTION 1: HERO (Split Layout) --- */}
      <div className="max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* LEFT: The Manifesto Text */}
        <div className="border-l-4 border-emerald-500 pl-8 py-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic text-white leading-[0.85] tracking-tighter mb-8">
            The <br />
            Skill
            <br />
            Economy
          </h1>

          <p className="text-[1rem] md:text-xl text-slate-400 font-mono leading-relaxed">
            <span className="text-emerald-500 font-bold">
              // SYSTEM STATUS:
            </span>{" "}
            We are building a post-currency learning environment. Knowledge is
            the only asset that multiplies when shared.
          </p>
        </div>

        {/* RIGHT: The "Market Terminal" Visualization (Fills the void) */}
        <div className="relative">
          {/* Decorative Background Blur */}
          <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-50"></div>

          {/* The Terminal Box */}
          <div className="relative bg-slate-900 border-2 border-slate-800 p-6 shadow-[8px_8px_0px_rgba(16,185,129,0.1)]">
            {/* Terminal Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                LIVE_MARKET_FEED // v4.0.1
              </span>
            </div>

            {/* Data Grid */}
            <div className="space-y-4 font-mono text-sm">
              {/* Row 1: Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 border border-slate-800">
                  <span className="text-slate-500 text-xs uppercase block mb-1">
                    Active Nodes
                  </span>
                  <div className="text-emerald-500 font-black text-2xl flex items-center gap-2">
                    <Server className="w-5 h-5" /> 8,421
                  </div>
                </div>
                <div className="bg-slate-950 p-4 border border-slate-800">
                  <span className="text-slate-500 text-xs uppercase block mb-1">
                    24h Volume
                  </span>
                  <div className="text-blue-500 font-black text-2xl flex items-center gap-2">
                    <Activity className="w-5 h-5" /> 94TB
                  </div>
                </div>
              </div>

              {/* Row 2: Fake Logs (Visual Interest) */}
              <div className="bg-slate-950 p-4 border border-slate-800 h-32 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-slate-950 to-transparent z-10"></div>
                <div className="space-y-2 opacity-70">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>[HASH_991]</span>{" "}
                    <span className="text-emerald-500">SWAP_CONFIRMED</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>[USER_X82]</span>{" "}
                    <span className="text-blue-500">DEPLOYED_ASSET</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>[NODE_771]</span>{" "}
                    <span className="text-slate-600">PING_LATENCY_4ms</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>[TX_BLOCK]</span>{" "}
                    <span className="text-emerald-500">VERIFIED</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-slate-950 to-transparent z-10"></div>
              </div>

              {/* Footer Code */}
              <div className="text-xs text-slate-600 truncate">
                &gt; SYSTEM_READY... AWAITING_INPUT...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: THE PROTOCOL STACK --- */}
      <div className="max-w-5xl mx-auto mb-32">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-slate-800 grow"></div>{" "}
          {/* FIXED: flex-grow -> grow */}
          <span className="text-slate-500 font-mono text-base font-bold uppercase tracking-widest">
            Core Protocols
          </span>
          <div className="h-px bg-slate-800 grow"></div>{" "}
          {/* FIXED: flex-grow -> grow */}
        </div>

        {/* STACK ITEM 1 */}
        <div className="group border-2 border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500 transition-all duration-300 mb-6 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-slate-950 p-5 border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
            <Zap className="w-10 h-10 text-emerald-500" />
          </div>
          <div className="grow">
            {" "}
            {/* FIXED: flex-grow -> grow */}
            <h3 className="text-3xl font-black uppercase italic text-white mb-3 group-hover:text-emerald-400 transition-colors">
              Direct Barter
            </h3>
            <p className="text-slate-400 font-mono text-lg leading-relaxed">
              Peer-to-peer exchange. You teach Python, they teach you Spanish.
              No middlemen, no fees.
            </p>
          </div>
          <div className="hidden md:block text-slate-700 font-black text-7xl opacity-20 group-hover:opacity-40 transition-opacity">
            01
          </div>
        </div>

        {/* STACK ITEM 2 */}
        <div className="group border-2 border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-blue-500 transition-all duration-300 mb-6 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-slate-950 p-5 border border-slate-800 group-hover:border-blue-500/50 transition-colors">
            <Coins className="w-10 h-10 text-blue-500" />
          </div>
          <div className="grow">
            {" "}
            {/* FIXED: flex-grow -> grow */}
            <h3 className="text-3xl font-black uppercase italic text-white mb-3 group-hover:text-blue-400 transition-colors">
              Hybrid Wallet
            </h3>
            <p className="text-slate-400 font-mono text-lg leading-relaxed">
              Don't have what they want? Use <strong>SkillCredits</strong>. Earn
              credits by teaching, spend them to learn instant skills.
            </p>
          </div>
          <div className="hidden md:block text-slate-700 font-black text-7xl opacity-20 group-hover:opacity-40 transition-opacity">
            02
          </div>
        </div>

        {/* STACK ITEM 3 */}
        <div className="group border-2 border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-purple-500 transition-all duration-300 mb-6 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-slate-950 p-5 border border-slate-800 group-hover:border-purple-500/50 transition-colors">
            <ShieldCheck className="w-10 h-10 text-purple-500" />
          </div>
          <div className="grow">
            {" "}
            {/* FIXED: flex-grow -> grow */}
            <h3 className="text-3xl font-black uppercase italic text-white mb-3 group-hover:text-purple-400 transition-colors">
              Proof of Skill
            </h3>
            <p className="text-slate-400 font-mono text-lg leading-relaxed">
              Every swap is recorded. Build a reputation that proves your
              expertise better than any certificate.
            </p>
          </div>
          <div className="hidden md:block text-slate-700 font-black text-7xl opacity-20 group-hover:opacity-40 transition-opacity">
            03
          </div>
        </div>
      </div>

      {/* --- SECTION 3: THE HYBRID ECONOMY --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-slate-800 mb-24">
        {/* LEFT: THE SWAP */}
        {/* ADDED: flex flex-col h-full */}
        <div className="p-12 bg-slate-950 border-b-2 md:border-b-0 md:border-r-2 border-slate-800 hover:bg-slate-900 transition-colors flex flex-col h-full">
          <span className="text-emerald-500 font-mono text-sm font-bold uppercase tracking-widest mb-2 block">
            Mode A
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
            The Swap
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            The classic way. Two users agree to trade time for time. Perfect for
            mentorship, live debugging, and language practice.
          </p>

          {/* ADDED: mt-auto (Pushes this list to the bottom) */}
          <ul className="space-y-4 font-mono text-base text-slate-500 mt-auto">
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500"></div> Cost: 0 Credits
            </li>
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500"></div> Interaction: Live /
              Async
            </li>
          </ul>
        </div>

        {/* RIGHT: THE MARKET */}
        {/* ADDED: flex flex-col h-full */}
        <div className="p-12 bg-slate-950 hover:bg-slate-900 transition-colors relative overflow-hidden flex flex-col h-full">
          <Coins className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-900 transform rotate-12" />

          <span className="text-blue-500 font-mono text-sm font-bold uppercase tracking-widest mb-2 block">
            Mode B
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
            The Market
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed z-10 relative">
            The fast lane. Buy instant access to resources, courses, or book a
            mentor immediately using your wallet balance.
          </p>

          {/* ADDED: mt-auto */}
          <ul className="space-y-4 font-mono text-base text-slate-500 z-10 relative mt-auto">
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500"></div> Cost: Variable
            </li>
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500"></div> Interaction: Instant
              Access
            </li>
          </ul>
        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <div className="text-center pb-12">
        <Link
          to="/signup"
          className="group inline-flex items-center justify-center gap-4 bg-white text-slate-950 text-1xl md:text-3xl font-black uppercase italic px-12 py-6 border-4 border-slate-950 shadow-[8px_8px_0px_#10b981] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
        >
          <span>Initialize Profile</span>
          <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default About;
