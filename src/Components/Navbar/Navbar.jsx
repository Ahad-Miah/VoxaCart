import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingCart, Mic, Sun, Moon, Sparkles, RefreshCw } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinks = ['HOME','ALL PRODUCTS', 'CATEGORIES', 'VENDORS', 'SUPPORT'];
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFinished, setIsFinished] = useState(false); 
  
  const recognitionRef = useRef(null);

 
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#0b0b0f';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f3f4f6';
    }
  }, [isDarkMode]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;       
      rec.interimResults = true;  

      rec.onstart = () => {
        setIsListening(true);
        setIsFinished(false);
      };

      rec.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript || interimTranscript);
      };

      rec.onerror = (e) => {
        console.error("Speech Recognition Error: ", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
        setIsFinished(true); 
      };

      recognitionRef.current = rec;
    }
  }, []);

  
  const startListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch (e) {}
    
    setTranscript('');
    setIsFinished(false);
    recognitionRef.current.start();
  };

  const openVoiceModal = () => {
    setIsVoiceModalOpen(true);
    setIsOpen(false);
    setTranscript('');
    setIsFinished(false);
    
    setTimeout(() => {
      if (recognitionRef.current) recognitionRef.current.start();
    }, 300);
  };

  const closeVoiceModal = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e){}
    }
    setIsVoiceModalOpen(false);
  };

  return (
    <>
     
      <nav className="bg-[#09090d] dark:bg-[#09090d] bg-white text-gray-800 dark:text-white px-10 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-900 sticky top-0 z-50 transition-colors duration-300">
        {/* Left: Logo */}
        <Link to={'/'}>
         <div className="flex items-center space-x-3">
          <div className="bg-[#5046e5] p-2.5 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold italic tracking-wide select-none dark:text-white text-gray-900">
            VoxaCart<span className="text-[#7c74ff]">AI</span>
          </span>
        </div>
        </Link>
       

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10 text-xs font-black italic tracking-wider text-gray-500 dark:text-gray-400">
          {navLinks.map((link,idx) => (
            <NavLink
            className={({ isActive }) =>
                isActive ? " text-white font-bold text-[16px] underline " : ""}
            to={`/${link=="HOME"?'':link}`}> <p key={idx} href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-gray-900 dark:hover:text-white transition duration-200">
              {link}
            </p></NavLink>
            
          ))}
        </div>

        {/* Right: Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <button onClick={openVoiceModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-200">
            <Mic className="w-5 h-5" />
          </button>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-200">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-800"></div>
          <div className="bg-gray-100 dark:bg-[#161922] border border-gray-200 dark:border-gray-800/60 rounded-2xl p-1.5 pr-5 flex items-center space-x-3 select-none">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" className="w-10 h-10 rounded-xl object-cover" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-gray-400 dark:text-gray-500 font-black italic tracking-widest leading-none mb-0.5">WELCOME</span>
              <span className="text-xs font-black italic text-gray-800 dark:text-white tracking-wide">Ahad Ahmed</span>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(true)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* --- MOBILE DRAWER --- */}
      <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-[#0d0d14] border-l border-gray-200 dark:border-gray-900 p-6 transform transition-transform duration-300 ease-in-out shadow-2xl lg:hidden flex flex-col justify-between ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div>
          <div className="flex justify-end mb-6">
            <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
          </div>
          <div className="bg-gray-100 dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-2xl p-3 flex items-center space-x-4 mb-8">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" className="w-12 h-12 rounded-xl object-cover" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-gray-400 dark:text-gray-500 font-black italic tracking-widest leading-none mb-0.5">WELCOME</span>
              <span className="text-sm font-black italic text-white tracking-wide">Ahad Ahmed</span>
            </div>
          </div>
          <div className="flex flex-col space-y-5 text-sm font-black italic tracking-wider text-gray-500 dark:text-gray-400">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} onClick={() => setIsOpen(false)} className="hover:text-gray-900 dark:hover:text-white block py-1">{link}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-900 pt-6">
          <div className="flex items-center justify-around text-gray-500 dark:text-gray-400">
            <button onClick={openVoiceModal} className="hover:text-gray-900 dark:hover:text-white flex flex-col items-center space-y-1">
              <Mic className="w-5 h-5" />
              <span className="text-[10px] font-bold italic">Voice</span>
            </button>
            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800"></div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:text-gray-900 dark:hover:text-white flex flex-col items-center space-y-1">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="text-[10px] font-bold italic">Theme</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- UI EXACT MATCH VOICE MODAL (image_6e8d5a.png) --- */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#090b11]/80 backdrop-blur-md" onClick={closeVoiceModal} />
          
          <div className="relative bg-[#0d111b] border border-gray-800/80 w-full max-w-[440px] rounded-[36px] p-8 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Background Abstract Design Star */}
            <div className="absolute -top-4 -right-4 w-40 h-40 opacity-15 pointer-events-none text-gray-400">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path d="M50 10 C50 40 40 50 10 50 C40 50 50 60 50 90 C50 60 60 50 90 50 C60 50 50 40 50 10 Z" />
                <circle cx="20" cy="80" r="4" fill="currentColor" />
              </svg>
            </div>

            {/* Top Close Button */}
            <div className="w-full flex justify-end relative z-10">
              <button onClick={closeVoiceModal} className="p-2 bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white rounded-full transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Microphone Button Circle */}
            <div className="mt-2 mb-6 relative flex items-center justify-center">
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full border border-indigo-500/30 scale-125 opacity-100 animate-pulse"></div>
                  <div className="absolute inset-[-10px] rounded-full border border-indigo-500/10 scale-135 opacity-75 animate-ping"></div>
                </>
              )}
              
              <button 
                onClick={startListening}
                disabled={isListening}
                className={`relative z-10 p-5 rounded-full text-white transition-all duration-300 shadow-2xl ${
                  isListening 
                    ? 'bg-[#3b32d4] shadow-indigo-500/50 scale-105' 
                    : 'bg-[#1b1f2e] hover:bg-[#252b41] border border-gray-800'
                }`}
              >
                <Mic className={`w-7 h-7 ${isListening ? 'text-white' : 'text-indigo-400'}`} />
              </button>
            </div>

            {/* Dynamic Status Heading */}
            <h3 className="text-2xl font-extrabold text-white mb-6 tracking-wide select-none min-h-[32px]">
              {isListening ? 'Listening...' : isFinished ? 'Listening End' : 'Ready'}
            </h3>
            
            {/* Live Text Showcase Box (Dotted Outline) */}
            <div className="w-full bg-[#111622]/40 border-2 border-dashed border-gray-800/80 rounded-[24px] p-6 min-h-[110px] flex flex-col items-center justify-center mb-6 relative">
              <p className="text-lg font-bold italic text-gray-300 px-2 line-clamp-3">
                {transcript || (isListening ? 'Say something...' : 'Click mic to speak')}
              </p>
              
              {/* 'Try Again' Action Text Button (কথা বলা শেষ হলে এটি ভেসে উঠবে) */}
              {isFinished && (
                <button 
                  onClick={startListening}
                  className="mt-3 flex items-center space-x-1.5 text-xs font-black text-[#7c74ff] hover:text-white transition duration-200 uppercase tracking-widest bg-[#1c2336] px-3 py-1.5 rounded-xl border border-gray-800"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Try Again</span>
                </button>
              )}
            </div>

            {/* Find Products Button */}
            <button 
              onClick={closeVoiceModal}
              className="w-full max-w-[200px] bg-white text-gray-900 font-extrabold rounded-full py-3 px-6 hover:bg-gray-100 shadow-xl transition-all duration-200 text-sm tracking-wide mb-8"
            >
              Find Products
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;