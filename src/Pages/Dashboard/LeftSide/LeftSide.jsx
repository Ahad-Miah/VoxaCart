import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, Cpu, LayoutDashboard, User, ShoppingCart, Heart, ShoppingBag,
  BarChart3, PlusCircle, Package, BrainCircuit, ShieldAlert, Users, 
  CheckSquare, FileSpreadsheet, Sliders, LogOut 
} from 'lucide-react';

const LeftSide = ({ isSidebarOpen, setIsSidebarOpen }) => {
  
  
  const sections = [
    {
      title: "User Matrix Console",
      links: [
        { path: "/dashboard", label: "Dashboard Overview", icon: LayoutDashboard, end: true },
        { path: "/dashboard/myProfile", label: "My Profile slot", icon: User },
        { path: "/dashboard/cart", label: "My Cart Node", icon: ShoppingCart },
        { path: "/dashboard/wishlist", label: "Wishlist Vault", icon: Heart },
        { path: "/dashboard/orders", label: "Order History", icon: ShoppingBag },
      ]
    },
    {
      title: "Vendor Enterprise",
      links: [
        { path: "/dashboard/vendor-stats", label: "Vendor Analytics", icon: BarChart3 },
        { path: "/dashboard/add-product", label: "Add New Product", icon: PlusCircle },
        { path: "/dashboard/my-products", label: "Manage Products", icon: Package },
        { path: "/dashboard/vendor-ai", label: "AI Core Optimizer", icon: BrainCircuit },
      ]
    },
    {
      title: "Central Admin Overlord",
      links: [
        { path: "/dashboard/admin-overview", label: "System Overview", icon: ShieldAlert },
        { path: "/dashboard/manage-users", label: "Manage Users Grid", icon: Users },
        { path: "/dashboard/vendor-apps", label: "Vendor Applications", icon: CheckSquare },
        { path: "/dashboard/product-audit", label: "Product Audit Node", icon: FileSpreadsheet },
        { path: "/dashboard/review-control", label: "Review Controllers", icon: Sliders },
      ]
    }
  ];

  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#06070c]/95 border-r border-gray-900 backdrop-blur-2xl p-6 flex flex-col justify-between 
        transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen overflow-y-auto custom-scrollbar
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className="space-y-7">
         
          <div className="flex items-center justify-between border-b border-gray-900 pb-5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5046e5] to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(124,116,255,0.3)]">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-black font-mono text-white tracking-widest uppercase">VOXA_MAINFRAME</h2>
                <span className="text-[8px] text-gray-600 font-mono tracking-wider block">ROLE_MANAGED_GRID</span>
              </div>
            </div>
            
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          
          <nav className="space-y-6">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                
                <span className="text-[9px] font-mono text-purple-400/70 font-bold tracking-widest uppercase block px-3">
                  // {section.title}
                </span>
                
                
                <div className="space-y-1">
                  {section.links.map((link, linkIdx) => {
                    const Icon = link.icon;
                    return (
                      <NavLink
                        key={linkIdx}
                        to={link.path}
                        end={link.end}
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) => `
                          w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-mono text-[11px] font-bold tracking-wide transition-all duration-300 relative overflow-hidden group
                          ${isActive 
                            ? 'bg-gradient-to-r from-indigo-950/40 to-purple-950/20 border border-indigo-500/30 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                            : 'border border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.01]'}
                        `}
                      >
                        
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#7c74ff] to-purple-500 shadow-[0_0_10px_#7c74ff]" />
                            )}
                            <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-[#7c74ff]' : 'text-gray-600 group-hover:text-gray-400'}`} />
                            {link.label}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

       
        <div className="border-t border-gray-900 pt-4 mt-6 shrink-0">
          <button className="w-full bg-black/40 border border-gray-900 hover:border-red-500/20 text-gray-500 hover:text-red-400 py-3 rounded-xl font-mono text-[10px] font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2NDA">
            <LogOut className="w-3.5 h-3.5" />
            DISCONNECT_NODE
          </button>
        </div>
      </aside>

      
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />
      )}
      
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default LeftSide;