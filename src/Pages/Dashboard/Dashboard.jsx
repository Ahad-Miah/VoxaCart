import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Bell, Search, Radio } from 'lucide-react';
import LeftSide from './LeftSide/LeftSide';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-[#030305] text-gray-300 min-h-screen font-sans flex overflow-hidden relative select-none">
      
      
      <style>{`
        .scanline::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
      `}</style>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ================= LEFT SIDEBAR COMPONENT ================= */}
      <LeftSide isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* ================= RIGHT MAIN LAYOUT SPACE ================= */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10 scanline">
        
        {/* PREMIUM GLOBAL HEADER */}
        <header className="h-20 border-b border-gray-900/60 bg-[#08090e]/40 backdrop-blur-md px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
           
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden text-gray-400 hover:text-white p-2 border border-gray-900 rounded-xl bg-black/40"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-black/30 border border-gray-900 px-3 py-1.5 rounded-lg w-64">
              <Search className="w-3.5 h-3.5 text-gray-600" />
              <input type="text" placeholder="Search mainframe matrix..." className="bg-transparent text-[11px] focus:outline-none placeholder-gray-600 w-full font-mono" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 border border-gray-900 rounded-xl bg-black/40 text-gray-500 hover:text-white relative transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#7c74ff] rounded-full shadow-[0_0_8px_#7c74ff]" />
            </button>
            
            <div className="inline-flex items-center gap-2 bg-indigo-950/20 border border-indigo-500/20 px-3 py-1.5 rounded-xl font-mono text-[10px] text-indigo-300">
              <Radio className="w-3.5 h-3.5 text-[#7c74ff] animate-pulse" />
              <span>MAINFRAME_ONLINE</span>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC CHILD ROUTES SPACE (OUTLET) --- */}
        <main className="p-4 md:p-8 flex-1">
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default Dashboard;