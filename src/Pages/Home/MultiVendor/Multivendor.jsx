import React, { useState } from 'react';
import { Star, CheckCircle, ArrowUpRight, ShoppingBag, ShieldCheck, UserPlus, X, ArrowRight, ArrowLeft, Store, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const vendors = [
  {
    id: 1,
    name: 'Apex Digital Store',
    category: 'Electronics & Gadgets',
    rating: 4.9,
    reviews: '2.4k',
    productsCount: '450+',
    avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    gradient: 'from-blue-600/10 via-indigo-600/20 to-transparent',
  },
  {
    id: 2,
    name: 'Vogue Outfitters',
    category: 'Premium Fashion',
    rating: 4.8,
    reviews: '1.8k',
    productsCount: '320+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    gradient: 'from-indigo-600/10 via-purple-600/20 to-transparent',
  },
  {
    id: 3,
    name: 'Aura Cosmetics',
    category: 'Beauty & Skincare',
    rating: 4.7,
    reviews: '950',
    productsCount: '180+',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=600&auto=format&fit=crop',
    gradient: 'from-purple-600/10 via-pink-600/20 to-transparent',
  },
];

const MultiVendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
 
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    storeName: '', storeCategory: '', storeAddress: '',
    nidOrTIN: '', termsAccepted: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);
  
  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentStep(1); 
  };

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
             <button 
              className="text-xs font-black italic tracking-widest uppercase bg-[#5046e5] hover:bg-[#6359e9] text-white px-5 py-3 rounded-2xl transition duration-300 flex items-center gap-2 shadow-lg shadow-indigo-500/10 border border-indigo-500/30"
            >
              <UserPlus className="w-4 h-4" /> Apply as a Vendor
            </button>
            </Link>
           
            
            <button className="text-xs font-black italic tracking-widest uppercase text-gray-300 hover:text-white transition flex items-center gap-1 group py-2">
              View All Vendors 
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200" />
            </button>
          </div>
        </div>

        {/* --- VENDORS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <div 
              key={vendor.id}
              className="bg-[#11131c]/40 border border-gray-900/60 rounded-[32px] relative group hover:border-indigo-500/40 transition-all duration-500 hover:scale-[1.02] shadow-2xl overflow-hidden flex flex-col justify-between"
            >
             
              <div className={`absolute inset-0 bg-gradient-to-br ${vendor.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none`} />

              <div className="relative z-10">
                <div className="h-32 w-full relative overflow-hidden rounded-t-[32px]">
                  <img src={vendor.banner} alt={vendor.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131c] to-transparent" />
                  <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-black italic tracking-wider uppercase px-2.5 py-1 rounded-xl flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>

                <div className="px-6 pb-6 relative -mt-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl border-2 border-[#11131c] overflow-hidden bg-gray-800 shadow-xl">
                    <img src={vendor.avatar} alt={vendor.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic tracking-wide text-white group-hover:text-[#7c74ff] transition-colors duration-300">
                      {vendor.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">{vendor.category}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-black/20 border border-gray-900/40 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <div>
                        <p className="text-xs font-black italic text-white">{vendor.rating}</p>
                        <p className="text-[10px] text-gray-500 font-medium">({vendor.reviews} Reviews)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 border-l border-gray-900/60 pl-4">
                      <ShoppingBag className="w-4 h-4 text-indigo-400" />
                      <div>
                        <p className="text-xs font-black italic text-white">{vendor.productsCount}</p>
                        <p className="text-[10px] text-gray-500 font-medium">Products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-black italic tracking-widest text-gray-500 uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> AI Logistics Enabled
                </span>
                <button className="text-xs font-black italic tracking-wide text-[#7c74ff] group-hover:text-white bg-indigo-500/5 group-hover:bg-[#5046e5] border border-indigo-500/20 px-4 py-2 rounded-xl transition-all duration-300">
                  Visit Store
                </button>
              </div>

              <div className="relative w-full h-[2px] bg-gray-900 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-12 bg-gray-700 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#5046e5] group-hover:to-purple-500 transition-all duration-700 ease-out" />
              </div>
            </div>
          ))}
        </div>

        {/* --- MULTI-STEP POPUP MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-[#11131c] border border-gray-800 w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col">
              
              {/* Modal Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 w-9 h-9 bg-black/40 border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/20 hover:border-red-500/30 transition duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Step Indicators Top Bar */}
              <div className="p-8 pb-4 border-b border-gray-900 flex justify-between items-center bg-black/20">
                <div className="flex items-center space-x-3">
                  <span className={`w-8 h-8 rounded-xl font-black italic text-xs flex items-center justify-center transition-all ${currentStep >= 1 ? 'bg-[#5046e5] text-white' : 'bg-gray-900 text-gray-500'}`}><Store className="w-4 h-4" /></span>
                  <div className="w-8 h-[2px] bg-gray-900" />
                  <span className={`w-8 h-8 rounded-xl font-black italic text-xs flex items-center justify-center transition-all ${currentStep >= 2 ? 'bg-[#5046e5] text-white' : 'bg-gray-900 text-gray-500'}`}><FileText className="w-4 h-4" /></span>
                  <div className="w-8 h-[2px] bg-gray-900" />
                  <span className={`w-8 h-8 rounded-xl font-black italic text-xs flex items-center justify-center transition-all ${currentStep >= 3 ? 'bg-[#5046e5] text-white' : 'bg-gray-900 text-gray-500'}`}><CheckCircle2 className="w-4 h-4" /></span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black italic tracking-widest text-gray-500 uppercase">Step {currentStep} of 3</p>
                  <p className="text-sm font-black italic tracking-wide text-white">
                    {currentStep === 1 && 'Personal Details'}
                    {currentStep === 2 && 'Business Details'}
                    {currentStep === 3 && 'Verification'}
                  </p>
                </div>
              </div>

              {/* Form Content Body */}
              <div className="p-8 flex-1 min-h-[280px]">
                
                {/* STEP 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-slideIn">
                    <div className="space-y-1">
                      <label className="text-xs font-black italic tracking-wide text-gray-400 uppercase">Full Name</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" className="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5046e5] transition" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black italic tracking-wide text-gray-400 uppercase">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5046e5] transition" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black italic tracking-wide text-gray-400 uppercase">Phone Number</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+88017xxxxxxxx" className="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5046e5] transition" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Store/Business Info */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-slideIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black italic tracking-wide text-gray-400 uppercase">Store Name</label>
                        <input type="text" name="storeName" value={formData.storeName} onChange={handleInputChange} placeholder="My Premium Store" className="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5046e5] transition" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black italic tracking-wide text-gray-400 uppercase">Store Category</label>
                        <select name="storeCategory" value={formData.storeCategory} onChange={handleInputChange} className="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-sm text-blue-800 focus:outline-none focus:border-[#5046e5] transition">
                          <option value="">Select Category</option>
                          <option value="electronics">Electronics</option>
                          <option value="fashion">Fashion</option>
                          <option value="beauty">Beauty & Skincare</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black italic tracking-wide text-gray-400 uppercase">Store Address</label>
                      <textarea name="storeAddress" value={formData.storeAddress} onChange={handleInputChange} rows="2" placeholder="Dhaka, Bangladesh" className="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5046e5] transition resize-none"></textarea>
                    </div>
                  </div>
                )}

                {/* STEP 3: Documentation & Complete */}
                {currentStep === 3 && (
                  <div className="space-y-5 animate-slideIn">
                    <div className="space-y-1">
                      <label className="text-xs font-black italic tracking-wide text-gray-400 uppercase">NID or TIN Certificate Number</label>
                      <input type="text" name="nidOrTIN" value={formData.nidOrTIN} onChange={handleInputChange} placeholder="1992XXXXXXXXXXXXX" className="w-full bg-black/40 border border-gray-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5046e5] transition" />
                    </div>
                    
                    <label className="flex items-start space-x-3 cursor-pointer group pt-2">
                      <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} className="mt-1 accent-[#5046e5]" />
                      <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition">
                        I agree to the VoxaCart AI Multi-vendor policy and allow automated AI logistics to govern standard operational parameters.
                      </span>
                    </label>
                  </div>
                )}

                {/* STEP 4: Success Message */}
                {currentStep === 4 && (
                  <div className="text-center py-6 space-y-4 animate-scaleUp">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-black italic tracking-wide text-white">Application Submitted!</h4>
                      <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                        Hey {formData.fullName || 'Vendor'}, our automated team will audit your store **{formData.storeName || 'Store'}** details and contact you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons Footer Row */}
              {currentStep <= 3 && (
                <div className="p-6 bg-black/20 border-t border-gray-900 flex justify-between items-center">
                  <button 
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="text-xs font-black italic tracking-wide uppercase text-gray-400 hover:text-white disabled:opacity-0 flex items-center gap-1 transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button 
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && (!formData.fullName || !formData.email)) ||
                      (currentStep === 2 && (!formData.storeName || !formData.storeCategory)) ||
                      (currentStep === 3 && (!formData.nidOrTIN || !formData.termsAccepted))
                    }
                    className="text-xs font-black italic tracking-wide uppercase bg-[#5046e5] hover:bg-[#6359e9] disabled:bg-gray-950 disabled:text-gray-600 text-white px-5 py-3 rounded-2xl flex items-center gap-1 transition"
                  >
                    {currentStep === 3 ? 'Submit Application' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="p-6 bg-black/20 border-t border-gray-900 text-center">
                  <button 
                    onClick={handleClose}
                    className="text-xs font-black italic tracking-wide uppercase bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-2xl transition"
                  >
                    Close Window
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default MultiVendor;