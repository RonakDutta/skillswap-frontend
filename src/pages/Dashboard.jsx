import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  User,
  Briefcase,
  ExternalLink,
  CreditCard,
  X,
  History,
  Tag,
  ShoppingBag,
  Edit3,
  Save,
  Terminal,
  Activity,
  Cpu,
  Zap,
  AlertCircle,
  Mail,
} from "lucide-react";
import Modal from "../components/Modal";
import WalletModule from "../components/WalletModule";
import IdentityModule from "../components/IdentityModule";
import Skeleton from "../components/Skeleton";

// --- THEME ENGINE ---
const CYBER = {
  BOX: "bg-slate-900 border-2 border-slate-700 shadow-[4px_4px_0px_0px_#000]",
  BOX_HOVER:
    "hover:border-emerald-500 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_#10b981] transition-all duration-200",
  BTN_PRIMARY:
    "bg-emerald-500 text-slate-950 border-2 border-emerald-400 font-black uppercase text-sm px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:bg-emerald-400 active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2",
  BTN_SECONDARY:
    "bg-slate-800 text-emerald-500 border-2 border-slate-600 font-bold uppercase text-sm px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:bg-slate-700 hover:text-white active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2",
  BTN_DANGER:
    "bg-red-500/10 text-red-500 border-2 border-red-500 p-2 hover:bg-red-500 hover:text-white transition-all",
  INPUT:
    "w-full bg-slate-950 border-2 border-slate-700 p-4 text-white font-mono focus:border-emerald-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#10b981] transition-all placeholder:text-slate-600",
  INPUT_EDIT:
    "w-full bg-slate-800 border-b-2 border-emerald-500 text-white font-mono text-sm focus:outline-none px-2 py-1",
  LABEL:
    "block font-black text-xs uppercase mb-2 tracking-widest text-slate-500",
};

// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = ({ setAuth }) => {
  // Tabs & UI State
  const [activeTab, setActiveTab] = useState("LISTINGS");
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true); // Add this at the top

  // User Data State
  const [userName, setUserName] = useState("Operator");
  const [userID, setUserID] = useState("000");
  const [walletBalance, setWalletBalance] = useState(0);

  // Content Data State
  const [skills, setSkills] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  // Editable Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userTitle, setUserTitle] = useState("Full Stack Developer");
  const [userBio, setUserBio] = useState(
    "Ready for contract work and asset exchange."
  );

  // Form State
  const [skillInput, setSkillInput] = useState("");
  const [skillType, setSkillType] = useState("HAVE");
  const [price, setPrice] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [swapRequests, setSwapRequests] = useState([]);

  // --- LOGIC ---

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch All Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = { token: localStorage.token };
      const [profileRes, skillsRes, invRes, actRes] = await Promise.all([
        fetch("https://skillswap-api-7ysx.onrender.com/profile", { headers }),
        fetch("https://skillswap-api-7ysx.onrender.com/skills", { headers }),
        fetch("https://skillswap-api-7ysx.onrender.com/inventory", { headers }),
        fetch("https://skillswap-api-7ysx.onrender.com/activity", { headers }),
      ]);

      const profileData = await profileRes.json();
      setUserName(profileData.user_name || profileData.name);
      setUserID(profileData.user_id);
      setWalletBalance(profileData.wallet_balance);

      // Load persisted local edits
      const savedTitle = localStorage.getItem(
        `userTitle_${profileData.user_id}`
      );
      const savedBio = localStorage.getItem(`userBio_${profileData.user_id}`);
      if (savedTitle) setUserTitle(savedTitle);
      if (savedBio) setUserBio(savedBio);

      const skillsData = await skillsRes.json();
      if (skillsRes.ok) {
        setSkills(
          skillsData.data.map((s) => ({
            id: s.skill_id,
            name: s.skill_name,
            type: s.skill_type,
            price: s.price,
            resourceLink: s.resource_link,
          }))
        );
        const reqRes = await fetch(
          "https://skillswap-api-7ysx.onrender.com/swap/requests",
          {
            headers,
          }
        );
        setSwapRequests(await reqRes.json());
      }
      setInventory(await invRes.json());
      setActivityLog(await actRes.json());
    } catch (err) {
      console.error("System Failure:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Actions
  const handleTopUp = async (amount) => {
    try {
      const res = await fetch(
        "https://skillswap-api-7ysx.onrender.com/wallet/add",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify({ amount }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setWalletBalance(data.wallet_balance);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem(`userTitle_${userID}`, userTitle);
    localStorage.setItem(`userBio_${userID}`, userBio);
    setIsEditingProfile(false);
  };

  const submitSkill = (e) => {
    e.preventDefault();
    if (parseInt(price) > 0 && !resourceLink) {
      setShowMentorModal(true);
      return;
    }
    executeAddSkill();
  };

  const executeAddSkill = async () => {
    try {
      const body = {
        skill_name: skillInput,
        skill_type: skillType,
        price,
        resource_link: resourceLink,
      };
      const res = await fetch(
        "https://skillswap-api-7ysx.onrender.com/skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      if (res.ok) {
        fetchData();
        setSkillInput("");
        setPrice("");
        setResourceLink("");
        setShowMentorModal(false);
        setShowAddForm(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`https://skillswap-api-7ysx.onrender.com/skills/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.token },
    });
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleSwapResponse = async (request_id, action) => {
    try {
      await fetch("https://skillswap-api-7ysx.onrender.com/swap/respond", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({ request_id, action }),
      });
      fetchData(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-950 pt-15 px-4 pb-20 font-sans text-white">
      <Modal
        isOpen={showMentorModal}
        onClose={() => setShowMentorModal(false)}
        title="Confirm Live Protocol"
        message="No downlink URL detected. Confirm you are selling a Live Mentorship Session?"
        confirmText="Confirm Protocol"
        onConfirm={executeAddSkill}
        isWarning={true}
      />

      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6 border-b-4 border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="text-emerald-500 w-6 h-6" />
            <h2 className="text-emerald-500 font-mono font-bold text-xs tracking-[0.3em] uppercase">
              System Terminal // v2.0.4
            </h2>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Command Center
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-xs text-emerald-500 font-bold tracking-widest">
              UPLINK SECURE
            </span>
          </div>
          <div className="font-mono text-xs font-bold border-2 border-slate-700 bg-slate-900 text-slate-400 px-4 py-2 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
            <Cpu size={14} /> SERVER_TIME:{" "}
            <span className="text-white">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </header>

      {/* LAYOUT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: IDENTITY & WALLET */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <IdentityModule
            CYBER={CYBER}
            userName={userName}
            userID={userID}
            title={userTitle}
            setTitle={setUserTitle}
            bio={userBio}
            setBio={setUserBio}
            isEditing={isEditingProfile}
            setIsEditing={setIsEditingProfile}
            onSave={handleSaveProfile}
          />
          <WalletModule
            balance={walletBalance}
            onTopUp={handleTopUp}
            CYBER={CYBER}
          />
        </div>

        {/* RIGHT COLUMN: MAIN TERMINAL */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* TABS */}
          <div className="flex gap-4 overflow-x-auto pb-2 border-b-2 border-slate-800">
            {[
              {
                id: "LISTINGS",
                label: "Operations",
                icon: Tag,
                color: "bg-emerald-500 text-slate-950 border-emerald-400",
              },
              {
                id: "LIBRARY",
                label: "The Vault",
                icon: ShoppingBag,
                color: "bg-purple-500 text-white border-purple-400",
              },
              {
                id: "HISTORY",
                label: "System Logs",
                icon: History,
                color: "bg-blue-500 text-white border-blue-400",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 border-2 font-black uppercase text-sm transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? `${tab.color} shadow-[4px_4px_0px_0px_#000]`
                      : "bg-slate-900 border-slate-700 text-slate-500 hover:text-white hover:border-slate-500"
                  }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          {/* CONTENT AREA */}
          <div className="min-h-100">
            {/* 1. OPERATIONS (LISTINGS) */}
            {activeTab === "LISTINGS" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
                {/* ACTION BAR */}
                <div className="bg-slate-900 border-2 border-dashed border-slate-700 p-1">
                  <div className="bg-slate-900 p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-black uppercase text-xl text-white flex items-center gap-2">
                        <Briefcase className="text-emerald-500" size={20} />{" "}
                        Resource Manager
                      </h3>
                      <p className="font-mono text-xs text-slate-500 mt-1">
                        Deploy assets or request signals.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className={
                        showAddForm ? CYBER.BTN_DANGER : CYBER.BTN_PRIMARY
                      }
                    >
                      {showAddForm ? (
                        <X size={20} />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Plus size={20} /> NEW ASSET
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* ADD FORM */}
                {showAddForm && (
                  <div
                    className={`${CYBER.BOX} p-8 border-l-4 border-l-emerald-500`}
                  >
                    <form onSubmit={submitSkill} className="space-y-6">
                      <div>
                        <label className={CYBER.LABEL}>
                          Protocol Designation
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Advanced React Patterns"
                          className={CYBER.INPUT}
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className={CYBER.LABEL}>Type</label>
                          <div className="flex gap-0">
                            <button
                              type="button"
                              onClick={() => setSkillType("HAVE")}
                              className={`flex-1 py-4 border-2 font-black text-xs uppercase ${
                                skillType === "HAVE"
                                  ? "bg-emerald-500 text-slate-950 border-emerald-500"
                                  : "bg-slate-950 text-slate-500 border-slate-700"
                              }`}
                            >
                              I HAVE IT
                            </button>
                            <button
                              type="button"
                              onClick={() => setSkillType("WANT")}
                              className={`flex-1 py-4 border-2 font-black text-xs uppercase ${
                                skillType === "WANT"
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "bg-slate-950 text-slate-500 border-slate-700"
                              }`}
                            >
                              I WANT IT
                            </button>
                          </div>
                        </div>
                        {skillType === "HAVE" && (
                          <div>
                            <label className={CYBER.LABEL}>Credit Value</label>
                            <input
                              type="number"
                              placeholder="0 = Swap Only"
                              className={CYBER.INPUT}
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                      {skillType === "HAVE" && (
                        <div>
                          <label className={CYBER.LABEL}>
                            Resource Link (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="https://..."
                            className={CYBER.INPUT}
                            value={resourceLink}
                            onChange={(e) => setResourceLink(e.target.value)}
                          />
                          <p className="text-[10px] font-mono mt-2 text-slate-500 flex items-center gap-1">
                            <AlertCircle size={10} /> Empty link initiates Live
                            Mentorship protocol.
                          </p>
                        </div>
                      )}
                      <button
                        type="submit"
                        className={`${CYBER.BTN_PRIMARY} w-full py-4 text-lg`}
                      >
                        INITIALIZE PROTOCOL
                      </button>
                    </form>
                  </div>
                )}
                {/* INCOMING TRANSMISSIONS (SWAP REQUESTS) */}
                {swapRequests.filter((r) => r.status === "PENDING").length >
                  0 && (
                  <div className="mb-8 border-2 border-yellow-500/50 bg-yellow-500/5 p-4 animate-pulse">
                    <h3 className="text-yellow-500 font-black uppercase text-sm mb-4 flex items-center gap-2">
                      <Activity size={16} /> Incoming Handshake Requests
                    </h3>
                    <div className="space-y-2">
                      {swapRequests
                        .filter((r) => r.status === "PENDING")
                        .map((req) => (
                          <div
                            key={req.request_id}
                            className="bg-slate-900 border border-slate-700 p-3 flex justify-between items-center"
                          >
                            <div>
                              <span className="text-white font-bold uppercase">
                                {req.sender_name}
                              </span>
                              <span className="text-slate-500 text-xs ml-2">
                                wants: {req.skill_name}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleSwapResponse(req.request_id, "ACCEPTED")
                                }
                                className="bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 uppercase hover:bg-emerald-400"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleSwapResponse(req.request_id, "REJECTED")
                                }
                                className="border border-red-500 text-red-500 text-xs font-bold px-3 py-1 uppercase hover:bg-red-500 hover:text-white"
                              >
                                Deny
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* ACCEPTED CONNECTIONS */}
                <div className="mb-8">
                  <h3 className="text-blue-500 font-black uppercase text-sm mb-4 flex items-center gap-2">
                    <Activity size={16} /> Active Connections
                  </h3>

                  {swapRequests.filter((r) => r.status === "ACCEPTED")
                    .length === 0 && (
                    <p className="text-slate-600 font-mono text-xs">
                      // NO ACTIVE UPLINKS
                    </p>
                  )}

                  {swapRequests
                    .filter((r) => r.status === "ACCEPTED")
                    .map((req) => (
                      <div
                        key={req.request_id}
                        className="bg-slate-900 border-l-4 border-blue-500 p-4 mb-3 shadow-[2px_2px_0px_0px_#000]"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          {/* LEFT: The "What" */}
                          <div>
                            <p className="text-[13px] text-slate-400 font-mono uppercase tracking-widest mb-1">
                              UPLINK ESTABLISHED // {req.sender_name}
                            </p>
                            <p className="text-white font-bold text-sm">
                              ASKING FOR :{" "}
                              <span className="text-emerald-500">
                                {req.skill_name}
                              </span>
                            </p>
                          </div>

                          {/* RIGHT: The "Contact" */}
                          <div className="bg-slate-950 border border-slate-700 p-2 min-w-50">
                            <p className="text-[10px] text-blue-500 font-mono uppercase mb-1">
                              SECURE CONTACT PROTOCOL
                            </p>
                            <div className="flex items-center gap-2 text-slate-300 text-xs font-mono select-all cursor-text">
                              <Mail size={12} /> {req.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* LISTINGS GRID */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                      <Skeleton key={n} className="h-48 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((s) => (
                      <div
                        key={s.id}
                        className={`${CYBER.BOX} p-6 relative group ${
                          CYBER.BOX_HOVER
                        } ${
                          s.type === "WANT"
                            ? "border-blue-900/50 hover:border-blue-500 hover:shadow-[6px_6px_0px_0px_#3b82f6]"
                            : ""
                        }`}
                      >
                        <div
                          className={`absolute top-0 right-0 border-l-2 border-b-2 border-slate-900 px-3 py-1 font-black text-[10px] tracking-widest uppercase ${
                            s.type === "HAVE"
                              ? "bg-emerald-500 text-slate-950"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {s.type === "HAVE" ? "OUTBOUND" : "INBOUND"}
                        </div>
                        <h4 className="font-black text-2xl text-white uppercase pr-16 leading-none mb-4 truncate">
                          {s.name}
                        </h4>
                        <div className="flex justify-between items-end border-t-2 border-slate-800 pt-4 mt-2">
                          <div
                            className={`font-mono text-sm font-bold ${
                              s.type === "HAVE"
                                ? "text-emerald-500"
                                : "text-blue-500"
                            }`}
                          >
                            {s.type === "WANT"
                              ? "OPEN CONTRACT"
                              : s.price > 0
                              ? `${s.price} CR`
                              : "SWAP ONLY"}
                          </div>
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="text-slate-600 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {skills.length === 0 && (
                  <div className="text-center font-mono text-slate-600 py-12 border-2 border-dashed border-slate-800">
                    // NO ACTIVE PROTOCOLS FOUND
                  </div>
                )}
              </div>
            )}

            {/* 2. THE VAULT (INVENTORY) */}
            {activeTab === "LIBRARY" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {inventory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`${CYBER.BOX} p-0 flex flex-col md:flex-row overflow-hidden group hover:border-purple-500 transition-colors`}
                  >
                    <div className="bg-purple-500/10 border-b-2 md:border-b-0 md:border-r-2 border-slate-700 p-6 flex items-center justify-center min-w-24 group-hover:bg-purple-500/20 transition-colors">
                      <ShoppingBag size={32} className="text-purple-500" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="text-center md:text-left">
                        <h4 className="font-black text-xl text-white uppercase leading-none">
                          {item.skill_name}
                        </h4>
                        <p className="font-mono text-xs text-slate-500 mt-2">
                          Source:{" "}
                          <span className="text-purple-400 font-bold">
                            {item.seller_name}
                          </span>
                        </p>
                      </div>
                      {item.resource_link ? (
                        <a
                          href={item.resource_link}
                          target="_blank"
                          rel="noreferrer"
                          className={`${CYBER.BTN_PRIMARY} bg-purple-500 border-purple-400 hover:bg-purple-400 w-full md:w-auto`}
                        >
                          <ExternalLink size={16} /> ACCESS LINK
                        </a>
                      ) : (
                        <div className="bg-orange-500/10 border-2 border-orange-500/50 px-4 py-2 text-xs font-bold text-orange-500 flex items-center gap-2 uppercase">
                          <Activity size={16} /> Live Uplink Required
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {inventory.length === 0 && (
                  <div className="text-center font-mono text-slate-600 py-12 border-2 border-dashed border-slate-800">
                    // VAULT STORAGE EMPTY
                  </div>
                )}
              </div>
            )}

            {/* 3. SYSTEM LOGS (HISTORY) */}
            {activeTab === "HISTORY" && (
              <div
                className={`${CYBER.BOX} p-0 animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden`}
              >
                <div className="bg-slate-900 border-b-2 border-slate-700 p-3 flex items-center gap-2 text-slate-500 font-mono text-xs">
                  <Terminal size={14} /> /var/logs/transaction_history
                </div>
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-950 text-slate-500 border-b-2 border-slate-800">
                    <tr>
                      <th className="p-4 font-black uppercase text-[10px] tracking-widest">
                        Timestamp
                      </th>
                      <th className="p-4 font-black uppercase text-[10px] tracking-widest">
                        Action
                      </th>
                      <th className="p-4 font-black uppercase text-[10px] tracking-widest">
                        Asset
                      </th>
                      <th className="p-4 font-black uppercase text-[10px] tracking-widest text-right">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-sm text-slate-300 divide-y divide-slate-800">
                    {activityLog.map((log, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="p-4 text-slate-500 text-xs">
                          {new Date(log.purchase_date).toLocaleString()}
                        </td>
                        <td className="p-4 font-bold text-xs">
                          {log.type === "SALE" ? (
                            <span className="text-emerald-500 flex items-center gap-1">
                              SOLD TO{" "}
                              <span className="text-white">
                                {log.other_party}
                              </span>
                            </span>
                          ) : (
                            <span className="text-blue-500 flex items-center gap-2">
                              BOUGHT FROM
                              <span className="text-white">
                                {log.other_party}
                              </span>
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-bold">{log.skill_name}</td>
                        <td
                          className={`p-4 text-right font-bold ${
                            log.type === "SALE"
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {log.type === "SALE" ? "+" : "-"}
                          {log.price} CR
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {activityLog.length === 0 && (
                  <div className="p-8 text-center font-mono text-slate-600">
                    // NO LOGS FOUND
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
