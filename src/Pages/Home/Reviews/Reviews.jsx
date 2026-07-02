import React from 'react';
import { Star, Quote, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Verified Shopper',
    comment: 'Ordering products by just speaking in my native language felt like magic. The AI picked up my exact size preferences and handled the purchase in less than a second!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    tag: 'Voice Shopping',
    gradient: 'from-blue-600/10 via-indigo-600/20 to-transparent',
  },
  {
    id: 2,
    name: 'Rahat Chowdhury',
    role: 'Apex Digital (Vendor)',
    comment: 'As a vendor, managing logistics was always a nightmare. VoxaCart’s automated AI pipeline streamlined our entire shipping process directly to the user’s doorstep.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    tag: 'AI Logistics Partner',
    gradient: 'from-indigo-600/10 via-purple-600/20 to-transparent',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Tech Enthusiast',
    comment: 'The 0.24s voice processing latency is absolutely insane. It understands context better than any other standard voice assistant I have ever used before.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    tag: 'NLP Accuracy',
    gradient: 'from-purple-600/10 via-pink-600/20 to-transparent',
  },
];

const Reviews = () => {
  return (
    <section className="bg-[#09090d] text-white py-24 px-6 md:px-12 relative overflow-hidden select-none border-t border-gray-950">
      
      
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-pink-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-8xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#5046e5]/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-black italic tracking-widest text-[#7c74ff] uppercase">
            <MessageSquare className="w-3.5 h-3.5" /> Global Feedback
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold italic tracking-tight leading-none">
            Trusted by <span className="text-[#7c74ff]">Thousands</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
            Discover how buyers and verified sellers are redefining global commerce through our generative voice network.
          </p>
        </div>

        {/* --- REVIEWS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-[#11131c]/40 border border-gray-900/60 p-8 rounded-[32px] relative group hover:border-indigo-500/40 transition-all duration-500 hover:scale-[1.03] shadow-2xl flex flex-col justify-between overflow-hidden min-h-[340px]"
            >
              
              <div className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none`} />

              <div className="space-y-6 relative z-10">
                {/* Top Row: Stars and Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gray-800/60 group-hover:text-indigo-500/20 transform group-hover:rotate-12 transition-all duration-500" />
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-[14px] font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                  "{review.comment}"
                </p>
              </div>

              {/* Bottom Profile Information */}
              <div className="relative z-10 pt-6 border-t border-gray-900/60 mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl border border-gray-800 overflow-hidden bg-gray-900 shadow-md">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black italic tracking-wide text-white">
                      {review.name}
                    </h4>
                    <p className="text-[11px] font-medium text-gray-500 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-indigo-400" /> {review.role}
                    </p>
                  </div>
                </div>

                {/* Feature Feature Tag Badge */}
                <span className="text-[9px] font-black italic tracking-wider text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-1 rounded-lg uppercase">
                  {review.tag}
                </span>
              </div>

            
              <div className="relative w-full h-[2px] bg-gray-900 overflow-hidden mt-6">
                <div className="absolute top-0 left-0 h-full w-12 bg-gray-700 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#5046e5] group-hover:to-purple-500 transition-all duration-700 ease-out" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;