import React, { useContext } from 'react';

import { User, Mail, ShieldCheck, LogOut, Terminal, Cpu, Radio, Hash } from 'lucide-react';
import { AuthContext } from '../../../Provider/Authprovider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  
  const { user, Signout } = useContext(AuthContext);
  const navigate=useNavigate();
  const handleSignout=()=>{
    Signout();
    navigate('/');
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-2 sm:p-4 select-none">
      
      
      <style>{`
        @keyframes radar-pulse {
          0% { transform: scale(0.95); opacity: 0.2; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        .animate-radar { animation: radar-pulse 3s ease-out infinite; }
      `}</style>

     
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black font-mono text-white uppercase tracking-tight">
          SYSTEM_NODE / <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">MY_PROFILE</span>
        </h3>
        <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">Decentralized core token credentials and verified node data.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT CARD: USER AVATAR STATION ================= */}
        <div className="md:col-span-5 bg-[#08090e]/80 border border-gray-900 rounded-[24px] p-6 text-center backdrop-blur-xl relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] group hover:border-purple-500/20 transition-all duration-300">
          
         
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          
          <div className="relative w-32 h-32 mx-auto mb-5 flex items-center justify-center">
           
            <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-radar" />
            <div className="absolute inset-2 border border-dashed border-gray-800 rounded-full" />
            
            
            <div className="w-24 h-24 rounded-full border-2 border-purple-500/40 p-1 bg-black/40 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.3)] z-10 relative">
              <img 
                src={user?.photoURL || "https://via.placeholder.com/150"} 
                alt="Profile Avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-black font-mono text-white tracking-wide truncate">
              {user?.displayName || "Anonymous User"}
            </h4>
            <div className="inline-flex items-center gap-1.5 bg-purple-950/30 border border-purple-500/20 px-3 py-1 rounded-full font-mono text-[9px] text-purple-300 tracking-widest uppercase">
              <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
              NODE_OPERATOR
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-900/60 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>GRID_STATUS:</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" /> SECURE_ONLINE
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>ACCESS_LEVEL:</span>
              <span className="text-indigo-400 font-bold uppercase">ROOT_ADMIN</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CARD: DATA INTEGRITY CRADENTIALS ================= */}
        <div className="md:col-span-7 bg-[#08090e]/60 border border-gray-900 rounded-[24px] p-6 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative flex flex-col justify-between min-h-[310px]">
          
          <div className="space-y-5">
            
            <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
              <Terminal className="w-4 h-4 text-[#7c74ff]" />
              <h5 className="text-xs font-black font-mono uppercase text-white tracking-widest">Metadata Repository</h5>
            </div>

            
            <div className="space-y-4">
              
              
              <div className="bg-black/30 border border-gray-950 p-4 rounded-xl flex items-center gap-4 transition-all hover:border-gray-900">
                <div className="p-2.5 bg-indigo-950/20 border border-indigo-500/10 rounded-lg text-[#7c74ff]">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase block">Identity Nickname</span>
                  <p className="text-xs font-mono font-bold text-gray-300 truncate mt-0.5">
                    {user?.displayName || "Not Provisioned"}
                  </p>
                </div>
              </div>

              
              <div className="bg-black/30 border border-gray-950 p-4 rounded-xl flex items-center gap-4 transition-all hover:border-gray-900">
                <div className="p-2.5 bg-purple-950/20 border border-purple-500/10 rounded-lg text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase block">Verified Network Mail</span>
                  <p className="text-xs font-mono font-bold text-gray-300 truncate mt-0.5">
                    {user?.email || "identity_unknown@node.com"}
                  </p>
                </div>
              </div>

              
              <div className="bg-black/30 border border-gray-950 p-4 rounded-xl flex items-center gap-4 transition-all hover:border-gray-900">
                <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/10 rounded-lg text-emerald-400">
                  <Hash className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase block">Firebase Node Token UUID</span>
                  <p className="text-[10px] font-mono font-bold text-emerald-500/80 truncate mt-0.5">
                    {user?.uid || "UID_NOT_FOUND_MATRIX_ERROR"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= SECURE DISCONNECT BUTTON ================= */}
          <div className="mt-8 pt-4 border-t border-gray-900/40">
            <button 
              onClick={handleSignout}
              className="w-full bg-gradient-to-r from-red-950/20 to-black/40 border border-red-900/30 hover:border-red-500/40 text-red-400 hover:text-red-300 py-3.5 rounded-xl font-mono text-xs font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-red-950/5"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              TERMINATE_SESSION_DISCONNECT
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default MyProfile;