import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Mic, MicOff, Sparkles, ShoppingBag, Star, ArrowUpDown, X, RefreshCw, Check,
  Cpu, Layers, Home, Droplet, Trophy, HeartPulse, Watch, Smartphone, Box, Heart, Eye
} from 'lucide-react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/Authprovider/AuthProvider';

const categoryIcons = {
  All: <Box className="w-3.5 h-3.5" />,
  Electronics: <Cpu className="w-3.5 h-3.5" />,
  Fashion: <Layers className="w-3.5 h-3.5" />,
  "Home & Living": <Home className="w-3.5 h-3.5" />,
  Beauty: <Droplet className="w-3.5 h-3.5" />,
  Sports: <Trophy className="w-3.5 h-3.5" />,
  Health: <HeartPulse className="w-3.5 h-3.5" />,
  Accessories: <Watch className="w-3.5 h-3.5" />,
  Gadgets: <Smartphone className="w-3.5 h-3.5" />
};

const AllProducts = () => {
  const navigate = useNavigate();
  // const user?.email = "user@voxa.com";
  const {user}=useContext(AuthContext);

  // মূল ডাটা স্টেটস
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // মোডাল স্টেটস
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiSelectedCategories, setAiSelectedCategories] = useState([]);
  const [aiActiveFilters, setAiActiveFilters] = useState(null); // { categories: [...] }

  // ১. ডাটাবেজ থেকে ডাটা ফেচিং
  useEffect(() => {
    const fetchEcosystemData = async () => {
      try {
        const prodRes = await axios.get('http://localhost:5000/products');
        setProducts(prodRes.data || []);
        
        const catRes = await axios.get('http://localhost:5000/category');
        const fetchedCats = catRes.data || [];
        
        // ক্যাটাগরি ডাটা নরমালআইজেশন (id এবং name ট্র্যাকিং ফিক্সড)
        const normalizedCats = fetchedCats.map(c => {
          if (typeof c === 'string') {
            return { id: c, name: c };
          }
          return { id: c.id || c._id || c.name, name: c.name || c.id };
        });
        
        if (!normalizedCats.some(c => c.id === 'All' || c.name === 'All')) {
          setCategories([{ id: 'All', name: 'All' }, ...normalizedCats]);
        } else {
          setCategories(normalizedCats);
        }
      } catch (error) {
        console.error("Data Stream Error:", error);
      }
    };
    fetchEcosystemData();
  }, []);

  // ২. ভয়েস রিকগনিশন ইঞ্জিন
  const startListeningInstance = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      Swal.fire({ icon: 'error', title: 'Oops', text: 'Speech engine not supported in browser.', background: '#0c0d14', color: '#fff' });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const currentText = event.results[event.results.length - 1][0].transcript;
      setVoiceText(prev => (prev + ' ' + currentText).trim());
    };

    recognition.start();
    setRecognitionInstance(recognition);
  };

  const stopListeningInstance = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
    }
    setIsListening(false);
  };

  const openVoiceModal = () => {
    setIsVoiceModalOpen(true);
    setVoiceText('');
    setTimeout(() => startListeningInstance(), 300);
  };

  const closeVoiceModal = () => {
    stopListeningInstance();
    setIsVoiceModalOpen(false);
  };

  const handleVoiceSearchSubmit = () => {
    setSearchQuery(voiceText);
    setAiActiveFilters(null); // রিসেট এআই ফিল্টার অন ভয়েস সার্চ
    closeVoiceModal();
  };

  // ৩. কার্ট এবং উইশলিস্ট হ্যান্ডলারস
const handleAddToCart = async (product) => {
  // ১. চেক করা হচ্ছে ইউজার লগইন করা আছে কি না
  if (!user || !user?.email) {
    return Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please login first to add products to your cyber cart!',
      background: '#0c0d14',
      color: '#fff',
      confirmButtonColor: '#5046e5'
    });
  }

  try {
    // ২. ইউজার লগইন থাকলে ডাটা রেডি করা হবে
    const cartItem = {
      productId: product._id || product.id,
      userEmail: user?.email, // আপনার রিকোয়ারমেন্ট অনুযায়ী user?.email নেওয়া হয়েছে
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating
    };

    const response = await axios.post('http://localhost:5000/cart', cartItem);

    if (response.data.success) {
      Swal.fire({ 
        toast: true, 
        position: 'top-end', 
        icon: 'success', 
        title: response.data.message || 'Cart Synced Successfully!', 
        showConfirmButton: false, 
        timer: 2000, 
        background: '#0c0d14', 
        color: '#fff' 
      });
    }
  } catch (error) {
    console.error("Cart Error:", error);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Failed to add item to cart.',
      showConfirmButton: false,
      timer: 2000,
      background: '#0c0d14',
      color: '#fff'
    });
  }
};

