import React from 'react';
import { Mic, Cpu, ShoppingBag, Truck } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Activate Voice',
    description: 'Tap the mic icon anywhere on the platform and simply speak what you are looking for in your natural language.',
    icon: <Mic className="w-6 h-6 text-indigo-400" />,
    gradient: 'from-blue-600/10 via-indigo-600/20 to-transparent',
  },
  {
    id: '02',
    title: 'AI Processing',
    description: 'Our Generative AI instantenously processes your voice command to understand context, size, and preferences.',
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    gradient: 'from-indigo-600/10 via-purple-600/20 to-transparent',
  },
  {
    id: '03',
    title: 'Smart Matching',
    description: 'VoxaCart AI crawls through thousands of verified independent vendors to find the exact matches for you.',
    icon: <ShoppingBag className="w-6 h-6 text-pink-400" />,
    gradient: 'from-purple-600/10 via-pink-600/20 to-transparent',
  },
  {
    id: '04',
    title: 'AI Logistics',
    description: 'Confirm with a single word. Our automated logistics pipeline instantly handles shipping from vendor to doorstep.',
    icon: <Truck className="w-6 h-6 text-emerald-400" />,
    gradient: 'from-pink-600/10 via-emerald-600/20 to-transparent',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#09090d] text-white py-20 px-6 md:px-12 relative overflow-hidden select-none border-t border-gray-950">
      
      {/* ব্যাকগ্রাউন্ডের গ্লোবাল গ্লো */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-8xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold italic tracking-tight">
            How It <span className="text-[#7c74ff]">Works</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
            Experience the seamless flow of voice-first commerce powered by next-generation generative AI.
          </p>
        </div>

        {/* --- STEPS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-[#11131c]/40 border border-gray-900/60 p-8 rounded-[32px] relative group hover:border-indigo-500/40 transition-all duration-500 hover:scale-[1.03] shadow-2xl flex flex-col justify-between overflow-hidden"
            >
             
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none`} />

              <div className="space-y-6 relative z-10">
                {/* Upper Row: Icon & Step Number */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-[#12151e] border border-gray-800/80 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-black/60 group-hover:border-indigo-500/30 transition-all duration-500">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black italic tracking-widest text-gray-800/40 group-hover:text-indigo-500/30 transition-colors duration-500 select-none">
                    {step.id}
                  </span>
                </div>

                {/* Step Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-black italic tracking-wide text-white group-hover:text-[#7c74ff] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-[14px] font-medium leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>

              
              <div className="relative w-full h-[2px] bg-gray-900 mt-6 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-12 bg-gray-700 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#5046e5] group-hover:to-purple-500 transition-all duration-700 ease-out" />
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;