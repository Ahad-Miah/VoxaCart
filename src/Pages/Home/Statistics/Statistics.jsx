import React from 'react';
import { DollarSign, Zap, Users, MessageSquareCode, TrendingUp } from 'lucide-react';

const statsData = [
  {
    id: 1,
    value: '$42M+',
    label: 'Total Gross Volume',
    subLabel: 'Secured AI transactions',
    icon: <DollarSign className="w-6 h-6 text-indigo-400" />,
    gradient: 'from-blue-600/10 via-indigo-600/20 to-transparent',
    borderColor: 'group-hover:border-indigo-500/40',
    textColor: 'group-hover:text-[#7c74ff]',
  },
  {
    id: 2,
    value: '0.24s',
    label: 'AI Processing Speed',
    subLabel: 'Ultra-low latency response',
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    gradient: 'from-indigo-600/10 via-purple-600/20 to-transparent',
    borderColor: 'group-hover:border-purple-500/40',
    textColor: 'group-hover:text-purple-400',
  },
  {
    id: 3,
    value: '8.5k+',
    label: 'Active Verified Vendors',
    subLabel: 'Global trusted stores',
    icon: <Users className="w-6 h-6 text-pink-400" />,
    gradient: 'from-purple-600/10 via-pink-600/20 to-transparent',
    borderColor: 'group-hover:border-pink-500/40',
    textColor: 'group-hover:text-pink-400',
  },
  {
    id: 4,
    value: '99.4%',
    label: 'Voice Recognition Accuracy',
    subLabel: 'Generative NLP models',
    icon: <MessageSquareCode className="w-6 h-6 text-emerald-400" />,
    gradient: 'from-pink-600/10 via-emerald-600/20 to-transparent',
    borderColor: 'group-hover:border-emerald-500/40',
    textColor: 'group-hover:text-emerald-400',
  },
];

const StatsSection = () => {
  return (
    <section className="bg-[#09090d] text-white py-24 px-6 md:px-12 relative overflow-hidden select-none border-t border-gray-950">
      
      
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-8xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#5046e5]/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-black italic tracking-widest text-[#7c74ff] uppercase">
              <TrendingUp className="w-3.5 h-3.5" /> Platform Performance
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold italic tracking-tight leading-none">
              By the <span className="text-[#7c74ff]">Numbers</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl leading-relaxed">
              Empowering global commerce with data-driven AI operations. Scaling faster, smarter, and voice-first.
            </p>
          </div>
          
          <div className="hidden lg:block h-[1px] flex-1 bg-gradient-to-r from-gray-950 via-gray-900 to-transparent mx-12 mb-4" />
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat) => (
            <div 
              key={stat.id}
              className={`bg-[#11131c]/40 border border-gray-900/60 p-8 rounded-[32px] relative group transition-all duration-500 hover:scale-[1.03] hover:shadow-3xl ${stat.borderColor} overflow-hidden flex flex-col justify-between h-[240px]`}
            >
             
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none`} />

              {/* Top Row: Icon & Minimal Grid Tracker */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-12 h-12 bg-[#12151e] border border-gray-800/80 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-black/60 group-hover:border-gray-800 transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-indigo-500 transition-colors duration-500" />
              </div>

              {/* Bottom Info: Large Metrics Text */}
              <div className="relative z-10 space-y-2">
                <h3 className={`text-4xl md:text-5xl font-black italic tracking-tight text-white ${stat.textColor} transition-colors duration-300`}>
                  {stat.value}
                </h3>
                <div>
                  <p className="text-sm font-black italic tracking-wide text-gray-200">
                    {stat.label}
                  </p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">
                    {stat.subLabel}
                  </p>
                </div>
              </div>

              
              <div className="relative w-full h-[2px] bg-gray-900 overflow-hidden mt-auto">
                <div className="absolute top-0 left-0 h-full w-12 bg-gray-700 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#5046e5] group-hover:to-purple-500 transition-all duration-700 ease-out" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;