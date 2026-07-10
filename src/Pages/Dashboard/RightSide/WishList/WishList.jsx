import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';


const WishList = () => {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/wishlist/${user?.email}`);
      setWishlistItems(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (user?.email) fetchWishlist(); }, [user?.email]);

  // Add to Cart Logic
const addToCart = async (item) => {
    // উইশলিস্টের ডাটা থেকে কার্টের জন্য প্রয়োজনীয় ফিল্ডগুলো নিচ্ছি
    const cartData = {
      productId: item.productId,
      userEmail: user.email,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1 // প্রথমবার ১ হিসেবে যাবে
    };

    try {
      // আপনার আগের স্মার্ট /cart API কল করুন
      await axios.post('http://localhost:5000/cart', cartData);
      
      // কার্টে সফলভাবে যোগ হওয়ার পর উইশলিস্ট থেকে ডিলিট করুন
      await axios.delete(`http://localhost:5000/wishlist/delete/${item._id}`);
      
      Swal.fire({ icon: 'success', title: 'Added to Cart!', background: '#08090e', color: '#fff' });
      fetchWishlist(); // উইশলিস্ট রিফ্রেশ করুন
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Failed', background: '#08090e', color: '#fff' });
    }
  };

  const deleteFromWishlist = async (id) => {
    await axios.delete(`http://localhost:5000/wishlist/delete/${id}`);
    fetchWishlist();
  };

  if (loading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-purple-500 w-10 h-10" /></div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none p-4">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black font-mono text-white uppercase tracking-tight">
          WISHLIST / <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">MONITORED_VAULT</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item._id} className="bg-[#08090e]/60 border border-gray-900 rounded-[20px] p-4 flex gap-4 backdrop-blur-xl group hover:border-purple-500/20 transition-all">
              <div className="w-20 h-20 bg-black/40 border border-gray-900 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-1 overflow-hidden">
                <div className="space-y-1">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-mono font-bold text-white truncate">{item.name}</h4>
                    <button onClick={() => deleteFromWishlist(item._id)} className="text-gray-600 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-purple-400 font-black">৳ {item.price}</span>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[9px] font-black tracking-widest uppercase bg-[#7c74ff]/10 hover:bg-[#7c74ff] text-[#7c74ff] hover:text-white border border-[#7c74ff]/20 transition-all"
                >
                  <ShoppingCart className="w-3 h-3" /> INJECT_TO_CART
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 border border-dashed border-gray-900 rounded-2xl p-12 text-center text-gray-600 font-mono text-xs uppercase">
            No bookmarks saved inside the grid vault.
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;