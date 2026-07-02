import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Search, ChevronRight, Play } from 'lucide-react';

const heroImages = [
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
  "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80"
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative px-6 pt-16 pb-20 overflow-hidden bg-white dark:bg-gray-950">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-600/10 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              NEW: AI-POWERED VOICE SEARCH
            </div>

            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-gray-950 via-gray-800 to-gray-500 dark:from-white dark:via-gray-100 dark:to-gray-400 font-display italic">
              Listen to your <br /> 
              <span className="text-indigo-600 serif">Shopping intent.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-lg mb-10 leading-relaxed font-medium italic">
              The first multi-vendor marketplace where your voice leads the way. Natural processing, personalized results, and verified global vendors.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                className="group relative flex items-center gap-3 bg-indigo-600 text-white px-8 py-5 rounded-[2rem] font-bold text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 overflow-hidden"
              >
                <Mic size={24} className="group-hover:scale-125 transition-transform" />
                Try Voice Search
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              <button className="flex items-center gap-3 px-8 py-5 rounded-[2rem] font-bold text-lg border-2 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                <div className="w-10 h-10 border-2 border-indigo-600/20 rounded-full flex items-center justify-center">
                  <Play size={16} className="text-indigo-600 fill-indigo-600" />
                </div>
               
                <span className='text-white'> How it works</span>
              </button>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i}  src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-950" alt="user" />
                ))}
              </div>
              <p className="text-sm font-bold text-gray-400 dark:text-gray-500">
                <span className="text-gray-900 dark:text-white">12.5k+</span> shoppers used voice today
              </p>
            </div>
          </motion.div>

          {/* Hero Image Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl h-[450px] md:h-[600px] w-full">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentSlide}
                  src={heroImages[currentSlide]}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                  alt="Tech products slider"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Slider Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {heroImages.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-indigo-600' : 'bg-white/50 hover:bg-white'}`}
                  />
                ))}
              </div>

              {/* Product Floaties */}
              <div className="absolute top-10 left-10 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white animate-bounce">
                <p className="text-[10px] uppercase font-black tracking-widest mb-1 opacity-60 italic">Highest Rated</p>
                <p className="font-bold italic">MacBook Pro M3</p>
              </div>

              <div className="absolute bottom-12 right-10 p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <Search size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 italic">Search Match</p>
                    <p className="font-black text-lg italic">99.8% Accuracy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
