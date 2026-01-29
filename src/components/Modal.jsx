import React from "react";
import { AlertTriangle, X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  isWarning = false,
}) => {
  if (!isOpen) return null;

  return (
    // BACKDROP (Blurry & Dark)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      {/* MODAL BOX */}
      <div className="bg-slate-900 border-2 border-slate-700 w-full max-w-md shadow-[12px_12px_0px_#000] relative animate-fade-in-up">
        {/* HEADER */}
        <div
          className={`p-4 border-b-2 border-slate-700 flex items-center justify-between ${
            isWarning ? "bg-red-500/10" : "bg-slate-800"
          }`}
        >
          <div className="flex items-center gap-3">
            {isWarning && <AlertTriangle className="text-red-500" />}
            <h2 className="font-black uppercase italic text-xl text-white">
              {title}
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8">
          <p className="text-slate-300 font-mono text-lg leading-relaxed">
            {message}
          </p>
        </div>

        {/* FOOTER (Buttons) */}
        <div className="p-4 border-t-2 border-slate-700 bg-slate-950 flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 font-mono font-bold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-8 py-2 font-black uppercase italic text-slate-950 shadow-[4px_4px_0px_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ${
              isWarning ? "bg-red-500" : "bg-emerald-500"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