const handleAddToWishlist = async (product) => {
  try {
    const wishItem = {
      productId: product._id || product.id,
      userEmail: user?.email,
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating,
      category: product.category
    };
    
    const response = await axios.post('http://localhost:5000/wishlist', wishItem);
    
    
    if (response.data.insertedId || response.data.acknowledged) {
      Swal.fire({ 
        toast: true, 
        position: 'top-end', 
        icon: 'success', 
        title: 'Locked into Wishlist!', 
        showConfirmButton: false, 
        timer: 2000, 
        background: '#0c0d14', 
        color: '#fff' 
      });
    }
  } catch (error) {
    
    if (error.response && error.response.status === 409) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: error.response.data.message || 'Already in Wishlist!',
        showConfirmButton: false,
        timer: 2500,
        background: '#0c0d14',
        color: '#ffc107'
      });
    } else {
    
      console.error(error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to sync wishlist.',
        showConfirmButton: false,
        timer: 2000,
        background: '#0c0d14',
        color: '#fff'
      });
    }
  }
};

 
  const handleAiCategoryToggle = (catName) => {
    if (catName === 'All') return;
    setAiSelectedCategories(prev => 
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  const applyAiRecommendation = () => {
    if (aiSelectedCategories.length === 0) {
      Swal.fire({ text: 'Select at least 1 category for AI analytics.', icon: 'warning', background: '#0c0d14', color: '#fff' });
      return;
    }
    setAiActiveFilters({ categories: aiSelectedCategories });
    setSelectedCategory('All'); // গ্লোবাল ক্যাটাগরি রিসেট
    setIsAiModalOpen(false);
  };

  // ৫. গ্লোবাল কাস্টম ফিল্টারিং, সর্টিং এবং ১টি অক্ষর মিললেও খোঁজার ডিপ অ্যালগরিদম
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // এআই মাল্টি-ক্যাটাগরি ফিল্টার একটিভ থাকলে: Low Price + High Rating সর্টিং এক্সিকিউট হবে
    if (aiActiveFilters) {
      result = result.filter(p => aiActiveFilters.categories.map(c => c.toLowerCase()).includes(p.category?.toLowerCase()));
      // Low Price এবং High Rating লজিক একসাথে প্রসেস করার সর্টিং ম্যাট্রিক্স
      result.sort((a, b) => Number(a.price) - Number(b.price) || Number(b.rating) - Number(a.rating));
      return result;
    }

    // জেনারেল সিঙ্গেল ক্যাটাগরি ফিল্টার ('All' হলে ফিল্টার স্কিপ করবে)
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    // ডিপ সার্চ ম্যাচিং ইঞ্জিন (১টি সাধারণ ওয়ার্ড বা এক চিমটি অংশ মিললেও ডাটা রিটার্ন করবে)
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        String(p.id || p._id).toLowerCase().includes(q) ||
        String(p.price).includes(q) ||
        String(p.rating).includes(q) ||
        String(p.stock || p.stocks || '').includes(q) ||
        p.colour?.toLowerCase().includes(q) ||
        p.color?.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q) ||
        (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q))) ||
        (typeof p.tags === 'string' && p.tags.toLowerCase().includes(q))
      );
    }

    // জেনারেল নরমাল সর্টিং (যখন AI Active থাকবে না)
    if (!aiActiveFilters) {
      if (sortBy === 'lowToHigh') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'highToLow') {
        result.sort((a, b) => b.price - a.price);
      }
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy, aiActiveFilters]);

  return (
    <div className="bg-[#050508] text-white min-h-screen overflow-x-clip relative select-none pb-32">
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-20%] left-[10%] w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/10 to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-600/5 to-transparent blur-[140px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto pt-24 pb-4 px-6 md:px-12 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1 rounded-full text-[10px] font-black italic tracking-widest text-[#7c74ff] uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Voxa Ultra Catalog
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold italic tracking-tighter uppercase">
          All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">Products</span> GRID
        </h1>
      </div>

      {/* CATEGORIES NAVIGATION BAR */}
      <div className="sticky top-24 z-10 max-w-6xl mx-auto px-4 md:px-6 my-8">
        <div className="bg-[#0d0f17]/80 border border-gray-900/90 rounded-[24px] p-2.5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full py-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name && !aiActiveFilters;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.name); setAiActiveFilters(null); }}
                  className={`text-[10px] font-black italic tracking-wider uppercase px-4 py-3 rounded-xl transition-all duration-300 shrink-0 flex items-center gap-2 border ${
                    isActive 
                      ? 'bg-[#5046e5] border-transparent text-white shadow-lg shadow-indigo-500/30 scale-[1.03]' 
                      : 'bg-black/40 border-gray-900 text-gray-400 hover:text-white hover:border-gray-800'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-indigo-400'}>
                    {categoryIcons[cat.name] || <Box className="w-3.5 h-3.5" />}
                  </span>
                  {cat.name === 'All' ? 'All Products' : cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEARCH CONTROL HUB */}
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 bg-[#11131c]/40 border border-gray-900/80 focus-within:border-[#5046e5]/50 px-5 py-3.5 rounded-[20px] backdrop-blur-md transition-all duration-300 shadow-inner w-full md:max-w-xl">
          <Search className="w-4 h-4 text-gray-600 shrink-0" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setAiActiveFilters(null); }}
            placeholder="Search matching title, tag, material, color, price..."
            className="bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none w-full font-medium"
          />
          <div onClick={openVoiceModal} className="cursor-pointer p-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/30 transition">
            <Mic className="w-4 h-4 text-indigo-400" />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#11131c]/40 border border-gray-900/80 px-4 py-3 rounded-[20px] backdrop-blur-md w-full md:w-auto shrink-0">
          <ArrowUpDown className="w-4 h-4 text-indigo-400 shrink-0" />
          <select
            value={sortBy}
            disabled={!!aiActiveFilters}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-black italic tracking-wider text-gray-400 uppercase focus:outline-none cursor-pointer w-full md:w-auto disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <option value="default" className="bg-[#0c0d14] text-white">Default Matrix</option>
            <option value="lowToHigh" className="bg-[#0c0d14] text-white">Price: Low to High</option>
            <option value="highToLow" className="bg-[#0c0d14] text-white">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* AI RECOMMENDATION ACTIVE BAR */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <button 
          onClick={() => { setIsAiModalOpen(true); }}
          className={`w-full p-4 rounded-[24px] border transition-all duration-500 flex items-center justify-between group text-left ${
            aiActiveFilters 
              ? 'bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500 shadow-[0_0_25px_rgba(139,92,246,0.2)]' 
              : 'bg-[#0a0c14] border-gray-900 hover:border-purple-500/30'
          }`}
        >
          <div className="flex items-center gap-3 text-left">
            <div className={`p-2.5 rounded-xl ${aiActiveFilters ? 'bg-purple-500 text-white animate-pulse' : 'bg-purple-500/10 text-purple-400'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black italic uppercase tracking-wider">AI Synapse Multi-Category Engine</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {aiActiveFilters ? `Optimized Matrix Enabled for: ${aiActiveFilters.categories.join(', ')} (Low Price + High Rating)` : "Tap to select multiple categories using checkboxes and filter best deals."}
              </p>
            </div>
          </div>
          <span className={`text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg border uppercase shrink-0 ${
            aiActiveFilters ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-black border-gray-800 text-gray-500 group-hover:text-purple-400'
          }`}>
            {aiActiveFilters ? "SYSTEM ACTIVE" : "BOOT AI"}
          </span>
        </button>
      </div>

      {/* PRODUCTS DISPLAY GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product._id || product.id}
                className="bg-[#0c0d14] border border-gray-900/80 rounded-[28px] p-3 relative group hover:border-[#5046e5]/40 transition-all duration-500 flex flex-col justify-between shadow-2xl overflow-hidden"
              >
                <div className="space-y-4">
                  {/* IMAGE AND ACTIONS OVERLAY */}
                  <div className="aspect-square w-full relative overflow-hidden rounded-[20px] bg-black/60 border border-gray-950">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-transparent to-transparent opacity-90" />
                    
                    <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-gray-800 text-gray-400 text-[8px] font-black italic tracking-widest uppercase px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                    {/* ACTIONS BUTTONS */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button 
                        onClick={() => handleAddToWishlist(product)}
                        className="p-2 bg-black/80 hover:bg-rose-600/20 rounded-xl border border-gray-800 hover:border-rose-500 text-gray-400 hover:text-rose-400 transition backdrop-blur-sm"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <Link to={`/details/${product._id || product.id}`}>
                      <button 
                        className="p-2 bg-black/80 hover:bg-indigo-600/20 rounded-xl border border-gray-800 hover:border-indigo-500 text-gray-400 hover:text-indigo-400 transition backdrop-blur-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      </Link>
                      
                    </div>
                  </div>
                  {/* METADATA BLOCK */}
                  <div className="space-y-1 px-1">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="text-[10px] font-bold text-gray-500">{product.rating || '4.7'}</span>
                    </div>
                    <h3 className="text-base font-black italic tracking-wide text-white group-hover:text-[#7c74ff] transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                </div>
                {/* BOTTOM PRICE AND PURCHASE ROW */}
                <div className="pt-4 mt-4 border-t border-gray-900/40 flex items-center justify-between px-1">
                  <div>
                    <p className="text-[8px] font-black italic text-gray-600 uppercase tracking-widest">NET VAL</p>
                    <p className="text-lg font-black italic text-white">${product.price}</p>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="text-[10px] font-black italic tracking-wider text-white bg-[#5046e5] hover:bg-[#6359e9] px-3.5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add To Cart
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-[#5046e5] to-purple-500 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#0d0f17]/30 border border-gray-900 rounded-[28px]">
            <p className="text-gray-500 font-black italic tracking-widest uppercase text-xs">No Matrix Matches Your Query</p>
          </div>
        )}
      </div>

      {/* ==================== CYBER VOICE MODAL ==================== */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0c16] border border-gray-900 w-full max-w-lg rounded-[32px] p-6 relative shadow-[0_0_55px_rgba(80,70,229,0.15)] space-y-6">
            <button onClick={closeVoiceModal} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black uppercase tracking-wider text-white italic">Neural Voice Stream</h3>
              <p className="text-xs text-gray-500">System is capture processing your vocal query inputs...</p>
            </div>
            {/* LIVE AUDIO WAVE ANIMATION */}
            <div className="flex items-center justify-center gap-1.5 h-16">
              {isListening ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="w-1 bg-indigo-500 rounded-full animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
                ))
              ) : (
                <div className="w-full text-center text-xs font-mono text-red-500 uppercase tracking-widest">[ Core Listening Paused ]</div>
              )}
            </div>
            {/* DISPLAY LOGICAL STRING */}
            <div className="bg-black/50 border border-gray-950 p-4 rounded-2xl min-h-[100px] text-sm font-medium text-gray-300 italic">
              {voiceText || "Listening for spectral waveform commands..."}
            </div>
            {/* ACTION FOOTER PANEL */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => { stopListeningInstance(); setVoiceText(''); setTimeout(() => startListeningInstance(), 200); }}
                className="py-3 px-4 rounded-xl border border-gray-800 text-xs font-black uppercase tracking-wider bg-black/40 hover:text-white hover:border-gray-700 flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Try Again
              </button>
              <button 
                onClick={handleVoiceSearchSubmit}
                className="py-3 px-4 rounded-xl bg-[#5046e5] text-xs font-black uppercase tracking-wider text-white hover:bg-[#6359e9] flex items-center justify-center gap-2 shadow-lg transition"
              >
                Find Products
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== AI RECOMMENDATION MODAL ==================== */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0c16] border border-gray-900 w-full max-w-xl rounded-[32px] p-6 relative shadow-[0_0_55px_rgba(139,92,246,0.15)] space-y-6">
            <button onClick={() => setIsAiModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black uppercase tracking-wider text-purple-400 italic">Select Synapse Segments</h3>
              <p className="text-xs text-gray-500">Pick multiple clusters to trigger optimized budget/rate sorting</p>
            </div>

            {/* MULTIPLE CATEGORY SELECTION WITH MODERN CHECKBOX */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto no-scrollbar p-1">
              {categories.filter(c => c.name !== 'All').map((cat) => {
                const isSelected = aiSelectedCategories.includes(cat.name);
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleAiCategoryToggle(cat.name)}
                    className={`p-3.5 rounded-xl border text-[11px] font-black uppercase tracking-wider cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      isSelected 
                        ? 'bg-purple-600/10 border-purple-500 text-purple-300 shadow-md' 
                        : 'bg-black/40 border-gray-900 text-gray-400 hover:border-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={isSelected ? 'text-purple-400' : 'text-gray-500'}>
                        {categoryIcons[cat.name] || <Box className="w-3.5 h-3.5" />}
                      </span>
                      {cat.name}
                    </span>
                    
                    {/* CUSTOM DESIGNED CYBER CHECKBOX */}
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                      isSelected ? 'bg-purple-600 border-purple-400' : 'border-gray-700 bg-black/60'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[4]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ACTION TRIGGER BUTTON */}
            <button 
              onClick={applyAiRecommendation}
              className="w-full py-3.5 rounded-xl bg-purple-600 text-xs font-black uppercase tracking-wider text-white hover:bg-purple-500 shadow-xl shadow-purple-900/20 transition-all duration-300"
            >
              Analyze & Extract Matrix
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;