import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PlusCircle, Image, FileText, Tag, User, DollarSign, Package, Shield, Loader2, Eye, Star, MessageSquare } from 'lucide-react';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';

const AddProduct = () => {
  // Imgbb API Key (Paste your API key here)
  const IMGBB_API_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  // Exact 8 categories from your dataset
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
const {user}=useContext(AuthContext);
  // Main product state according to your JSON schema
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    vendor: '',
    vendorEmail:user?.email,
    rating: 4.5, // Default rating
    reviewsCount: 0, // Default reviews count
    stock: '',
    sizes: [],
    colors: [],
    material: '',
    tags: []
  });

  // Local input states for arrays
  const [imgPreview, setImgPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputSize, setInputSize] = useState('');
  const [inputColor, setInputColor] = useState('');
  const [inputTag, setInputTag] = useState('');

  // Handle standard text/number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' || name === 'rating' || name === 'reviewsCount' 
        ? Number(value) 
        : value
    }));
  };

  // Reset dynamic fields when category changes
  const handleCategoryChange = (e) => {
    setProductInfo(prev => ({
      ...prev,
      category: e.target.value,
      sizes: [],
      colors: [],
      material: ''
    }));
  };

  // Upload Image to Imgbb
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgPreview(URL.createObjectURL(file));
    setUploading(true);

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
        text: 'Something went wrong while uploading the image. Please try again.',
        background: '#161925',
        color: '#fff'
      });
    } finally {
      setUploading(false);
    }
  };

  // Add items to arrays (sizes, colors, tags)
  const addArrayItem = (type, value, setInput) => {
    if (!value.trim()) return;
    setProductInfo(prev => ({
      ...prev,
      [type]: [...prev[type], value.trim()]
    }));
    setInput('');
  };

  // Remove items from arrays
  const removeArrayItem = (type, index) => {
    setProductInfo(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Post dynamic fields based on selected category data matching
  const currentCat = productInfo.category.toLowerCase();
  
  // 1. Sizes only for electronics and fashion
  const showSizes = currentCat === 'electronics' || currentCat === 'fashion';
  
  // 2. Colors for everything except beauty and sports
  const showColors = productInfo.category && currentCat !== 'beauty' && currentCat !== 'sports';
  
  // 3. Material for everything except beauty and sports
  const showMaterial = productInfo.category && currentCat !== 'beauty' && currentCat !== 'sports';

  // Submit form data to Backend Database API
  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!productInfo.image) {
      Swal.fire({
        icon: 'warning',
        title: 'Image Missing',
        text: 'Please upload a product image first!',
        background: '#161925',
        color: '#fff'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Direct post API call to your backend endpoint
      const response = await axios.post('http://localhost:5000/add-product', productInfo);
      
      if (response.status === 200 || response.status === 201) {
        // Success Popup with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Product Added Successfully!',
          text: `${productInfo.name} has been saved to the database.`,
          background: '#161925',
          color: '#fff',
          confirmButtonColor: '#8b5cf6'
        });

        // Reset Form
        setProductInfo({
          name: '',
          description: '',
          price: '',
          category: '',
          image: '',
          vendor: '',
          rating: 4.5,
          reviewsCount: 0,
          stock: '',
          sizes: [],
          colors: [],
          material: '',
          tags: []
        });
        setImgPreview(null);
      }
    } catch (error) {
      console.error("Database Post Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Database Error',
        text: 'Failed to add product to database. Please check your backend connection.',
        background: '#161925',
        color: '#fff'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 text-white font-sans selection:bg-purple-600">
      
      {/* Clear Top Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-wide">Add New Product</h2>
        <p className="text-sm text-gray-400 mt-1">Fill up the simple form below to add a product to your inventory.</p>
      </div>

      <form onSubmit={handleAddProduct} className="bg-[#0f111a] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        
        {/* STEP 1: Select Category first */}
        <div className="bg-[#161925] p-5 rounded-xl border border-purple-500/20">
          <label className="block text-sm font-semibold text-purple-400 mb-2">1. Select Product Category *</label>
          <div className="relative flex items-center bg-[#1e2235] border border-gray-700 focus-within:border-purple-500 rounded-xl px-4 py-3 transition-all">
            <Tag className="w-5 h-5 text-gray-400 mr-3" />
            <select 
              name="category" 
              required 
              value={productInfo.category} 
              onChange={handleCategoryChange} 
              className="bg-transparent text-sm text-white font-medium focus:outline-none w-full cursor-pointer appearance-none [&>option]:bg-[#161925] [&>option]:text-white"
            >
              <option value="" disabled>-- Click here to choose a category --</option>
              {categoriesList.map((cat, i) => (
                <option key={i} value={cat.value}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Fields Show Up after Category selection */}
        {productInfo.category ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Media & Dynamic Tags Input */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Product Image Box */}
              <div className="bg-[#161925] border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-xl p-4 text-center min-h-[220px] flex flex-col items-center justify-center transition-all group relative overflow-hidden">
                {imgPreview ? (
                  <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center relative">
                    <img src={imgPreview} alt="Product Preview" className="w-full h-44 object-contain rounded-lg" />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
                        <Loader2 className="w-6 h-6 text-purple-500 animate-spin mb-1" />
                        <span className="text-xs text-white font-medium">Uploading to Imgbb...</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-emerald-600 border border-emerald-400 text-white font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Live Preview
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center py-8 w-full h-full">
                    <input type="file" accept="image/*" required onChange={handleImageUpload} className="hidden" />
                    <div className="w-12 h-12 bg-[#1e2235] border border-gray-700 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-colors mb-3">
                      <Image className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-sm text-white font-semibold">Upload Product Image</span>
                    <span className="text-xs text-gray-400 mt-1">Click to browse your device</span>
                  </label>
                )}
              </div>

              {/* Sizes Input Box */}
              {showSizes && (
                <div className="bg-[#161925] border border-gray-800 p-4 rounded-xl space-y-2">
                  <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider">Available Sizes</label>
                  <div className="flex gap-2">
                    <input type="text" value={inputSize} onChange={(e) => setInputSize(e.target.value)} placeholder="e.g. M, XL, 16-inch" className="w-full bg-[#1e2235] border border-gray-700 p-2.5 rounded-lg text-sm font-bold focus:outline-none text-white focus:border-purple-500" />
                    <button type="button" onClick={() => addArrayItem('sizes', inputSize, setInputSize)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg font-bold text-lg">+</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {productInfo.sizes.map((sz, idx) => (
                      <span key={idx} onClick={() => removeArrayItem('sizes', idx)} className="text-xs bg-purple-950/60 border border-purple-800 text-purple-200 px-2.5 py-1 rounded-md cursor-pointer hover:bg-red-950 hover:text-red-400 hover:border-red-500 transition-all font-medium">
                        {sz} ×
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Input Box */}
              {showColors && (
                <div className="bg-[#161925] border border-gray-800 p-4 rounded-xl space-y-2">
                  <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider">Available Colors</label>
                  <div className="flex gap-2">
                    <input type="text" value={inputColor} onChange={(e) => setInputColor(e.target.value)} placeholder="e.g. Space Black, Royal Blue" className="w-full bg-[#1e2235] border border-gray-700 p-2.5 rounded-lg text-sm font-bold focus:outline-none text-white focus:border-purple-500" />
                    <button type="button" onClick={() => addArrayItem('colors', inputColor, setInputColor)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg font-bold text-lg">+</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {productInfo.colors.map((cl, idx) => (
                      <span key={idx} onClick={() => removeArrayItem('colors', idx)} className="text-xs bg-indigo-950/60 border border-indigo-800 text-indigo-200 px-2.5 py-1 rounded-md cursor-pointer hover:bg-red-950 hover:text-red-400 hover:border-red-500 transition-all font-medium">
                        {cl} ×
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags Input Box */}
              <div className="bg-[#161925] border border-gray-800 p-4 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider">Product Search Tags</label>
                <div className="flex gap-2">
                  <input type="text" value={inputTag} onChange={(e) => setInputTag(e.target.value)} placeholder="e.g. Premium, Bestseller" className="w-full bg-[#1e2235] border border-gray-700 p-2.5 rounded-lg text-sm font-bold focus:outline-none text-white focus:border-purple-500" />
                  <button type="button" onClick={() => addArrayItem('tags', inputTag, setInputTag)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg font-bold text-lg">+</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {productInfo.tags.map((tg, idx) => (
                    <span key={idx} onClick={() => removeArrayItem('tags', idx)} className="text-xs bg-amber-950/60 border border-amber-800 text-amber-300 px-2.5 py-1 rounded-md cursor-pointer hover:bg-red-950 hover:text-red-400 hover:border-red-500 transition-all font-medium">
                      #{tg} ×
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Global Inputs (Bold High Contrast Text) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Product Title */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Product Title / Name *</label>
                <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" name="name" required value={productInfo.name} onChange={handleChange} placeholder="e.g. MacBook Pro M3 Max" className="bg-transparent text-sm text-white font-bold placeholder-gray-600 focus:outline-none w-full" />
                </div>
              </div>

              {/* Vendor Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Vendor / Brand Name *</label>
                <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" name="vendor" required value={productInfo.vendor} onChange={handleChange} placeholder="e.g. Apple Official, Pure Beauty" className="bg-transparent text-sm text-white font-bold placeholder-gray-600 focus:outline-none w-full" />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Product Price ($) *</label>
                <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                  <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="number" step="any" name="price" required value={productInfo.price} onChange={handleChange} placeholder="e.g. 2499" className="bg-transparent text-sm text-white font-bold placeholder-gray-600 focus:outline-none w-full" />
                </div>
              </div>

              {/* Stock */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Stock Quantity *</label>
                <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                  <Package className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="number" name="stock" required value={productInfo.stock} onChange={handleChange} placeholder="e.g. 15" className="bg-transparent text-sm text-white font-bold placeholder-gray-600 focus:outline-none w-full" />
                </div>
              </div>

              {/* Material Spec (Conditional) */}
              {showMaterial ? (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Material Specification *</label>
                  <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                    <Shield className="w-5 h-5 text-gray-400 mr-3" />
                    <input type="text" name="material" required value={productInfo.material} onChange={handleChange} placeholder="e.g. Recycled Aluminum, Genuine Leather" className="bg-transparent text-sm text-white font-bold placeholder-gray-600 focus:outline-none w-full" />
                  </div>
                </div>
              ) : (
                <div className="hidden sm:block"></div> // Grid alignment balance filler
              )}

              {/* Product Rating */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Product Rating (0 to 5) *</label>
                <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                  <Star className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="number" step="0.1" min="0" max="5" name="rating" required value={productInfo.rating} onChange={handleChange} placeholder="e.g. 4.8" className="bg-transparent text-sm text-white font-bold placeholder-gray-600 focus:outline-none w-full" />
                </div>
              </div>

              {/* Total Reviews Count */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Total Reviews Count *</label>
                <div className="flex items-center bg-[#161925] border border-gray-700 focus-within:border-purple-500 px-4 py-3 rounded-xl transition-all">
                  <MessageSquare className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="number" name="reviewsCount" required value={productInfo.reviewsCount} onChange={handleChange} placeholder="e.g. 120" className="bg-transparent text-sm text-white font-bold placeholder-gray-600 focus:outline-none w-full" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Product Detailed Description *</label>
                <textarea name="description" required value={productInfo.description} onChange={handleChange} placeholder="Write complete details and unique specifications about this product here..." rows="5" className="w-full bg-[#161925] border border-gray-700 focus:border-purple-500 p-4 rounded-xl text-sm text-white font-bold placeholder-gray-600 focus:outline-none resize-none transition-all" />
              </div>

            </div>
          </div>
        ) : (
          /* Empty Category Message Lock */
          <div className="border border-dashed border-gray-800 rounded-xl p-12 text-center text-gray-400 text-sm font-medium">
            💡 Please select a product category above to open the full input form.
          </div>
        )}

        {/* Submit Action Button */}
        {productInfo.category && (
          <button 
            type="submit" 
            disabled={uploading || isSubmitting}
            className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold tracking-wide text-sm uppercase transition-all flex items-center justify-center gap-2 shadow-lg ${(uploading || isSubmitting) ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading Media...
              </>
            ) : isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving To Database...
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" /> Save Product To Database
              </>
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;