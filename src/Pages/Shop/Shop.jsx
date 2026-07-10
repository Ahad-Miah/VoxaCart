import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Package, ShieldCheck, ShoppingBag, Store, MapPin, Globe } from "lucide-react";

const Shop = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [categories, setCategories] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShop = async () => {
      try {
        const vRes = await axios.get(`http://localhost:5000/vendor/${id}`);
        setVendor(vRes.data);
        const pRes = await axios.get(`http://localhost:5000/myProduct/${vRes.data.email}`);
        
        const catGroup = pRes.data.reduce((acc, item) => {
          const cat = item.category || "Others";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {});
        setCategories(catGroup);
        setLoading(false);
      } catch (e) { console.error(e); setLoading(false); }
    };
    loadShop();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#09090d] flex items-center justify-center text-indigo-500 font-black animate-pulse">LOADING VENDOR STORE...</div>;

  return (
    <div className="min-h-screen bg-[#09090d] text-white p-6 md:p-12 relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* VENDOR HEADER */}
        <section className="mb-12 bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center gap-8">
          <img src={vendor?.profileImage} className="w-32 h-32 rounded-3xl object-cover border-4 border-[#09090d]" />
          <div>
            <h1 className="text-4xl font-black italic uppercase flex items-center gap-3">
              {vendor?.shopName} <ShieldCheck className="text-emerald-400 w-8 h-8" />
            </h1>
            <p className="text-gray-400 mt-2">{vendor?.description}</p>
          </div>
        </section>

        {/* ACCORDION CATEGORIES */}
        <div className="space-y-4">
          {Object.entries(categories).map(([catName, items], idx) => (
            <div key={catName}>
              <motion.button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${
                  activeIndex === idx ? 'bg-indigo-600 border-indigo-400' : 'bg-[#11131c] border-gray-800 hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center gap-4 text-xl font-black uppercase">
                  <Package className="text-indigo-400" /> {catName}
                </div>
                <ChevronDown className={`transition-transform ${activeIndex === idx ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {items.map((p) => (
                        <div key={p._id} className="bg-[#0e101a] border border-white/5 rounded-3xl overflow-hidden group hover:border-indigo-500 transition">
                          <img src={p.image} className="w-full h-48 object-cover group-hover:scale-110 transition duration-500" />
                          <div className="p-5">
                            <h4 className="font-bold truncate">{p.name}</h4>
                            <p className="text-indigo-400 font-black text-xl mb-4">${p.price}</p>
                            <Link to={`/details/${p._id}`}>
                            <button className="w-full py-3 bg-indigo-600 rounded-xl font-black uppercase hover:bg-indigo-500 transition">View Product</button></Link>
                            
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;