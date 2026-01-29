import React from "react";
import { Zap } from "lucide-react";

const skills = [
  "React.js",
  "Public Speaking",
  "Guitar",
  "Digital Marketing",
  "Python",
  "Yoga",
  "Photography",
  "Video Editing",
  "UI/UX Design",
  "Spanish",
  "Investing",
  "Creative Writing",
];

const SkillMarquee = () => {
  return (
    <>
      <div className="text-center mb-8 mt-8">
        <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">
          Trending on SkillSwap
        </p>
      </div>

      <div className="w-full py-6 bg-slate-900 border-y border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] overflow-hidden relative transform -skew-y-1 my-10">
        {/* Side Vignettes (Dark fade on edges) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-slate-900 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-slate-900 to-transparent z-10"></div>

        {/* The Moving Container */}
        <div className="flex w-max animate-scroll">
          {/* List 1 */}
          <div className="flex items-center gap-0">
            {skills.map((skill, index) => (
              <TickerItem key={`list1-${index}`} text={skill} />
            ))}
          </div>

          {/* List 2 (Duplicate) */}
          <div className="flex items-center gap-0">
            {skills.map((skill, index) => (
              <TickerItem key={`list2-${index}`} text={skill} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper: The "Ticker" Item
const TickerItem = ({ text }) => (
  <div className="flex items-center px-8 group cursor-default">
    {/* The Skill Name - Big and Bold */}
    <span className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-emerald-400 transition-colors">
      {text}
    </span>

    {/* The Separator - Glowing Lightning Bolt */}
    <Zap className="w-5 h-5 text-emerald-500 ml-8 fill-emerald-500 animate-pulse" />
  </div>
);

export default SkillMarquee;
