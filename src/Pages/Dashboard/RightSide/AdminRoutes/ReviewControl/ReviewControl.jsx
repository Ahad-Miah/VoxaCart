import React from 'react';
import { Sliders, Trash2, Star, MessageSquare } from 'lucide-react';

const ReviewControl = () => {
  const flagReviews = [
    { id: "REV-44", user: "Naimur R.", rating: 1, text: "Foul language and fake review targeted to sabotage.", asset: "Mechanical Switch Pack" }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto select-none font-mono">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          OVERLORD / <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-indigo-400">REVIEW_CONTROLLERS</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">Moderate community feedback nodes or scrub flag reports.</p>
      </div>

      <div className="space-y-4">
        {flagReviews.length > 0 ? (
          flagReviews.map((rev) => (
            <div key={rev.id} className="bg-[#08090e]/60 border border-gray-900 rounded-[22px] p-5 backdrop-blur-xl relative group hover:border-red-500/20 transition-all duration-300">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold text-[#7c74ff] bg-indigo-950/50 border border-indigo-500/20 px-2 py-0.5 rounded">{rev.id}</span>
                    <span className="text-xs font-bold text-white">{rev.user}</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'opacity-20'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-400 italic flex items-start gap-2 bg-black/30 p-3 rounded-xl border border-gray-950">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-0.5" />
                    "{rev.text}"
                  </p>

                  <span className="text-[9px] text-gray-600 block uppercase tracking-widest">Target Item: <span className="text-gray-400 font-bold">{rev.asset}</span></span>
                </div>

                <div className="flex justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-900/40 shrink-0">
                  <button className="w-full sm:w-auto bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2">
                    <Trash2 className="w-3.5 h-3.5" /> WIPE_FEEDBACK
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="border border-dashed border-gray-900 rounded-2xl p-12 text-center text-gray-600 text-xs uppercase">
            No flagged community reviews in moderation buffer.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewControl;