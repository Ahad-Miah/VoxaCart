import React, { useContext, useState } from 'react';
import { 
  LayoutDashboard, User, ShieldCheck, Terminal, Menu, X, 
  Layers, Cpu, Activity, Radio, LogOut, Settings, Bell, Search 
} from 'lucide-react';
import { AuthContext } from '../../Provider/Authprovider/AuthProvider';

const Dashboard = () => {
  const [activeRoute, setActiveRoute] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 
  const navigationItems = [
    { id: 'Overview', label: 'Core Overview', icon: LayoutDashboard },
    { id: 'Identity', label: 'Identity Grid', icon: User },
    { id: 'Security', label: 'Security Firewall', icon: ShieldCheck },
    { id: 'Terminal', label: 'Mainframe Dev', icon: Terminal },
    { id: 'Settings', label: 'Node Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#030305] text-gray-300 min-h-screen font-sans selection:bg-[#7c74ff]/30 selection:text-white flex overflow-hidden relative">
      
      
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(124,116,255,0.4)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 15px rgba(168,85,247,0.7)); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .scanline::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
      `}</style>

     
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ================= LEFT SIDEBAR (DESKTOP & MOBILE SIDE-DRAWER) ================= */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#06070c]/90 border-r border-gray-900 backdrop-blur-2xl p-6 flex flex-col justify-between 
        transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="space-y-8">
          
          <div className="flex items-center justify-between border-b border-gray-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5046e5] to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(124,116,255,0.4)] animate-glow">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-black font-mono text-white tracking-widest uppercase">VOXA_MAINFRAME</h2>
                <span className="text-[9px] text-gray-600 font-mono tracking-wider block">SECURE ROOT ACCESS</span>
              </div>
            </div>
           
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

         
          <nav className="space-y-1.5">
            <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase block mb-3 px-3">System Control Routes</span>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveRoute(item.id);
                    setIsSidebarOpen(false); 
                  }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-mono text-xs font-bold tracking-wide transition-all duration-300 relative overflow-hidden group
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-950/40 to-purple-950/20 border border-indigo-500/30 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                      : 'border border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'}
                  `}
                >
                 
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#7c74ff] to-purple-500 shadow-[0_0_10px_#7c74ff]" />
                  )}
                  <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-[#7c74ff]' : 'text-gray-600 group-hover:text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

       
        <div className="border-t border-gray-900 pt-4 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full border border-purple-500/30 overflow-hidden bg-purple-950/20 p-0.5 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-gray-800 to-gray-900 flex items-center justify-center font-mono font-bold text-white text-xs">AM</div>
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate font-mono">Alex Mercer</h4>
              <span className="text-[9px] text-emerald-400 font-mono tracking-wider flex items-center gap-1">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" /> Node_Active
              </span>
            </div>
          </div>
          <button className="w-full bg-black/40 border border-gray-900 hover:border-red-500/20 text-gray-500 hover:text-red-400 py-3 rounded-xl font-mono text-[10px] font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2">
            <LogOut className="w-3.5 h-3.5" />
            DISCONNECT_NODE
          </button>
        </div>
      </aside>

      
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />
      )}

      {/* ================= RIGHT MAIN SYSTEM INFRASTRUCTURE ================= */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10 scanline">
        
        {/* TOP GLOWING DASHBOARD HEADER */}
        <header className="h-20 border-b border-gray-900/60 bg-[#08090e]/40 backdrop-blur-md px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white p-2 border border-gray-900 rounded-xl bg-black/40">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-black/30 border border-gray-900 px-3 py-1.5 rounded-lg w-64 focus-within:border-indigo-500/40 transition-all">
              <Search className="w-3.5 h-3.5 text-gray-600" />
              <input type="text" placeholder="Search system matrix..." className="bg-transparent text-[11px] focus:outline-none placeholder-gray-600 w-full font-mono" />
            </div>
          </div>

          <div className="flex items-center gap-3">
           
            <button className="p-2.5 border border-gray-900 rounded-xl bg-black/40 hover:border-gray-800 text-gray-500 hover:text-white transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#7c74ff] rounded-full shadow-[0_0_8px_#7c74ff]" />
            </button>
            
            <div className="inline-flex items-center gap-2 bg-indigo-950/20 border border-indigo-500/20 px-3 py-1.5 rounded-xl font-mono text-[10px] text-indigo-300">
              <Radio className="w-3.5 h-3.5 text-[#7c74ff] animate-pulse" />
              <span>S_SERVER_OK [200]</span>
            </div>
          </div>
        </header>

        
        <div className="p-4 md:p-8 flex-1">
          {activeRoute === 'Overview' && (
            <div className="space-y-6">
              
              
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-black font-mono text-white uppercase tracking-tight">
                  CORE_DASHBOARD / <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">OVERVIEW</span>
                </h3>
                <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">Telemetry data logs and microservice architecture operations.</p>
              </div>

             
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
               
                <div className="bg-[#08090e]/80 border border-gray-900 rounded-2xl p-5 relative overflow-hidden group hover:border-[#7c74ff]/30 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block">CPU Matrix Load</span>
                      <h4 className="text-3xl font-black font-mono text-white">42.8<span className="text-xs text-[#7c74ff] pl-0.5">%</span></h4>
                    </div>
                    <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-[#7c74ff] group-hover:shadow-[0_0_15px_rgba(124,116,255,0.3)] transition-all">
                      <Cpu className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-gray-950 rounded-full h-1.5 overflow-hidden border border-gray-900">
                    <div className="bg-gradient-to-r from-[#7c74ff] to-purple-500 h-full rounded-full" style={{ width: '42.8%' }} />
                  </div>
                </div>

               
                <div className="bg-[#08090e]/80 border border-gray-900 rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block">Network Bandwidth</span>
                      <h4 className="text-3xl font-black font-mono text-white">782<span className="text-xs text-purple-400 pl-0.5">Mb/s</span></h4>
                    </div>
                    <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl text-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-gray-950 rounded-full h-1.5 overflow-hidden border border-gray-900">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>

               
                <div className="bg-[#08090e]/80 border border-gray-900 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block">Encryption Status</span>
                      <h4 className="text-3xl font-black font-mono text-emerald-400">SECURE</h4>
                    </div>
                    <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all">
                      <Layers className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-[9px] font-mono text-gray-600">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> AES_256_BIT NODE ACTIVATED
                  </div>
                </div>

              </div>

              
              <div className="bg-[#08090e]/60 border border-gray-900 rounded-[24px] p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between border-b border-gray-900 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#7c74ff]" />
                    <h5 className="text-xs font-black font-mono uppercase text-white tracking-widest">Live Mainframe System Logs</h5>
                  </div>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                </div>

                <div className="bg-black/50 border border-gray-950 p-4 rounded-xl font-mono text-[11px] leading-relaxed space-y-2 h-64 overflow-y-auto text-gray-400 shadow-inner">
                  <p><span className="text-indigo-400">[SYSTEM]</span> Initializing core sync protocols across distributed grid nodes...</p>
                  <p><span className="text-purple-400">[AUTH]</span> Profile handshake validated successfully for node <span className="text-white">"Alex Mercer"</span>.</p>
                  <p><span className="text-emerald-400">[FIREWALL]</span> Port 8086 security shield compiled cleanly. 0 intrusions intercepted.</p>
                  <p><span className="text-amber-400">[WARNING]</span> Memory buffer cleanup required on peripheral gateway sub-clusters.</p>
                  <p><span className="text-indigo-400">[SYSTEM]</span> Dynamic responsive grid payload rendered. Monitoring matrix inputs...</p>
                </div>
              </div>

            </div>
          )}

          
          {activeRoute !== 'Overview' && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-dashed border-gray-900 rounded-[24px] bg-[#08090e]/20 p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7c74ff]/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center text-[#7c74ff] mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white uppercase tracking-wider">{activeRoute} Section</h3>
              <p className="text-xs text-gray-500 font-mono mt-1 max-w-xs">The pipeline loop for this matrix layer is operational. Core views are being configured for instant streaming.</p>
            </div>
          )}
        </div>

      </main>

    </div>
  );
};

export default Dashboard;