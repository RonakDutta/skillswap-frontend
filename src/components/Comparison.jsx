import React from "react";
import { Check, X, Zap } from "lucide-react";

const Comparison = () => {
  return (
    <section className="py-24 bg-slate-950 relative border-t-2 border-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-4">
            Why <span className="text-emerald-500">Switch?</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
            // SYSTEM ANALYSIS: OLD VS NEW
          </p>
        </div>

        {/* --- THE COMPARISON GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* CENTRAL VS BADGE (Absolute Positioned in Center) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-950 border-4 border-slate-900 rounded-full items-center justify-center z-10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <span className="font-black italic text-2xl text-slate-200">
              VS
            </span>
          </div>

          {/* LEFT SIDE: "Standard Platforms" (The Enemy) */}
          <div className="bg-slate-900/50 border-2 border-slate-800 p-8 md:pr-12 opacity-80 hover:opacity-100 transition-opacity">
            <div className="mb-8 border-b-2 border-slate-500 pb-4">
              <h3 className="text-xl font-black uppercase text-slate-300">
                Standard Platforms
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                OBSOLETE MODEL
              </p>
            </div>

            <div className="space-y-6">
              <CompareRowNegative
                label="Cost"
                value="Monthly Subscription $$$"
              />
              <CompareRowNegative
                label="Format"
                value="Passive Pre-recorded Videos"
              />
              <CompareRowNegative
                label="Interaction"
                value="Isolated Learning"
              />
              <CompareRowNegative
                label="Earnings"
                value="Platform takes 30-50% cut"
              />
            </div>
          </div>

          {/* RIGHT SIDE: "SkillSwap" (The Hero) */}
          <div className="bg-slate-900 border-2 border-emerald-500 p-8 md:pl-12 relative shadow-[8px_8px_0px_#10b981] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
            {/* 'Recommended' Tag */}
            <div className="absolute -top-4 right-8 bg-emerald-500 text-slate-950 text-xs font-black uppercase px-3 py-1 tracking-widest transform rotate-2">
              Recommended
            </div>

            <div className="mb-8 border-b-2 border-emerald-500/30 pb-4">
              <h3 className="text-xl font-black uppercase text-white flex items-center gap-2">
                SkillSwap{" "}
                <Zap className="w-5 h-5 text-emerald-500 fill-current" />
              </h3>
              <p className="text-xs font-mono text-emerald-500 mt-1">
                HYBRID PROTOCOL v2.0
              </p>
            </div>

            <div className="space-y-6">
              <CompareRowPositive
                label="Cost"
                value="Free Barter or Direct Pay"
              />
              <CompareRowPositive label="Format" value="Live 1-on-1 Coaching" />
              <CompareRowPositive
                label="Interaction"
                value="Real Human Connection"
              />
              <CompareRowPositive
                label="Earnings"
                value="100% Yours (0% Fees on Barter)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper: Negative Row (The "Bad" Stuff)
const CompareRowNegative = ({ label, value }) => (
  <div className="flex items-start justify-between group">
    <div className="flex flex-col">
      <span className="text-xs font-mono text-slate-200 uppercase mb-1">
        {label}
      </span>
      <span className="text-slate-200 font-medium decoration-slate-300">
        {value}
      </span>
    </div>
    <X className="w-6 h-6 text-slate-300 shrink-0" />
  </div>
);

// Helper: Positive Row (The "Good" Stuff)
const CompareRowPositive = ({ label, value }) => (
  <div className="flex items-start justify-between group">
    <div className="flex flex-col">
      <span className="text-xs font-mono text-emerald-500/70 uppercase mb-1">
        {label}
      </span>
      <span className="text-white font-bold text-lg leading-tight">
        {value}
      </span>
    </div>
    <div className="w-6 h-6 bg-emerald-500 rounded-sm flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
      <Check className="w-4 h-4 text-black stroke-4" />
    </div>
  </div>
);

export default Comparison;
