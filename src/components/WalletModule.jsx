import { CreditCard, Zap } from "lucide-react";

const WalletModule = ({ balance, onTopUp, CYBER }) => {
  return (
    <div className={`${CYBER.BOX} p-6 bg-slate-900 relative`}>
      <div className="absolute top-3 right-3 text-slate-700">
        <Zap size={24} />
      </div>
      <div className="flex justify-between items-center mb-4 border-b-2 border-slate-700 pb-2">
        <h3 className="font-black text-xs text-slate-400 uppercase flex items-center gap-2 tracking-widest">
          <CreditCard size={14} /> Liquid Assets
        </h3>
      </div>
      <div className="text-4xl font-black mb-6 tracking-tighter text-white">
        {balance}
        <span className="text-lg text-emerald-600 ml-2">CR</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onTopUp(100)} className={CYBER.BTN_SECONDARY}>
          +100
        </button>
        <button onClick={() => onTopUp(500)} className={CYBER.BTN_PRIMARY}>
          +500
        </button>
      </div>
    </div>
  );
};

export default WalletModule;
