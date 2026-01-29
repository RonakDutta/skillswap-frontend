import { Edit3, Save, User } from "lucide-react";

const IdentityModule = ({
  CYBER,
  userName,
  userID,
  title,
  setTitle,
  bio,
  setBio,
  isEditing,
  setIsEditing,
  onSave,
}) => {
  return (
    <div
      className={`${CYBER.BOX} p-6 flex flex-col items-center text-center relative overflow-hidden group`}
    >
      {/* Scan Animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_20px_#10b981] animate-[scan_3s_ease-in-out_infinite] pointer-events-none"></div>

      <div className="z-10 mt-6 mb-4 w-28 h-28 bg-slate-950 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)] flex items-center justify-center">
        <User size={48} className="text-emerald-500" strokeWidth={1.5} />
      </div>

      <div className="z-10 w-full">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">
          {userName}
        </h2>
        <div className="font-mono text-[10px] text-emerald-500 bg-emerald-900/20 border border-emerald-500/30 inline-block px-3 py-1 mb-6">
          ID: #{userID}
        </div>

        <div className="text-left w-full border-t-2 border-slate-800 pt-4 space-y-4">
          {/* Role Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">
                Designation
              </span>
              <button
                onClick={() => (isEditing ? onSave() : setIsEditing(true))}
                className="text-slate-500 hover:text-emerald-500"
              >
                {isEditing ? <Save size={14} /> : <Edit3 size={14} />}
              </button>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={CYBER.INPUT_EDIT}
                autoFocus
              />
            ) : (
              <p className="text-sm font-bold text-white truncate">{title}</p>
            )}
          </div>

          {/* Bio Field */}
          <div>
            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-1 block">
              Bio Data
            </span>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={`${CYBER.INPUT_EDIT} h-20 resize-none`}
              />
            ) : (
              <p className="text-xs text-slate-400 font-mono leading-relaxed line-clamp-3">
                {bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityModule;
