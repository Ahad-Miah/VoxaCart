import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { FaTwitter,FaInstagram,FaLinkedin,FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-[#09090d] text-white pt-16 pb-8 px-6 md:px-12 border-t border-gray-950 transition-colors duration-300">
      {/* --- UPPER FOOTER CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* COLUMN 1: Logo & Tagline */}
        <div className="flex flex-col space-y-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="bg-[#5046e5] p-2.5 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold italic tracking-wide select-none">
              VoxaCart<span className="text-[#7c74ff]">AI</span>
            </span>
          </div>
          
          {/* Tagline text from image */}
          <p className="text-gray-500 text-[15px] font-medium leading-relaxed max-w-sm">
            Building the future of voice-first commerce. Empowering buyers and sellers with generative AI logistics.
          </p>
          
          {/* Social Icons Row (Matching the image boxes) */}
          <div className="flex items-center space-x-3 pt-2">
            {[
              { icon: <FaInstagram  className="w-5 h-5" />, href: "#" },
              { icon: <FaTwitter className="w-5 h-5" />, href: "#" },
              { icon: <FaGithub  className="w-5 h-5" />, href: "#" }, // এখানেও GitHub করা হয়েছে
              { icon: <FaLinkedin  className="w-5 h-5" />, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 bg-[#12151e] border border-gray-900/60 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1f2c] transition duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* COLUMN 2: Platform Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-gray-500 text-xs font-black italic tracking-widest uppercase mb-2">
            PLATFORM
          </h4>
          <ul className="space-y-3 text-[15px] font-black italic text-gray-300 tracking-wide">
            <li><a href="#" className="hover:text-white transition">Browse Shop</a></li>
            <li><a href="#" className="hover:text-white transition">Voice Search</a></li>
            <li><a href="#" className="hover:text-white transition">Vendor Hub</a></li>
            <li><a href="#" className="hover:text-white transition">Affiliate Program</a></li>
          </ul>
        </div>

        {/* COLUMN 3: Company Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-gray-500 text-xs font-black italic tracking-widest uppercase mb-2">
            COMPANY
          </h4>
          <ul className="space-y-3 text-[15px] font-black italic text-gray-300 tracking-wide">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Brand Assets</a></li>
          </ul>
        </div>

        {/* COLUMN 4: Legal Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-gray-500 text-xs font-black italic tracking-widest uppercase mb-2">
            LEGAL
          </h4>
          <ul className="space-y-3 text-[15px] font-black italic text-gray-300 tracking-wide">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">Cookie Settings</a></li>
            <li><a href="#" className="hover:text-white transition">Security</a></li>
          </ul>
        </div>

      </div>

      {/* --- LOWER FOOTER: Copyright & Language --- */}
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-gray-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-black italic text-gray-500 tracking-wide">
        <div>
          &copy; 2026 VoxaCart AI. All rights reserved.
        </div>
        <div className="hover:text-gray-300 cursor-pointer transition">
          English (US)
        </div>
      </div>
    </footer>
  );
};

export default Footer;