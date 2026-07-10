import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Star, ShoppingBag, Heart, User, MessageSquare, ArrowLeft 
} from 'lucide-react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/Authprovider/AuthProvider';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // আপনার অথেনটিকেশন সিস্টেম থেকে রিয়েল ইউজার এক্সট্র্যাক্ট করা হচ্ছে
  const { user } = useContext(AuthContext); 

  // স্টেটস
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  // রিভিউর জন্য ডাইনামিক স্টেটস
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]); // ডাটাবেজ থেকে আসা লাইভ রিভিউ ট্র্যাকিং

  // ১. ডাইনামিক প্রোডাক্ট ও নির্দিষ্ট আইডি'র রিভিউ একই সাথে ফেচিং
  useEffect(() => {
    const fetchProductDetailsAndReviews = async () => {
      try {
        setLoading(true);
        
        // প্রথমে প্রোডাক্টের ডেটা ফেচ হবে
        const productRes = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(productRes.data);
        
        // ডিফল্ট সিলেকশন ফিক্সিং
        if (productRes.data?.sizes?.length > 0) setSelectedSize(productRes.data.sizes[0]);
        if (productRes.data?.colors?.length > 0) setSelectedColor(productRes.data.colors[0]);
        
        setLoading(false); // প্রোডাক্ট পাওয়া গেলেই লোডার বন্ধ

        // প্রোডাক্ট লোড হওয়ার পর রিভিউর ডেটা আলাদাভাবে ফেচ হবে
        try {
          const reviewsRes = await axios.get(`http://localhost:5000/reviews/${id}`);
          setReviews(reviewsRes.data);
        } catch (reviewError) {
          console.error("Error fetching reviews matrix:", reviewError);
          // রিভিউ এপিআই ডাউন থাকলেও যাতে ক্র্যাশ না করে, তাই খালি অ্যারে সেট করে রাখা হলো
          setReviews([]); 
        }

      } catch (error) {
        console.error("Core product fetching error:", error);
        setLoading(false);
      }
    };
    
    fetchProductDetailsAndReviews();
  }, [id]);
