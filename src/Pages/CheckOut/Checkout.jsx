import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/Authprovider/AuthProvider';
import { CreditCard, Lock, User, Package } from 'lucide-react';

const Checkout = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // প্রোডাক্ট ফেচ করা
  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);

    // এখানে আপনি কার্ড ভ্যালিডেশন লজিক যোগ করতে পারেন
    const orderData = {
      productId: product._id,
      userName: user.displayName,
      userEmail: user.email,
      vendorEmail: product.vendorEmail,
      productName: product.name,
      price: product.price,
      image: product.image,
      date: new Date().toLocaleDateString(),
      status: 'Paid'
    };

    try {
      const response = await axios.post('http://localhost:5000/orders', orderData);
      if (response.data.success) {
        Swal.fire('Success!', 'Your order has been placed successfully.', 'success');
        navigate('/dashboard/orders');
      }
    } catch (error) {
      Swal.fire('Error', 'Transaction failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="text-white min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050508] text-white p-6 md:p-20">
      <div className="max-w-2xl mx-auto bg-[#0c0d14] border border-gray-800 p-8 rounded-3xl">
        <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
          <Lock className="w-6 h-6 text-purple-500" /> Secure Checkout
        </h2>
        
        <form onSubmit={handlePurchase} className="space-y-6">
          {/* কার্ড ফর্ম */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">Cardholder Name</label>
            <input type="text" required className="w-full bg-black p-3 rounded-xl border border-gray-800 mt-1 focus:border-purple-500 outline-none" placeholder="John Doe" />
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">Card Number</label>
            <input type="text" maxLength="16" required className="w-full bg-black p-3 rounded-xl border border-gray-800 mt-1 focus:border-purple-500 outline-none" placeholder="0000 0000 0000 0000" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold uppercase text-gray-500">Expiry</label>
              <input type="text" placeholder="MM/YY" required className="w-full bg-black p-3 rounded-xl border border-gray-800 mt-1 focus:border-purple-500 outline-none" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold uppercase text-gray-500">CVC</label>
              <input type="text" maxLength="3" placeholder="123" required className="w-full bg-black p-3 rounded-xl border border-gray-800 mt-1 focus:border-purple-500 outline-none" />
            </div>
          </div>

          <button disabled={loading} className="w-full py-4 bg-purple-600 rounded-xl font-black uppercase tracking-widest hover:bg-purple-500 transition-all flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5"/> {loading ? 'Processing...' : `Pay $${product.price}`}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Checkout;