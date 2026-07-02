import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, ShieldCheck } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: 'How accurate is the VoxaCart voice recognition system?',
    answer: 'Our platform is powered by advanced next-generation Generative NLP models, achieving a 99.4% recognition accuracy. It understands natural language, context, accents, and complex shopping preferences instantaneously.',
    gradient: 'from-blue-600/10 via-indigo-600/10 to-transparent',
  },
  {
    id: 2,
    question: 'How do independent vendors fulfill AI logistics orders?',
    answer: 'Once a user confirms an order via voice, our automated AI logistics pipeline instantly triggers the shipping process. The vendor receives the order details, and our verified logistics network handles everything from the vendor’s hub to the user’s doorstep.',
    gradient: 'from-indigo-600/10 via-purple-600/10 to-transparent',
  },
  {
    id: 3,
    question: 'Is my voice data and financial information secure?',
    answer: 'Absolutely. VoxaCart AI utilizes end-to-end encrypted transaction protocols and decentralized data processing. Your voice commands are strictly used for contextual matching, and all payment channels are heavily protected.',
    gradient: 'from-purple-600/10 via-pink-600/10 to-transparent',
  },
  {
    id: 4,
    question: 'How can I register my store as a verified vendor?',
    answer: 'You can simply click the "Apply as a Vendor" button in our Multi-Vendor section, complete the 3-step documentation form (including your NID/TIN and store details), and our automated audit team will verify your account within 24 hours.',
    gradient: 'from-pink-600/10 via-emerald-600/10 to-transparent',
  },
];

const FaqSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#09090d] text-white py-24 px-6 md:px-12 relative overflow-hidden select-none border-t border-gray-950">
      
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#5046e5]/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-black italic tracking-widest text-[#7c74ff] uppercase">
            <HelpCircle className="w-3.5 h-3.5" /> Information Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold italic tracking-tight leading-none">
            Frequently Asked <span className="text-[#7c74ff]">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
            Got questions about VoxaCart AI? Find instant answers to how our voice commerce ecosystem operates.
          </p>
        </div>

        {/* --- FAQ ACCORDION LIST --- */}
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-[#11131c]/40 border border-gray-900/60 rounded-[24px] relative group hover:border-indigo-500/30 transition-all duration-300 overflow-hidden shadow-2xl"
              >
                
                <div className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} transition-opacity duration-500 rounded-[24px] pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />

                {/* Question Trigger Row */}
                <button 
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 relative z-10 focus:outline-none"
                >
                  <span className={`text-base md:text-lg font-black italic tracking-wide transition-colors duration-300 ${isOpen ? 'text-[#7c74ff]' : 'text-white group-hover:text-gray-200'}`}>
                    {faq.question}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#5046e5] border-transparent text-white rotate-180' : 'bg-[#12151e] border-gray-800 text-gray-400 group-hover:text-white'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

               
                <div 
                  className={`relative z-10 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 border-t border-gray-900/40 mt-1">
                    <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                   
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-900/20 text-[10px] font-black italic tracking-widest text-gray-500 uppercase">
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3 text-[#7c74ff]" /> Live Support Available</span>
                      <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified Info</span>
                    </div>
                  </div>
                </div>

               
                <div className="relative w-full h-[2px] bg-gray-900 overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full w-12 bg-gray-700 group-hover:bg-gradient-to-r group-hover:from-[#5046e5] group-hover:to-purple-500 transition-all duration-700 ease-out ${isOpen ? 'w-full bg-gradient-to-r from-[#5046e5] to-purple-500' : ''}`} />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;