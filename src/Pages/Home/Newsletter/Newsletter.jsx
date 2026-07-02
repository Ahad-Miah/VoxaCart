import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-[#09090d] text-white py-24 px-6 md:px-12 relative overflow-hidden select-none border-t border-gray-950">
      
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-600/10 to-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
       
        <div className="bg-[#11131c]/30 border border-gray-900/80 rounded-[40px] p-8 md:p-16 relative group hover:border-indigo-500/20 transition-all duration-700 shadow-3xl overflow-hidden text-center">
          
          
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/[0.02] via-purple-600/[0.03] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            
            {/* --- TOP BADGE & ICON --- */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-[#12151e] border border-gray-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-indigo-500/30 transition-all duration-500">
                <Mail className="w-6 h-6 text-indigo-400 group-hover:text-[#7c74ff] transition-colors" />
              </div>
              
              <div className="inline-flex items-center gap-1.5 bg-[#5046e5]/10 border border-indigo-500/20 px-4 py-1 rounded-full text-[11px] font-black italic tracking-widest text-[#7c74ff] uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Stay Ahead With AI
              </div>
            </div>

            {/* --- HEADER TEXT --- */}
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-extrabold italic tracking-tight leading-none">
                Join the <span className="text-[#7c74ff]">Ecosystem</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
                Subscribe to receive early-access updates, vendor drops, and the latest releases on generative voice commerce features.
              </p>
            </div>

            {/* --- INTERACTIVE SUBSCRIPTION FORM --- */}
            {!submitted ? (
              <form 
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-3 bg-black/40 border border-gray-900 focus-within:border-[#5046e5]/50 p-2 rounded-2xl md:rounded-[24px] max-w-lg mx-auto transition-all duration-300"
              >
                <div className="flex items-center gap-3 w-full px-3 py-2 sm:py-0">
                  <Mail className="w-5 h-5 text-gray-600 shrink-0" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email" 
                    className="w-full bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full sm:w-auto shrink-0 bg-[#5046e5] hover:bg-[#6359e9] text-white px-6 py-3.5 rounded-xl font-black italic tracking-wide text-xs uppercase flex items-center justify-center gap-2 transition duration-300 shadow-lg shadow-indigo-500/10"
                >
                  Subscribe Now <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* --- SUCCESS MESSAGE VIEW --- */
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-3 animate-scaleUp">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-sm font-black italic tracking-wide text-emerald-400 text-left">
                  Welcome to the future! Check your inbox soon.
                </p>
              </div>
            )}

            {/* --- PRIVACY GUARANTEE --- */}
            <p className="text-[10px] font-black italic tracking-widest text-gray-600 uppercase">
              No Spam. Zero Noise. Unsubscribe at any time.
            </p>

          </div>

          
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-950 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-24 bg-gray-700 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#5046e5] group-hover:to-purple-500 transition-all duration-[900ms] ease-out" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;