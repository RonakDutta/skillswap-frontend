import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import Skeleton from "../components/Skeleton";
import {
  Search,
  ShoppingCart,
  Repeat,
  User,
  Filter,
  Loader2,
} from "lucide-react";

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("ALL");

  const { addToast } = useToast();

  const fetchMarketplace = async (query = "") => {
    try {
      setLoading(true);
      const url = query
        ? `https://skillswap-api-7ysx.onrender.com/marketplace?search=${query}`
        : "https://skillswap-api-7ysx.onrender.com/marketplace";

      const response = await fetch(url, {
        headers: { token: localStorage.token },
      });

      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplace();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchMarketplace(e.target.value);
  };

  const visibleItems = items.filter((item) => {
    if (filterType === "ALL") return true;
    return item.skill_type === filterType;
  });

  const handleBuy = async (skill_id, seller_id, price) => {
    const confirm = window.confirm(`Authorize transfer of ${price} CR?`);
    if (!confirm) return;

    try {
      const body = { skill_id, seller_id, price };
      const response = await fetch(
        "https://skillswap-api-7ysx.onrender.com/buy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (response.ok) {
        // --- SUCCESS TOAST ---
        addToast("TRANSACTION COMPLETE. ASSET ACQUIRED.", "success");
      } else {
        // --- ERROR TOAST ---
        addToast(`TRANSACTION FAILED: ${parseRes}`, "error");
      }
    } catch (err) {
      console.error(err.message);
      addToast("SYSTEM ERROR: NETWORK DOWN", "error");
    }
  };

  const handleSwap = async (skill_id, receiver_id) => {
    try {
      const response = await fetch(
        "https://skillswap-api-7ysx.onrender.com/swap/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify({ skill_id, receiver_id }),
        }
      );

      const parseRes = await response.json();

      if (response.ok) {
        addToast("HANDSHAKE SIGNAL TRANSMITTED", "info");
      } else {
        addToast(parseRes.message || "SIGNAL JAMMED", "error");
      }
    } catch (err) {
      console.error(err.message);
      addToast("NETWORK ERROR", "error");
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-20 max-w-7xl mx-auto bg-slate-950">
      {/* HEADER SECTION */}
      <div className="mb-12 border-b-4 border-slate-800 pb-8">
        <h1 className="text-5xl md:text-7xl font-black uppercase italic text-white mb-6">
          Global{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">
            Market
          </span>
        </h1>

        {/* SEARCH BAR */}
        <div className="relative mb-6">
          <Search className="absolute top-4 left-4 text-slate-500 w-6 h-6" />
          <input
            type="text"
            placeholder="Search protocols (e.g. React, Guitar, Spanish)..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-slate-900 border-2 border-slate-700 pl-14 pr-4 py-4 text-xl text-white font-mono focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-600"
          />
        </div>

        {/* FILTER CONTROLS */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-slate-500 font-mono text-sm uppercase mr-4">
            <Filter className="w-4 h-4" /> Filter Stream:
          </div>

          <button
            onClick={() => setFilterType("ALL")}
            className={`px-6 py-2 font-bold uppercase border-2 transition-all ${
              filterType === "ALL"
                ? "bg-slate-200 text-slate-950 border-slate-200"
                : "border-slate-700 text-slate-500 hover:border-slate-400 hover:text-white bg-slate-900"
            }`}
          >
            All Signals
          </button>

          <button
            onClick={() => setFilterType("HAVE")}
            className={`px-6 py-2 font-bold uppercase border-2 transition-all ${
              filterType === "HAVE"
                ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-[4px_4px_0px_rgba(255,255,255,0.1)]"
                : "border-slate-700 text-slate-500 hover:border-emerald-500 hover:text-emerald-500 bg-slate-900"
            }`}
          >
            Selling Only
          </button>

          <button
            onClick={() => setFilterType("WANT")}
            className={`px-6 py-2 font-bold uppercase border-2 transition-all ${
              filterType === "WANT"
                ? "bg-blue-500 text-slate-950 border-blue-500 shadow-[4px_4px_0px_rgba(255,255,255,0.1)]"
                : "border-slate-700 text-slate-500 hover:border-blue-500 hover:text-blue-500 bg-slate-900"
            }`}
          >
            Buying Only
          </button>
        </div>
      </div>

      {/* GRID DISPLAY */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-slate-950 border-2 border-slate-800 p-6 flex flex-col h-70 relative"
            >
              {/* Badge Ghost */}
              <Skeleton className="absolute top-0 right-0 w-20 h-6" />

              {/* Title Ghost */}
              <Skeleton className="w-3/4 h-8 mb-4 mt-6" />

              {/* User Ghost */}
              <div className="flex items-center gap-2 mb-8">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-1/2 h-4" />
              </div>

              {/* Price & Button Ghost */}
              <div className="mt-auto border-t border-slate-800 pt-4 flex justify-between items-center">
                <div className="space-y-1">
                  <Skeleton className="w-10 h-3" />
                  <Skeleton className="w-16 h-6" />
                </div>
                <Skeleton className="w-32 h-10" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item) => (
            <div
              key={item.skill_id}
              className="bg-slate-900 border-2 border-slate-800 p-6 flex flex-col hover:border-emerald-500 transition-colors group relative shadow-[4px_4px_0px_0px_#000]"
            >
              {/* BADGE */}
              <div
                className={`absolute top-0 right-0 border-l-2 border-b-2 border-slate-800 px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                  item.skill_type === "HAVE"
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-blue-500 text-white"
                }`}
              >
                {item.skill_type === "HAVE" ? "Selling" : "Buying"}
              </div>

              {/* CONTENT */}
              <div className="mb-6 mt-2">
                <h3 className="text-2xl font-black uppercase italic text-white mb-2 truncate">
                  {item.skill_name}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                  <User className="w-4 h-4" />
                  {/* LINK TO PUBLIC PROFILE */}
                  <Link
                    to={`/operator/${item.seller_id}`}
                    className="text-emerald-500 font-bold hover:underline hover:text-emerald-400 transition-colors"
                  >
                    {item.user_name}
                  </Link>
                </div>
              </div>

              {/* PRICE & ACTION */}
              <div className="mt-auto border-t border-slate-800 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    Cost
                  </p>
                  <p className="text-xl font-black text-white">
                    {item.price > 0 ? `${item.price} CR` : "BARTER"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (item.price > 0) {
                      handleBuy(item.skill_id, item.seller_id, item.price);
                    } else {
                      handleSwap(item.skill_id, item.seller_id);
                    }
                  }}
                  className={`px-4 py-2 font-bold uppercase text-xs border-2 transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                    item.skill_type === "HAVE"
                      ? "border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950"
                      : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {item.skill_type === "HAVE" ? (
                    item.price > 0 ? (
                      <ShoppingCart className="w-4 h-4" />
                    ) : (
                      <Repeat className="w-4 h-4" />
                    )
                  ) : (
                    <Repeat className="w-4 h-4" />
                  )}

                  {/* BUTTON TEXT LOGIC */}
                  {item.skill_type === "WANT"
                    ? "Propose Swap"
                    : item.price > 0
                    ? "Purchase"
                    : "Initiate Handshake"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {visibleItems.length === 0 && !loading && (
        <div className="text-center py-20 opacity-50 border-2 border-dashed border-slate-800">
          <p className="font-mono text-xl text-slate-500 uppercase">
            // NO SIGNALS FOUND FOR FILTER: {filterType}
          </p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
