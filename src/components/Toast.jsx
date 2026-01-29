import React, { useEffect } from "react";
import { X, CheckCircle, Terminal } from "lucide-react";

const Toast = ({ message, onClose, type = "success" }) => {
  // Auto-close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 animate-bounce-in">
      <div className="bg-slate-900 border-l-4 border-emerald-500 text-white px-6 py-4 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex items-center gap-4 min-w-75">
        {/* ICON */}
        <div className="bg-slate-950 p-2 border border-emerald-500/30 rounded-full">
          {type === "success" ? (
            <Terminal className="text-emerald-500 w-5 h-5" />
          ) : (
            <CheckCircle className="text-blue-500 w-5 h-5" />
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h4 className="font-bold uppercase text-emerald-500 text-xs tracking-wider mb-1">
            System Notification
          </h4>
          <p className="font-mono text-sm">{message}</p>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
