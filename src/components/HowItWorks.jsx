import React from "react";
import { UserPlus, Search, ArrowRightLeft } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background: Massive '01 02 03' watermark to fill empty space */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="text-[20rem] font-black text-white leading-none select-none">
          WORKS
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Heading - Matching the Marquee Energy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              How It <span className="text-emerald-500">Works</span>
            </h2>
            <div className="h-2 w-24 bg-emerald-500 mt-2 -skew-x-12"></div>
          </div>

          {/* RIGHT: The 'System Ready' Checklist */}
          <div className="flex flex-col gap-3">
            <CheckItem text="NO SUBSCRIPTION REQUIRED" />
            <CheckItem text="VERIFIED PEER NETWORK" />
            <CheckItem text="INSTANT WALLET TRANSFERS" />
          </div>
        </div>

        {/* --- THE HIGH VOLTAGE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <VoltageCard
            step="01"
            title="Create Identity"
            icon={<UserPlus className="w-8 h-8 text-black" />}
            desc="List your skills. Set your rates. Build your portfolio in under 60 seconds."
          />

          {/* CARD 2 */}
          <VoltageCard
            step="02"
            title="Discover Peers"
            icon={<Search className="w-8 h-8 text-black" />}
            desc="Filter by skill, rating, or wallet acceptance. Find the perfect trading partner."
          />

          {/* CARD 3 */}
          <VoltageCard
            step="03"
            title="Swap or Pay"
            icon={<ArrowRightLeft className="w-8 h-8 text-black" />}
            desc="Direct barter? Totally free. Using the wallet? Secure and instant."
          />
        </div>
      </div>
    </section>
  );
};

// Helper: The "Voltage" Card
const VoltageCard = ({ step, icon, title, desc }) => (
  <div className="relative group">
    {/* The 'Hard Shadow' (Solid Green Box behind the card) */}
    <div className="absolute inset-0 bg-emerald-600 rounded-none translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200"></div>

    {/* The Main Card (Solid Dark Block) */}
    <div className="relative h-full bg-slate-900 border-2 border-slate-700 p-8 hover:border-emerald-400 transition-colors duration-200 flex flex-col items-start justify-between">
      {/* Step Number Badge */}
      <div className="absolute -top-4 -right-4 bg-emerald-500 text-slate-900 font-black text-xl w-12 h-12 flex items-center justify-center border-4 border-slate-950">
        {step}
      </div>

      <div>
        {/* Icon Box - Solid Green */}
        <div className="w-16 h-16 bg-emerald-500 flex items-center justify-center mb-6 -skew-x-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <div className="skew-x-6">{icon}</div>
        </div>

        {/* Title - Big, Uppercase, Italic */}
        <h3 className="text-2xl font-black text-white uppercase italic tracking-wide mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
      </div>

      {/* Bottom Decor Line */}
      <div className="w-full h-1 bg-slate-800 mt-8 group-hover:bg-emerald-500/50 transition-colors"></div>
    </div>
  </div>
);

const CheckItem = ({ text }) => (
  <div className="flex items-center gap-4 group">
    {/* The Bullet: A Solid Green Square (Pixel style) */}
    <div className="w-3 h-3 bg-emerald-500 border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform duration-200"></div>

    {/* The Text: Monospace for that 'Technical' feel */}
    <span className="text-slate-300 font-mono text-sm tracking-widest font-bold uppercase group-hover:text-white transition-colors">
      {text}
    </span>
  </div>
);

export default HowItWorks;
