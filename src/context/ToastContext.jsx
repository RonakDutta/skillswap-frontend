import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertTriangle, Info, Terminal } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- THEME STYLES ---
  const STYLES = {
    success: "border-emerald-500 text-emerald-500 bg-emerald-950/90",
    error: "border-red-500 text-red-500 bg-red-950/90",
    info: "border-blue-500 text-blue-500 bg-blue-950/90",
  };

  const ICONS = {
    success: <CheckCircle size={20} />,
    error: <AlertTriangle size={20} />,
    info: <Terminal size={20} />,
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* TOAST CONTAINER (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 w-80 border-l-4 shadow-[4px_4px_0px_0px_#000] transition-all animate-in slide-in-from-right duration-300 ${
              STYLES[toast.type] || STYLES.info
            } bg-slate-900 border-2 border-slate-800`}
          >
            <div className="mt-0.5">
              {ICONS[toast.type] || <Info size={20} />}
            </div>
            <div className="flex-1">
              <h4 className="font-black uppercase text-xs tracking-widest mb-1 opacity-80">
                SYSTEM NOTIFICATION
              </h4>
              <p className="font-mono text-sm font-bold text-white leading-tight">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
