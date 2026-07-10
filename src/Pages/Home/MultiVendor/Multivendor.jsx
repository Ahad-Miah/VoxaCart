import React, { useEffect, useState } from 'react';
import { Star, CheckCircle, ArrowUpRight, ShoppingBag, ShieldCheck, UserPlus, X, ArrowRight, ArrowLeft, Store, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MultiVendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটা ফেচিং লজিক
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/verified-vendors');
        setVendors(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    storeName: '', storeCategory: '', storeAddress: '',
    nidOrTIN: '', termsAccepted: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);
  const handleClose = () => { setIsModalOpen(false); setCurrentStep(1); };

  return (
    <section className="bg-[#09090d] text-white py-20 px-6 md:px-12 relative overflow-hidden select-none border-t border-gray-950">
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-8xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold italic tracking-tight">
              Top Verified <span className="text-[#7c74ff]">Vendors</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl leading-relaxed">
              Connect directly with high-grade global stores. Fully integrated with our generative AI logistics network.
            </p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <Link to={'/dashboard/vendorRequests'}>
             <button className="text-xs font-black italic tracking-widest uppercase bg-[#5046e5] hover:bg-[#6359e9] text-white px-5 py-3 rounded-2xl transition duration-300 flex items-center gap-2 shadow-lg shadow-indigo-500/10 border border-indigo-500/30">
              <UserPlus className="w-4 h-4" /> Apply as a Vendor
             </button>
            </Link>
            <Link to={'/VENDORS'}>
            <button className="text-xs font-black italic tracking-widest uppercase text-gray-300 hover:text-white transition flex items-center gap-1 group py-2">
              View All Vendors <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200" />
            </button>
            </Link>
            
          </div>
        </div>

        {/* --- VENDORS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((n) => <div key={n} className="h-96 bg-gray-900/20 rounded-[32px] animate-pulse border border-gray-900" />)
          ) : (
            vendors.map((vendor) => (
              <div key={vendor._id} className="bg-[#11131c]/40 border border-gray-900/60 rounded-[32px] relative group hover:border-indigo-500/40 transition-all duration-500 hover:scale-[1.02] shadow-2xl overflow-hidden flex flex-col justify-between">
                <div className={`absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none`} />
                
                <div className="relative z-10">
                  <div className="h-32 w-full relative overflow-hidden rounded-t-[32px]">
                    <img src={vendor.banner || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600'} alt={vendor.shopName} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11131c] to-transparent" />
                    <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-black italic tracking-wider uppercase px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </div>

                  <div className="px-6 pb-6 relative -mt-10 space-y-4">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#11131c] overflow-hidden bg-gray-800 shadow-xl">
                      <img src={vendor.profileImage} alt={vendor.shopName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black italic tracking-wide text-white group-hover:text-[#7c74ff]">{vendor.shopName}</h3>
                      <p className="text-xs font-medium text-gray-400 mt-0.5">{vendor.category || 'General Store'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-black/20 border border-gray-900/40 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <div>
                          <p className="text-xs font-black italic text-white">{vendor.rating || 'N/A'}</p>
                          <p className="text-[10px] text-gray-500 font-medium">Rating</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border-l border-gray-900/60 pl-4">
                        <ShoppingBag className="w-4 h-4 text-indigo-400" />
                        <div>
                          <p className="text-xs font-black italic text-white">{vendor.totalProducts || 0}+</p>
                          <p className="text-[10px] text-gray-500 font-medium">Products</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-black italic tracking-widest text-gray-500 uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> AI Logistics
                  </span>
                  <button className="text-xs font-black italic tracking-wide text-[#7c74ff] group-hover:text-white bg-indigo-500/5 group-hover:bg-[#5046e5] border border-indigo-500/20 px-4 py-2 rounded-xl transition-all duration-300">
                    Visit Store
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MultiVendor;