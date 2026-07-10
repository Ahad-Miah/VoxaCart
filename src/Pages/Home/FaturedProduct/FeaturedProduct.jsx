import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingCart, Heart, Eye, X, Check, ShieldCheck, Truck, RefreshCw, LayoutGrid, Cpu, Shirt, Home, Sparkles, Trophy, Filter, PocketKnife } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../../Provider/Authprovider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
// import { cn } from '../../../lib/utils';
const cn = (...classes) => classes.filter(Boolean).join(" ");
const icons = { Cpu, Shirt, Home, Sparkles, Trophy,Heart,PocketKnife };

export default function FeaturedProducts() {
  //   const  products= [
  //   {
  //     "id": "p1",
  //     "name": "MacBook Pro M3 Max",
  //     "description": "Unprecedented performance for the world's most demanding creative workflows.",
  //     "price": 2499.00,
  //     "category": "electronics",
  //     "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
  //     "vendor": "Apple Official",
  //     "rating": 4.9,
  //     "reviewsCount": 2405,
  //     "stock": 12,
  //     "sizes": ["14-inch", "16-inch"],
  //     "colors": ["Space Black", "Silver"],
  //     "material": "Recycled Aluminum",
  //     "tags": ["Premium", "Professional", "Bestseller"]
  //   },
  //   {
  //     "id": "p2",
  //     "name": "Sony WH-1000XM5",
  //     "description": "Leading noise cancellation and world-class sound quality.",
  //     "price": 399.00,
  //     "category": "electronics",
  //     "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  //     "vendor": "Sony Authorized",
  //     "rating": 4.8,
  //     "reviewsCount": 1840,
  //     "stock": 45,
  //     "colors": ["Silver", "Black"],
  //     "material": "Eco-friendly Plastic & Synthetic Leather",
  //     "tags": ["Wireless", "Audio", "Noise-Cancelling"]
  //   },
  //   {
  //     "id": "p3",
  //     "name": "Luxury Silk Evening Gown",
  //     "description": "Handcrafted pure silk gown for unforgettable moments.",
  //     "price": 850.00,
  //     "category": "fashion",
  //     "image": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
  //     "vendor": "Elegance Boutique",
  //     "rating": 4.7,
  //     "reviewsCount": 120,
  //     "stock": 5,
  //     "sizes": ["XS", "S", "M", "L"],
  //     "colors": ["Emerald Green", "Midnight Blue", "Crimson"],
  //     "material": "100% Pure Mulberry Silk",
  //     "tags": ["Designer", "Luxury", "Handmade"]
  //   },
  //   {
  //     "id": "p4",
  //     "name": "Leather Lounge Chair",
  //     "description": "Ergonomic design meets mid-century modern aesthetic.",
  //     "price": 1200.00,
  //     "category": "home",
  //     "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
  //     "vendor": "Modern Dwelling",
  //     "rating": 4.6,
  //     "reviewsCount": 450,
  //     "stock": 8,
  //     "colors": ["Cognac", "Black", "Charcoal"],
  //     "material": "Top-grain Leather & Solid Walnut",
  //     "tags": ["Eames-Style", "Leather", "Home"]
  //   },
  //   {
  //     "id": "p5",
  //     "name": "iPhone 15 Pro",
  //     "description": "Titanium design, A17 Pro chip, customizable Action button.",
  //     "price": 999.00,
  //     "category": "electronics",
  //     "image": "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80",
  //     "vendor": "Apple Official",
  //     "rating": 4.9,
  //     "reviewsCount": 3200,
  //     "stock": 25,
  //     "tags": ["New", "Premium"]
  //   },
  //   {
  //     "id": "p6",
  //     "name": "Nike Air Max 270",
  //     "description": "Nike's first lifestyle Air Max brings you style, comfort and big attitude.",
  //     "price": 150.00,
  //     "category": "fashion",
  //     "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  //     "vendor": "StyleHub",
  //     "rating": 4.5,
  //     "reviewsCount": 850,
  //     "stock": 100,
  //     "sizes": ["6", "7", "8", "9", "10", "11", "12"],
  //     "colors": ["White", "Black/Red", "Blue/Grey"],
  //     "material": "Breathable Mesh & Air Sole Unit",
  //     "tags": ["Footwear", "Sportswear"]
  //   },
  //   {
  //     "id": "p7",
  //     "name": "Ceramic Table Lamp",
  //     "description": "Handcrafted ceramic lamp with a linen shade.",
  //     "price": 85.00,
  //     "category": "home",
  //     "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
  //     "vendor": "HomeDecor Co.",
  //     "rating": 4.8,
  //     "reviewsCount": 120,
  //     "stock": 30,
  //     "tags": ["Lighting", "Minimal"]
  //   },
  //   {
  //     "id": "p8",
  //     "name": "Organic Face Serum",
  //     "description": "Restore your skin's natural glow with our organic serum.",
  //     "price": 45.00,
  //     "category": "beauty",
  //     "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
  //     "vendor": "Pure Beauty",
  //     "rating": 4.7,
  //     "reviewsCount": 560,
  //     "stock": 60,
  //     "tags": ["Organic", "Skincare"]
  //   },
  //   {
  //     "id": "p9",
  //     "name": "Smart Watch Ultra",
  //     "description": "The most rugged and capable Apple Watch ever.",
  //     "price": 799.00,
  //     "category": "electronics",
  //     "image": "https://images.unsplash.com/photo-1434493907317-a46b53b81882?w=800&q=80",
  //     "vendor": "Apple Official",
  //     "rating": 4.8,
  //     "reviewsCount": 1100,
  //     "stock": 20,
  //     "tags": ["Outdoor", "Tech"]
  //   },
  //   {
  //     "id": "p10",
  //     "name": "Men's Wool Coat",
  //     "description": "Classic tailoring combined with premium wool blend.",
  //     "price": 250.00,
  //     "category": "fashion",
  //     "image": "https://images.unsplash.com/photo-1539533377285-a41cc5900224?w=800&q=80",
  //     "vendor": "StyleHub",
  //     "rating": 4.6,
  //     "reviewsCount": 230,
  //     "stock": 15,
  //     "sizes": ["S", "M", "L", "XL", "XXL"],
  //     "colors": ["Camel", "Navy", "Grey"],
  //     "material": "80% Virgin Wool, 20% Cashmere",
  //     "tags": ["Winter", "Classy"]
  //   },
  //   {
  //     "id": "p11",
  //     "name": "Yoga Mat Premium",
  //     "description": "Extra thick and non-slip surface for perfect grip.",
  //     "price": 60.00,
  //     "category": "sports",
  //     "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  //     "vendor": "Active Gear",
  //     "rating": 4.9,
  //     "reviewsCount": 420,
  //     "stock": 80,
  //     "tags": ["Fitness", "Yoga"]
  //   },
  //   {
  //     "id": "p12",
  //     "name": "Wireless Charging Pad",
  //     "description": "Fast 15W wireless charging for all Qi-enabled devices.",
  //     "price": 25.00,
  //     "category": "electronics",
  //     "image": "https://images.unsplash.com/photo-1615526675159-e248c311e3e2?w=800&q=80",
  //     "vendor": "TechBase",
  //     "rating": 4.4,
  //     "reviewsCount": 2100,
  //     "stock": 200,
  //     "tags": ["Essential", "Tech"]
  //   }
  // ];
  // const  categories= [
  //   { "id": "electronics", "name": "Electronics", "icon": "Cpu", "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80", "description": "Latest gadgets and high-tech equipment for your modern lifestyle." },
  //   { "id": "fashion", "name": "Fashion", "icon": "Shirt", "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80", "description": "Define your style with our curated collection of premium apparel." },
  //   { "id": "home", "name": "Home & Living", "icon": "Home", "image": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80", "description": "Transform your space with elegant furniture and decor." },
  //   { "id": "beauty", "name": "Beauty", "icon": "Sparkles", "image": "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=800&q=80", "description": "Premium skincare and cosmetics for your daily radiance." },
  //   { "id": "sports", "name": "Sports", "icon": "Trophy", "image": "https://images.unsplash.com/photo-1461896736544-7c9080fd4f38?w=800&q=80", "description": "Gear up for victory with professional-grade athletic equipment." },
  //   { "id": "Health", "name": "Health", "icon": "Heart", "image": "https://images.unsplash.com/photo-1461896736544-7c9080fd4f38?w=800&q=80", "description": "Gear up for victory with professional-grade athletic equipment." },
  //   { "id": "Accessories", "name": "Accessories", "icon": "Cpu", "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80", "description": "Gear up for victory with professional-grade athletic equipment." },
  //   { "id": "Gadgets", "name": "Gadgets", "icon": "PocketKnife", "image": "https://images.unsplash.com/photo-1461896736544-7c9080fd4f38?w=800&q=80", "description": "Gear up for victory with professional-grade athletic equipment." },
  // ];
const [categories, setCategories] = useState([]);
const [products,setProducts]=useState([]);
const [loading, setLoading] = useState(true);
const{user}=useContext(AuthContext);
const navigate=useNavigate();
// fatch category
  useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/category');
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // fetch products
      useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
   const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const onSelectCategory=setSelectedCategory; 

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

    // handle wishlist
 const handleAddToWishlist = async (product) => {
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
    const cartItem = {
      productId: product._id || product.id,
      userEmail: user?.email, 
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

  return (
    <section className="py-24 bg-white dark:bg-gray-950" id="shop">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12">
        
          {/* Category Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-32">
              <div className="flex items-center gap-2 mb-8 md:mb-10 px-4 md:px-0">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                  <Filter size={16} />
                </div>
                <h3 className="text-lg font-black text-indigo-600 tracking-tighter italic">
                  Product <span className="text-indigo-600 serif">Catalog</span>
                </h3>
              </div>

              {/* Mobile horizontal categories */}
              <div className="flex md:hidden overflow-x-auto pb-6 px-4 -mx-4 gap-3 no-scrollbar">
                <button 
                  onClick={() => onSelectCategory('all')}
                  className={cn(
                    "whitespace-nowrap px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest italic transition-all",
                    selectedCategory === 'all' 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                      : "bg-gray-100 dark:bg-gray-900 text-gray-500 italic"
                  )}
                >
                  All
                </button>
                {categories?.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.name.toLowerCase())}
                    className={cn(
                      "whitespace-nowrap px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest italic transition-all",
                      selectedCategory === cat.name.toLowerCase()
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                        : "bg-gray-100 dark:bg-gray-900 text-gray-500 italic"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Desktop vertical sidebar */}
              <div className="hidden md:flex flex-col gap-2">
                <button 
                  onClick={() => onSelectCategory('all')}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest italic transition-all group",
                    selectedCategory === 'all' 
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-2" 
                      : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10"
                  )}
                >
                  <LayoutGrid size={18} className={cn("transition-transform group-hover:scale-110", selectedCategory === 'all' ? "text-white" : "text-gray-400")} />
                  All Products
                </button>
                {categories?.map((cat) => {
                  const Icon = icons[cat.icon] || Cpu;
                  const isActive = selectedCategory === cat.name.toLowerCase();
                  return (
                    <button 
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.name.toLowerCase())}
                      className={cn(
                        "flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest italic transition-all group",
                        isActive 
                          ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-2" 
                          : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10"
                      )}
                    >
                      <Icon size={18} className={cn("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-gray-400")} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Promo within sidebar - Desktop only */}
              <div className="hidden md:block mt-12 p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                <Sparkles className="w-8 h-8 mb-4 text-indigo-200" />
                <h4 className="text-xl font-black italic tracking-tighter mb-2 leading-tight">Fast Voice <br /> Checkout.</h4>
                <p className="text-[10px] uppercase font-black tracking-widest text-indigo-100 mb-6 italic opacity-80">
                  Exclusive Offer
                </p>
                <div className="text-3xl font-black italic mb-2 leading-none">20% <span className="text-xs uppercase">Off</span></div>
                <p className="text-[10px] font-medium text-indigo-100 italic">Code: VoxaCart20</p>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="mb-12 md:mb-16 px-4 md:px-0">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 italic leading-tight text-gray-900 dark:text-white">
                {selectedCategory === 'all' ? "Today's " : <span className="capitalize">{selectedCategory} </span>}
                <span className="text-indigo-600 serif">Selection.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium italic">
                {filteredProducts.length} Premium items curated from top vendors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.slice(0, 12).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 shadow-xl shadow-black/5">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Controls */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-10">
                  <button onClick={()=>handleAddToWishlist(product)} className="w-11 h-11 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full flex items-center justify-center text-gray-900 dark:text-white shadow-xl hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110">
                    <Heart size={18} />
                  </button>
                  <Link to={`/details/${product._id || product.id}`}>
                  <button 
                    
                    className="w-11 h-11 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full flex items-center justify-center text-gray-900 dark:text-white shadow-xl hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110"
                  >
                    <Eye size={18} />
                  </button>
                  </Link>
                  
                </div>

                <div className="absolute top-6 left-6 flex flex-wrap gap-1 z-10">
                  {product.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-sm rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 italic">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <button onClick={()=>handleAddToCart(product)} className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 italic hover:bg-indigo-700">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
                
                {/* Quick Info Badges */}
                {(product.colors || product.sizes) && (
                  <div className="absolute bottom-24 left-6 flex gap-1.5 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    {product.colors && (
                       <div className="flex -space-x-1">
                        {product.colors.slice(0, 3).map((c, i) => (
                          <div key={i} className="w-4 h-4 rounded-full border border-white dark:border-gray-900" style={{ backgroundColor: c.toLowerCase().includes('space') ? '#333' : c.toLowerCase().includes('midnight') ? '#191970' : c.toLowerCase().includes('cognac') ? '#9A463D' : c.toLowerCase().includes('emerald') ? '#50C878' : c.toLowerCase().includes('crimson') ? '#DC143C' : c.toLowerCase() }} />
                        ))}
                      </div>
                    )}
                    {product.sizes && (
                      <span className="text-[8px] font-black text-white bg-black/50 backdrop-blur px-2 py-0.5 rounded-md uppercase tracking-wider">{product.sizes.length} Sizes</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-xl font-black tracking-tight line-clamp-1 italic text-gray-950 dark:text-white">{product.name}</h3>
                  <p className="text-xl font-black text-indigo-600 italic">${product.price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">{product.vendor}</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-black italic text-gray-900 dark:text-gray-100">{product.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-gray-400 mx-auto mb-6">
              <RefreshCw size={32} />
            </div>
            <p className="text-gray-400 font-bold italic">No products found in this category.</p>
            <button 
              onClick={() => onSelectCategory('all')}
              className="mt-6 font-black text-xs uppercase tracking-widest text-indigo-600 italic hover:underline"
            >
              Back to all products
            </button>
          </div>
        )}
      </div>
    </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20"
                >
                  <X size={20} />
                </button>

                {/* Left: Product Image */}
                <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover aspect-square md:aspect-auto"
                  />
                </div>

                {/* Right: Product Details */}
                <div className="md:w-1/2 p-10 md:p-14 overflow-y-auto">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      {selectedProduct.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest italic">{tag}</span>
                      ))}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-2 text-gray-950 dark:text-white leading-tight">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-black text-gray-900 dark:text-gray-100">{selectedProduct.rating}</span>
                      </div>
                      <span className="text-gray-300 dark:text-gray-700">|</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm italic font-medium">{selectedProduct.vendor}</span>
                    </div>
                    <p className="text-3xl font-black text-indigo-600 italic mb-8">${selectedProduct.price}</p>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-10 italic">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Extended Details */}
                  <div className="space-y-10 mb-10">
                    {/* Material */}
                    {selectedProduct.material && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 italic">Material</h4>
                        <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-bold italic">
                          <Check size={16} className="text-indigo-500" />
                          {selectedProduct.material}
                        </div>
                      </div>
                    )}

                    {/* Colors */}
                    {selectedProduct.colors && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 italic">Available Colors</h4>
                        <div className="flex flex-wrap gap-4">
                          {selectedProduct.colors.map(color => (
                            <div key={color} className="flex flex-col items-center gap-2 group cursor-pointer">
                              <div className="w-10 h-10 rounded-full ring-2 ring-transparent group-hover:ring-indigo-600 ring-offset-2 dark:ring-offset-gray-900 transition-all shadow-lg" style={{ backgroundColor: color.toLowerCase().includes('space') ? '#333' : color.toLowerCase().includes('midnight') ? '#191970' : color.toLowerCase().includes('cognac') ? '#9A463D' : color.toLowerCase().includes('emerald') ? '#50C878' : color.toLowerCase().includes('crimson') ? '#DC143C' : color }} />
                              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sizes */}
                    {selectedProduct.sizes && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 italic">Select Size</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedProduct.sizes.map(size => (
                            <button key={size} className="px-5 py-2.5 border-2 border-gray-100 dark:border-gray-800 rounded-xl text-sm font-black italic hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-500 transition-all">
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-4 py-8 border-t border-gray-100 dark:border-gray-800 mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white leading-none mb-1">Authentic</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest italic">Verified Vendor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600 dark:text-pink-400">
                        <Truck size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white leading-none mb-1">Express</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest italic">Global Shipping</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-[2] bg-indigo-600 text-white py-5 rounded-3xl font-black flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all italic text-lg transform hover:scale-[1.02] active:scale-95">
                      <ShoppingCart size={22} />
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-5 rounded-3xl font-black flex items-center justify-center shadow-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all italic transform hover:scale-[1.02] active:scale-95">
                      <Heart size={22} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