//   console.log(product);

  // ২. কার্ট হ্যান্ডলার
  const handleAddToCart = async () => {
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
    if (user?.email===product.vendorEmail) {
        return Swal.fire({
          icon: 'warning',
          title: 'Cannot Add to cart',
          text: 'Vendor cannot added his own Product!',
          background: '#0c0d14',
          color: '#fff',
          confirmButtonColor: '#5046e5'
        });
      }

    try {
      const cartItem = {
        productId: product._id || product.id,
        userEmail: user?.email,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        selectedSize,
        selectedColor
      };

      const response = await axios.post('http://localhost:5000/cart', cartItem);

      if (response.data.success) {
        Swal.fire({ 
          toast: true, 
          position: 'top-end', 
          icon: 'success', 
          title: response.data.message || 'Cart Synced!', 
          showConfirmButton: false, 
          timer: 2000, 
          background: '#0c0d14', 
          color: '#fff' 
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ৩. উইশলিস্ট হ্যান্ডলার
  const handleAddToWishlist = async () => {
    if (!user || !user?.email) {
      return Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login first to modify wishlist!',
        background: '#0c0d14',
        color: '#fff',
        confirmButtonColor: '#5046e5'
      });
    }
    if (user?.email===product.vendorEmail) {
    return Swal.fire({
      icon: 'warning',
      title: 'Cannot Add to Wishlist',
      text: 'Vendor cannot added his own Product!',
      background: '#0c0d14',
      color: '#fff',
      confirmButtonColor: '#5046e5'
    });
  }

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
          toast: true, position: 'top-end', icon: 'success', title: 'Locked into Wishlist!', showConfirmButton: false, timer: 2000, background: '#0c0d14', color: '#fff' 
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          toast: true, position: 'top-end', icon: 'warning', title: error.response.data.message || 'Already in Wishlist!', showConfirmButton: false, timer: 2500, background: '#0c0d14', color: '#ffc107'
        });
      }
    }
  };

  // ৪. ডাইনামিক সাবমিট রিভিউ হ্যান্ডলার (AXIOS POST ও ইউজারের সমস্ত রিয়েল ডেটা সহ)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user?.email) {
      return Swal.fire({ text: 'Please login to drop a matrix review.', icon: 'warning', background: '#0c0d14', color: '#fff' });
    }
    if (user?.email===product.vendorEmail) {
    return Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'Vendor cannot reviews his own Product!',
      background: '#0c0d14',
      color: '#fff',
      confirmButtonColor: '#5046e5'
    });
  }
    if (!reviewText.trim()) return;

    // আপনার রিকোয়ার্ড স্ট্রাকচার অনুযায়ী রিয়েল ইউজার ডেটা অবজেক্ট
    const newReview = {
      productId: id, // ফিল্টার কি (Filter Key)
      userName: user.displayName || "Anonymous Cipher",
      userEmail: user.email,
      userPhoto: user.photoURL || "",
      comment: reviewText,
      rating: rating,
      date: new Date().toLocaleDateString()
    };

    try {
      const response = await axios.post('http://localhost:5000/reviews', newReview);
      
      if (response.data.insertedId || response.data.acknowledged) {
        // পেজ রিফ্রেশ ছাড়াই রিয়েল-টাইম স্টেট আপডেট
        setReviews([newReview, ...reviews]);
        setReviewText('');
        setRating(5);

        Swal.fire({ 
          toast: true, 
          position: 'top-end', 
          icon: 'success', 
          title: 'Review Transmitted to Database!', 
          showConfirmButton: false, 
          timer: 2000, 
          background: '#0c0d14', 
          color: '#fff' 
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ text: 'Database pipeline transmission error.', icon: 'error', background: '#0c0d14', color: '#fff' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 uppercase tracking-widest font-black text-center text-sm px-4">Data Core Not Found</p>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs text-indigo-400 font-bold uppercase"><ArrowLeft className="w-4 h-4"/> Back</button>
      </div>
    );
  }

  return (
    <div className="bg-[#050508] text-white min-h-screen pb-20 md:pb-32 relative select-none">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-indigo-600/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-28">
        {/* BACK ACTION */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black tracking-widest text-gray-500 hover:text-white uppercase mb-6 md:mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 h-4 text-indigo-500" /> Back to Matrix Grid
        </button>

        {/* MAIN PRODUCT HOUSING */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 border border-gray-900/60 bg-[#0c0d14]/40 p-4 sm:p-6 md:p-10 rounded-[20px] md:rounded-[32px] backdrop-blur-md shadow-2xl">
          
          {/* LEFT: IMAGE SCREEN */}
          <div className="lg:col-span-5 w-full">
            <div className="aspect-square w-full rounded-[16px] md:rounded-[24px] overflow-hidden bg-black/80 border border-gray-900 relative group">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute top-3 left-3 md:top-4 left-4 bg-[#5046e5] text-white font-black text-[8px] md:text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                {product.category}
              </span>
            </div>
          </div>

          {/* RIGHT: METADATA & CONTROL ENGINE */}
          <div className="lg:col-span-7 space-y-5 md:space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* SYSTEM TAGS / INFO */}
              <div className="flex flex-wrap gap-1 md:gap-1.5">
                {product.tags && product.tags.map((tag, i) => (
                  <span key={i} className="text-[8px] md:text-[9px] font-black tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded uppercase">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* TITLE & VENDOR */}
              <div className="space-y-1">
                <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight italic uppercase break-words">{product.name}</h1>
                <p className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider break-all">
                  System Index ID: <span className="text-gray-400 font-mono">{product._id || product.id}</span>
                </p>
                <p className="text-xs md:text-sm text-purple-400 font-black tracking-wide mt-1 uppercase break-words">
                  Vendor: {product.vendor || "Unknown Node"} {product.vendorEmail && `(${product.vendorEmail})`}
                </p>
              </div>

              {/* RATING & STOCK ROW */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6 bg-black/30 border border-gray-950 p-2.5 md:p-3 rounded-xl md:rounded-2xl w-full sm:w-fit">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs md:text-sm font-black text-white">{product.rating || "4.5"}</span>
                  <span className="text-[10px] md:text-xs text-gray-600">({reviews.length} Database Logs)</span>
                </div>
                <div className="hidden sm:block h-4 w-[1px] bg-gray-900" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest">
                  Stock Matrix: <span className={product.stock > 10 ? "text-emerald-400" : "text-rose-500"}>{product.stock || 0} Units Left</span>
                </p>
              </div>

              {/* PRICE TAG */}
              <div>
                <p className="text-[9px] md:text-[10px] font-black text-gray-600 tracking-widest uppercase">Valuation</p>
                <p className="text-2xl md:text-4xl font-black italic text-white">${product.price}</p>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-1">
                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500">Core Description</h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">{product.description}</p>
              </div>

              {/* MATERIAL IF APPLICABLE */}
              {product.material && (
                <div className="p-2.5 md:p-3 bg-gray-950/40 border border-gray-900/60 rounded-xl text-[11px] md:text-xs">
                  <span className="font-black text-gray-500 uppercase tracking-wider block mb-0.5">Structural Material:</span>
                  <span className="text-gray-300 font-mono font-bold">{product.material}</span>
                </div>
              )}

              {/* COLORS SELECTION */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500">Select Spectral Hue</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl border text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                          selectedColor === color 
                            ? 'bg-purple-600 border-purple-400 text-white scale-[1.02]' 
                            : 'bg-black/40 border-gray-900 text-gray-400 hover:text-white'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SIZES SELECTION */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500">Select Dimension Matrix</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(size)}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border text-[11px] md:text-xs font-mono font-black flex items-center justify-center transition-all duration-200 ${
                          selectedSize === size 
                            ? 'bg-indigo-600 border-indigo-400 text-white scale-[1.03]' 
                            : 'bg-black/40 border-gray-900 text-gray-400 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* LOWER ACTION CORE ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 md:pt-6 mt-4 md:mt-6 border-t border-gray-900/40">
              <button 
                onClick={handleAddToCart}
                className="w-full py-3 md:py-3.5 rounded-xl bg-[#5046e5] hover:bg-[#6359e9] text-[11px] md:text-xs font-black tracking-widest text-white uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50"
              >
                <ShoppingBag className="w-3.5 h-3.5 md:w-4 h-4" /> Add To Cart
              </button>
              
              <button 
                onClick={handleAddToWishlist}
                className="w-full py-3 md:py-3.5 rounded-xl border border-gray-900 bg-black/20 hover:border-rose-500/40 text-[11px] md:text-xs font-black tracking-widest text-gray-400 hover:text-rose-400 uppercase transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 md:w-4 h-4" /> Wishlist Lock
              </button>
              <Link to={`/order/${product._id || product.id}`}>
               <button disabled={user?.email == product.vendorEmail ||!user?.email}
                className="w-full py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-80 hover:opacity-100 text-[11px] md:text-xs font-black tracking-widest text-white uppercase transition-all duration-300 cursor-not-allowed"
              >
                Instant Buy
              </button>
              </Link>
             
            </div>
          </div>
        </div>

        {/* LOWER SECTION: INTERACTIVE REVIEWS & RATING MATRIX */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* INPUT FORM NODE */}
          <div className="lg:col-span-5 bg-[#0c0d14]/60 border border-gray-900/80 rounded-[20px] md:rounded-[28px] p-4 md:p-6 space-y-4 h-fit">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <h3 className="text-base md:text-lg font-black uppercase italic tracking-wide">Write Synapse Review</h3>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* STAR ENGINE VALUE */}
              <div className="space-y-1">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">Rating Vector</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform duration-100 hover:scale-110"
                    >
                      <Star 
                        className={`w-5 h-5 md:w-6 md:h-6 ${
                          star <= (hoverRating || rating) 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-gray-800'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* INPUT COMMENT TEXT AREA */}
              <div className="space-y-1">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">Vocal Feedback Matrix</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Transmit your user experience into the database..."
                  rows="4"
                  className="w-full bg-black/60 border border-gray-950 focus:border-purple-500/50 p-3 md:p-4 rounded-xl text-xs md:text-sm text-gray-300 placeholder-gray-700 focus:outline-none transition-all duration-300 resize-none font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 md:py-3 bg-purple-600 hover:bg-purple-500 text-[11px] md:text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-md transition-all duration-300"
              >
                Transmit Review
              </button>
            </form>
          </div>

          {/* DYNAMIC REVIEWS DISPLAY PANEL (১০০% ডাইনামিক লাইভ ফিড) */}
          <div className="lg:col-span-7 bg-[#0c0d14]/40 border border-gray-900/60 rounded-[20px] md:rounded-[28px] p-4 md:p-6 space-y-4">
            <h3 className="text-base md:text-lg font-black uppercase italic tracking-wide text-gray-400">
              Live Feed Logs ({reviews.length})
            </h3>
            
            <div className="space-y-3 md:space-y-4 max-h-[350px] md:max-h-[400px] overflow-y-auto no-scrollbar pr-1">
              {reviews.map((rev, index) => (
                <div key={rev._id || index} className="bg-black/40 border border-gray-950 p-3 md:p-4 rounded-xl md:rounded-2xl space-y-2 border-l-2 border-l-purple-500 animate-fadeIn">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* যদি ডাটাবেজে ইউজারের ইমেজ ইউআরএল থাকে তবে ইমেজ দেখাবে, নতুবা প্লেসহোল্ডার আইকন */}
                      {rev.userPhoto ? (
                        <img 
                          src={rev.userPhoto} 
                          alt={rev.userName} 
                          className="w-7 h-7 rounded-lg object-cover border border-purple-500/30 flex-shrink-0" 
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                          <User className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-[11px] md:text-xs font-bold text-white truncate">{rev.userName}</p>
                        <p className="text-[8px] md:text-[9px] text-gray-500 font-mono truncate">{rev.userEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 flex-shrink-0">
                      <Star className="w-2.5 h-2.5 fill-purple-400 text-purple-400" />
                      <span className="text-[9px] md:text-[10px] font-black text-purple-300">{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed font-medium pl-9 italic break-words">"{rev.comment}"</p>
                  <p className="text-[8px] text-right text-gray-600 font-mono">{rev.date}</p>
                </div>
              ))}

              {reviews.length === 0 && (
                <div className="text-center py-10 md:py-12 text-[10px] md:text-xs text-gray-600 font-black uppercase tracking-widest">
                  No Transmission Signals Yet. Be the First!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;