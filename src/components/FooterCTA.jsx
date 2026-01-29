import React from "react";
import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

const FooterCTA = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t-2 border-slate-800 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* --- THE MASSIVE CALL TO ACTION --- */}
        <div className="bg-emerald-500 rounded-none p-12 md:p-24 relative overflow-hidden group">
          {/* The 'Hard Shadow' behind the box */}
          <div className="absolute top-0 left-0 w-full h-full bg-white translate-x-4 translate-y-4 -z-10 border-2 border-slate-900"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Headline */}
            <h2 className="text-5xl md:text-8xl font-black text-slate-950 uppercase italic tracking-tighter mb-8 leading-[0.9]">
              Stop Paying. <br />
              <span className="text-white drop-shadow-[4px_4px_0px_rgba(2,6,23,1)]">
                Start Swapping.
              </span>
            </h2>

            <p className="text-slate-900 font-bold text-xl md:text-2xl max-w-2xl mx-auto mb-10">
              Join the hybrid economy. Your skills are worth more than you
              think.
            </p>

            {/* The "Giant" Button */}
            <Link
              to="/signup"
              className="bg-slate-950 text-white text-xl font-bold uppercase italic px-12 py-5 border-2 border-white hover:bg-white hover:text-slate-950 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[8px_8px_0px_white] transition-all duration-200 flex items-center gap-3"
            >
              <Zap className="w-6 h-6 fill-current" />
              Create Free Account
            </Link>
          </div>

          {/* Decoration: Lightning Bolt Overlay */}
          <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-900/10 rotate-12" />
        </div>

        {/* --- ACTUAL FOOTER LINKS (Small & Raw) --- */}
        <div className="mt-32 flex flex-col md:flex-row justify-between items-end border-t border-slate-800 pt-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center border-2 border-slate-900">
                <Zap className="w-5 h-5 text-black fill-current" />
              </div>
              <span className="text-2xl font-black text-white italic tracking-tighter">
                SkillSwap
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              © 2026 SkillSwap Inc. <br />
              Built with
              <span className="text-emerald-500 font-bold"> 💖 </span>by
              SkillSwap team.
            </p>
          </div>

          {/* Social Links (Brutalist Squares) */}
          <div className="flex gap-4 mt-8 md:mt-0">
            <SocialLink icon={<Github className="w-5 h-5" />} />
            <SocialLink icon={<Twitter className="w-5 h-5" />} />
            <SocialLink icon={<Linkedin className="w-5 h-5" />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon }) => (
  <a
    href="#"
    className="w-12 h-12 bg-slate-900 border border-slate-700 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 flex items-center justify-center transition-colors"
  >
    {icon}
  </a>
);

export default FooterCTA;
