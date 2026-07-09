import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Save, Image, FileText, Tag, User, DollarSign, Package, Shield, Loader2, Eye, Star, MessageSquare, ArrowLeft } from 'lucide-react';

const UpdateProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const IMGBB_API_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY; 

  // ৮টি ক্যাটাগরির লিস্ট
  const categoriesList = [
    { name: "Electronics", value: "electronics" },
    { name: "Fashion", value: "fashion" },
    { name: "Home & Living", value: "Home & Living" },
    { name: "Beauty", value: "beauty" },
    { name: "Sports", value: "sports" },
    { name: "Health", value: "Health" },
    { name: "Accessories", value: "Accessories" },
    { name: "Gadgets", value: "Gadgets" }
  ];

  // প্রোডাক্টের মেইন স্টেট
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    vendor: '',
    rating: '',
    reviewsCount: '',
    stock: '',
    sizes: [],
    colors: [],
    material: '',
    tags: []
  });

  // লোকাল বাফার স্টেটস
  const [loadingData, setLoadingData] = useState(true);
  const [imgPreview, setImgPreview] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // চিপস ইনপুট হোল্ডারস
  const [inputSize, setInputSize] = useState('');
  const [inputColor, setInputColor] = useState('');
  const [inputTag, setInputTag] = useState('');

  // ১. ডাটাবেজ থেকে নির্দিষ্ট প্রোডাক্টের ডাটা লোড করা
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        if (response.data) {
          setProductInfo(response.data);
          setImgPreview(response.data.image);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        Swal.fire({
          icon: 'error',
          title: 'Fetch Failed',
          text: 'Could not load product data from the database.',
          background: '#161925',
          color: '#fff'
        });
      } finally {
        setLoadingData(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' || name === 'rating' || name === 'reviewsCount' 
        ? Number(value) 
        : value
    }));
  };

  // ক্যাটাগরি চেঞ্জ হ্যান্ডলার
  const handleCategoryChange = (e) => {
    setProductInfo(prev => ({
      ...prev,
      category: e.target.value,
      sizes: [],
      colors: [],
      material: ''
    }));
  };

  // Imgbb-তে নতুন ইমেজ আপলোড
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgPreview(URL.createObjectURL(file));
    setUploadingImg(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
      if (response.data.success) {
        setProductInfo(prev => ({ ...prev, image: response.data.data.url }));
      }
    } catch (error) {
      console.error("Imgbb Upload Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Image Upload Failed',
        background: '#161925',
        color: '#fff'
      });
    } finally {
      setUploadingImg(false);
    }
  };

  // চিপস ডাটা অ্যাড করা
  const addArrayItem = (type, value, setInput) => {
    if (!value.trim()) return;
    setProductInfo(prev => ({
      ...prev,
      [type]: [...prev[type], value.trim()]
    }));
    setInput('');
  };

  // চিপস ডাটা রিমুভ করা
  const removeArrayItem = (type, index) => {
    setProductInfo(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // ক্যাটাগরি ভিত্তিক ডায়নামিক ফিল্ড ফিল্টারিং লজিক
  const currentCat = productInfo.category ? productInfo.category.toLowerCase() : '';
  const showSizes = currentCat === 'electronics' || currentCat === 'fashion';
  const showColors = currentCat && currentCat !== 'beauty' && currentCat !== 'sports';
  const showMaterial = currentCat && currentCat !== 'beauty' && currentCat !== 'sports';

  // ২. ফাইনাল এডিটেড ডাটা ব্যাকেন্ডে আপডেট করা
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    
    if (!productInfo.image) {
      Swal.fire({ icon: 'warning', title: 'Image Required', background: '#161925', color: '#fff' });
      return;
    }

    setIsUpdating(true);

    try {
      // আপনার রিকোয়ার্ড রাউট: /product/:id
      const response = await axios.put(`http://localhost:5000/product/${id}`, productInfo);
      
      if (response.status === 200 || response.status === 204) {
        Swal.fire({
          icon: 'success',
          title: 'Product Updated!',
          text: `${productInfo.name} has been updated successfully.`,
          background: '#161925',
          color: '#fff',
          confirmButtonColor: '#8b5cf6'
        });
      }
    } catch (error) {
      console.error("Backend Update Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong while communicating with the server.',
        background: '#161925',
        color: '#fff'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // ইনিশিয়াল ডাটা লোড হওয়ার টপ লেভেল কন্ডিশনাল স্ক্রিন
  if (loadingData) {
    return (
      <div className="w-full min-h-screen bg-[#090a0f] flex flex-col items-center justify-center text-white space-y-3">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-sm font-medium tracking-wide text-gray-400">Loading product information from server...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 text-white font-sans selection:bg-purple-600">
      
      {/* Top Navigation Row */}
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <span className="text-xs bg-purple-950 border border-purple-800 px-3 py-1 rounded-full font-mono text-purple-300">
          ID: {id}
        </span>
      </div>

      {/* Main Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-wide">Update Product Details</h2>
        <p className="text-sm text-gray-400 mt-1">Modify any details below and click save to apply real-time changes.</p>
      </div>

      <form onSubmit={handleUpdateProduct} className="bg-[#0f111a] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        
        {/* Dynamic Dropdown Field for Category mapping */}
        <div className="bg-[#161925] p-5 rounded-xl border border-purple-500/20">
          <label className="block text-sm font-semibold text-purple-400 mb-2">Product Operational Category *</label>
          <div className="relative flex items-center bg-[#1e2235] border border-gray-700 focus-within:border-purple-500 rounded-xl px-4 py-3 transition-all">
            <Tag className="w-5 h-5 text-gray-400 mr-3" />
            <select 
              name="category" 
              required 
              value={productInfo.category} 
              onChange={handleCategoryChange} 
              className="bg-transparent text-sm text-white font-bold focus:outline-none w-full cursor-pointer appearance-none [&>option]:bg-[#161925] [&>option]:text-white"
            >
              {categoriesList.map((cat, i) => (
                <option key={i} value={cat.value}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Master Editing Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT INTERFACE COLUMN */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Image Box Previewer */}
            <div className="bg-[#161925] border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-xl p-4 text-center min-h-[220px] flex flex-col items-center justify-center transition-all group relative overflow-hidden">
              <img src={imgPreview} alt="Live Preview" className="w-full h-44 object-contain rounded-lg" />
              {uploadingImg && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
                  <Loader2 className="w-6 h-6 text-purple-500 animate-spin mb-1" />
                  <span className="text-xs text-white">Replacing on Imgbb...</span>
                </div>
              )}
              <label className="absolute bottom-2 inset-x-2 bg-black/70 border border-gray-800 hover:bg-purple-600 hover:border-purple-400 text-[11px] font-bold text-white py-1.5 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Image className="w-3.5 h-3.5" /> Replace Image
              </label>
              <div className="absolute top-2 right-2 bg-purple-600 text-white font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                <Eye className="w-3 h-3" /> Current Media
              </div>
            </div>

            {/* Dynamic Array Interface: Sizes */}
            {showSizes && (
              <div className="bg-[#161925] border border-gray-800 p-4 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider">Configure Sizes</label>
                <div className="flex gap-2">
                  <input type="text" value={inputSize} onChange={(e) => setInputSize(e.target.value)} placeholder="Add new size variant" className="w-full bg-[#1e2235] border border-gray-700 p-2.5 rounded-lg text-sm font-bold focus:outline-none text-white focus:border-purple-500" />
                  <button type="button" onClick={() => addArrayItem('sizes', inputSize, setInputSize)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg font-bold text-lg">+</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {productInfo.sizes?.map((sz, idx) => (
                    <span key={idx} onClick={() => removeArrayItem('sizes', idx)} className="text-xs bg-purple-950/60 border border-purple-800 text-purple-200 px-2.5 py-1 rounded-md cursor-pointer hover:bg-red-950 hover:text-red-400 hover:border-red-500 transition-all font-medium">
                      {sz} ×
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Array Interface: Colors */}
            {showColors && (
              <div className="bg-[#161925] border border-gray-800 p-4 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider">Configure Colors</label>
                <div className="flex gap-2">
                  <input type="text" value={inputColor} onChange={(e) => setInputColor(e.target.value)} placeholder="Add new color variant" className="w-full bg-[#1e2235] border border-gray-700 p-2.5 rounded-lg text-sm font-bold focus:outline-none text-white focus:border-purple-500" />
                  <button type="button" onClick={() => addArrayItem('colors', inputColor, setInputColor)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg font-bold text-lg">+</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {productInfo.colors?.map((cl, idx) => (
                    <span key={idx} onClick={() => removeArrayItem('colors', idx)} className="text-xs bg-indigo-950/60 border border-indigo-800 text-indigo-200 px-2.5 py-1 rounded-md cursor-pointer hover:bg-red-950 hover:text-red-400 hover:border-red-500 transition-all font-medium">
                      {cl} ×
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Global Array Interface: Tags */}
            <div className="bg-[#161925] border border-gray-800 p-4 rounded-xl space-y-2">
              <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider">Search Keywords / Tags</label>
              <div className="flex gap-2">
                <input type="text" value={inputTag} onChange={(e) => setInputTag(e.target.value)} placeholder="Add product search tag" className="w-full bg-[#1e2235] border border-gray-700 p-2.5 rounded-lg text-sm font-bold focus:outline-none text-white focus:border-purple-500" />
                <button type="button" onClick={() => addArrayItem('tags', inputTag, setInputTag)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg font-bold text-lg">+</button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {productInfo.tags?.map((tg, idx) => (
                  <span key={idx} onClick={() => removeArrayItem('tags', idx)} className="text-xs bg-amber-950/60 border border-amber-800 text-amber-300 px-2.5 py-1 rounded-md cursor-pointer hover:bg-red-950 hover:text-red-400 hover:border-red-500 transition-all font-medium">
                    #{tg} ×
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT EDITABLE TEXT CONTENT COLUMN */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Title Line */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Product Name / Title *</label>
              <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <input type="text" name="name" required value={productInfo.name} onChange={handleChange} placeholder="Update title" className="bg-transparent text-sm text-white font-bold focus:outline-none w-full" />
              </div>
            </div>

            {/* Vendor / Business Line */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Vendor / Brand Hub *</label>
              <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <input type="text" name="vendor" required value={productInfo.vendor} onChange={handleChange} placeholder="Update vendor" className="bg-transparent text-sm text-white font-bold focus:outline-none w-full" />
              </div>
            </div>

            {/* Pricing Line */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Price Evaluation ($) *</label>
              <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                <input type="number" step="any" name="price" required value={productInfo.price} onChange={handleChange} placeholder="Update price" className="bg-transparent text-sm text-white font-bold focus:outline-none w-full" />
              </div>
            </div>

            {/* Stock Level Tracker */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Inventory Stock Level *</label>
              <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                <Package className="w-5 h-5 text-gray-400 mr-3" />
                <input type="number" name="stock" required value={productInfo.stock} onChange={handleChange} placeholder="Update stock count" className="bg-transparent text-sm text-white font-bold focus:outline-none w-full" />
              </div>
            </div>

            {/* Material Structural Spec (Conditional) */}
            {showMaterial ? (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Material Makeup *</label>
                <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                  <Shield className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" name="material" required value={productInfo.material} onChange={handleChange} placeholder="Update material details" className="bg-transparent text-sm text-white font-bold focus:outline-none w-full" />
                </div>
              </div>
            ) : (
              <div className="hidden sm:block"></div> // Structural column sync spacer
            )}

            {/* Score Rating Star Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Star Rating Score *</label>
              <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                <Star className="w-5 h-5 text-gray-400 mr-3" />
                <input type="number" step="0.1" min="0" max="5" name="rating" required value={productInfo.rating} onChange={handleChange} placeholder="e.g. 4.9" className="bg-transparent text-sm text-white font-bold focus:outline-none w-full" />
              </div>
            </div>

            {/* Analytics Reviews Count Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Total Feedback Reviews Count *</label>
              <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                <MessageSquare className="w-5 h-5 text-gray-400 mr-3" />
                <input type="number" name="reviewsCount" required value={productInfo.reviewsCount} onChange={handleChange} placeholder="e.g. 2405" className="bg-transparent text-sm text-white font-bold focus:outline-none w-full" />
              </div>
            </div>

            {/* Narrative Descriptive Block */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Comprehensive Description *</label>
              <textarea name="description" required value={productInfo.description} onChange={handleChange} placeholder="Update product storytelling parameters..." rows="5" className="w-full bg-[#161925] border border-gray-700 focus:border-purple-500 p-4 rounded-xl text-sm text-white font-bold focus:outline-none resize-none transition-all" />
            </div>

          </div>
        </div>

        {/* Master Execution Submission Button */}
        <button 
          type="submit" 
          disabled={uploadingImg || isUpdating}
          className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold tracking-wide text-sm uppercase transition-all flex items-center justify-center gap-2 shadow-lg ${(uploadingImg || isUpdating) ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {uploadingImg ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Swapping System Media Assets...
            </>
          ) : isUpdating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Pushing Updates to Database...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" /> Push Changes To Live Server
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;