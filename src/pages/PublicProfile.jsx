import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Briefcase,
  Shield,
  ArrowLeft,
  Terminal,
  Cpu,
  Zap,
  Activity,
} from "lucide-react";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- THEME ENGINE (HIGH VOLTAGE) ---
  const CYBER = {
    // Layouts
    PAGE_BG:
      "min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black",

    // Cards
    CARD_HERO:
      "bg-slate-900 border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative overflow-hidden",
    CARD_ITEM:
      "bg-slate-900 border-2 border-slate-800 p-5 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 group",

    // Typography
    HEADING:
      "text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white drop-shadow-[4px_4px_0px_#000]",
    LABEL:
      "font-mono text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase mb-1",
    TEXT_MAIN: "text-slate-200 font-medium",
    TEXT_MUTED: "text-slate-400 text-sm font-mono",

    // Badges & Buttons
    BADGE_SOLID:
      "bg-emerald-500 text-slate-950 font-black font-mono text-xs px-3 py-1 inline-block uppercase",
    BTN_BACK:
      "group flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest mb-8 pl-1",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://skillswap-api-7ysx.onrender.com/operator/${id}`,
          {
            headers: { token: localStorage.token },
          }
        );
        const data = await res.json();
        setProfile(data.profile);
        setListings(data.listings);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Cpu className="text-emerald-500 animate-spin w-12 h-12" />
        <div className="text-emerald-500 font-mono animate-pulse tracking-widest">
          DECRYPTING DOSSIER...
        </div>
      </div>
    );

  return (
    <div className={CYBER.PAGE_BG}>
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto pt-20 px-6 pb-20 relative z-10">
        {/* BACK BUTTON */}
        <button onClick={() => navigate(-1)} className={CYBER.BTN_BACK}>
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          // Return to Command
        </button>

        {/* --- HERO DOSSIER CARD --- */}
        <div className={`${CYBER.CARD_HERO} p-8 md:p-12 mb-12`}>
          {/* Background Grid & Decor */}
          <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-500 rotate-12">
            <Shield size={200} strokeWidth={1} />
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            {/* AVATAR BOX */}
            <div className="relative group">
              <div className="w-32 h-32 bg-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-[8px_8px_0px_#000]">
                <User
                  size={64}
                  className="text-emerald-400"
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-slate-950 font-bold font-mono text-xs px-2 py-1 border-2 border-slate-950">
                LVL.1
              </div>
            </div>

            {/* INFO BLOCK */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className={CYBER.HEADING}>{profile.user_name}</h1>
                <div className="flex gap-2">
                  <span className={CYBER.BADGE_SOLID}>OPERATOR</span>
                  <span className="border-2 border-emerald-500/30 text-emerald-400 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                    ID: #{profile.user_id}
                  </span>
                </div>
              </div>

              {/* Bio / Stats Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-800 pt-6 mt-2">
                <div>
                  <p className={CYBER.LABEL}>Current Status</p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                    ONLINE / ACTIVE
                  </div>
                </div>
                <div>
                  <p className={CYBER.LABEL}>System Bio</p>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                    "Specialist in data retrieval and frontend architecture.
                    Open for high-value asset exchanges and collaborative
                    protocols."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ACTIVE LISTINGS SECTION --- */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b-4 border-slate-800 pb-4">
            <h3 className="text-3xl font-black uppercase italic text-white flex items-center gap-3">
              <Briefcase className="text-emerald-500" size={28} />
              Deployed Assets{" "}
              <span className="text-slate-600 text-lg not-italic font-mono">
                ({listings.length})
              </span>
            </h3>
            <div className="hidden md:flex items-center gap-2 text-emerald-500 font-mono text-xs animate-pulse">
              <Activity size={14} /> LIVE FEED
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings.map((item) => (
              <div key={item.skill_id} className={CYBER.CARD_ITEM}>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-black text-xl uppercase text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {item.skill_name}
                  </h4>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Value
                    </span>
                    <span className="text-white font-black text-lg">
                      {item.price > 0 ? (
                        <span className="flex items-center gap-1">
                          {item.price}{" "}
                          <span className="text-emerald-500 text-xs">CR</span>
                        </span>
                      ) : (
                        <span className="text-blue-400">SWAP</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t-2 border-slate-800 pt-4 mt-2 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono group-hover:text-white transition-colors">
                    <Terminal size={14} />
                    <span>PROTOCOL READY</span>
                  </div>
                  {/* Fake visual indicator of file size or complexity */}
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-emerald-500"></div>
                    <div className="w-1 h-3 bg-emerald-500/50"></div>
                    <div className="w-1 h-3 bg-emerald-500/20"></div>
                  </div>
                </div>
              </div>
            ))}

            {listings.length === 0 && (
              <div className="col-span-full py-16 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 font-mono">
                <Zap size={32} className="mb-2 opacity-50" />
                <span>// NO PUBLIC ASSETS DETECTED</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
