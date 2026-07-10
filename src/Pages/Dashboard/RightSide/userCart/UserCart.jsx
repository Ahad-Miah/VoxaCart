import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Trash2, Plus, Minus, CreditCard, Terminal, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';

const UserCart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/${user?.email}`);
      setCartItems(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (user?.email) fetchCart(); }, [user?.email]);

  const updateQty = async (id, currentQty, action) => {
    let newQty = action === 'increase' ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;

    try {
      await axios.patch(`http://localhost:5000/cart/update/${id}`, { quantity: newQty });
      setCartItems(prevItems => prevItems.map(item => item._id === id ? { ...item, quantity: newQty } : item));
    } catch (error) { console.error("Update failed:", error); }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/delete/${id}`);
      fetchCart();
    } catch (error) { console.error("Delete failed:", error); }
  };

  const handleCheckout = async (total) => {
    const { value: formValues } = await Swal.fire({
      title: 'TERMINAL_AUTH',
      background: '#08090e',
      color: '#fff',
      html: `
        <input id="swal-card" class="swal2-input" placeholder="Card Number" style="background:#1a1a20; color:#fff; border:1px solid #333">
        <input id="swal-cvv" class="swal2-input" placeholder="CVV" type="password" style="background:#1a1a20; color:#fff; border:1px solid #333">
      `,
      confirmButtonText: 'PROCESS_PURCHASE',
      focusConfirm: false,
      preConfirm: () => document.getElementById('swal-card').value
    });

    if (formValues) {
      try {
        const response = await axios.post('http://localhost:5000/checkout', {
          items: cartItems,
          email: user.email,
          userName: user.displayName || "Customer",
          total: total
        });
        if (response.data.success) {
          Swal.fire({ icon: 'success', title: 'Purchase Successful', text: 'Items moved to Order Pipeline!', background: '#08090e', color: '#fff' });
          navigate('/dashboard/orders');
        }
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Transaction Failed', background: '#08090e', color: '#fff' });
      }
    }
  };

  const subTotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  const deliveryCharge = 120;
  const grandTotal = subTotal + deliveryCharge;

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin w-10 h-10 text-indigo-500" /></div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none p-4">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black font-mono text-white uppercase tracking-tight">
          CART_MATRIX / <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">ASSETS_CHECKOUT</span>
        </h3>
        <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">Review active tokens inside the purchase terminal queue.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          {cartItems.length > 0 ? cartItems.map((item) => (
            <div key={item._id} className="bg-[#08090e]/60 border border-gray-900 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl transition-all">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={item.image} className="w-16 h-16 rounded-xl object-cover border border-gray-800" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white">{item.name}</h4>
                  <span className="text-[10px] font-mono text-gray-500">UNIT_PRICE: ৳ {Number(item.price)}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-black/40 border border-gray-900 rounded-lg p-1">
                  <button onClick={() => updateQty(item._id, item.quantity, 'decrease')} className="p-1 hover:text-[#7c74ff]"><Minus className="w-3 h-3" /></button>
                  <span className="px-3 text-xs font-bold">{item.quantity}</span>
                  <button onClick={() => updateQty(item._id, item.quantity, 'increase')} className="p-1 hover:text-[#7c74ff]"><Plus className="w-3 h-3" /></button>
                </div>
                <span className="text-xs font-black">৳ {Number(item.price) * Number(item.quantity)}</span>
                <button onClick={() => deleteItem(item._id)} className="text-red-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          )) : <div className="border border-dashed border-gray-900 rounded-2xl p-12 text-center text-gray-600 font-mono text-xs uppercase">No assets in queue terminal.</div>}
        </div>

        <div className="lg:col-span-4 bg-[#08090e]/80 border border-gray-900 rounded-[24px] p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-gray-900 pb-3 mb-4">
            <Terminal className="w-4 h-4 text-[#7c74ff]" />
            <h5 className="text-xs font-black font-mono uppercase text-white tracking-widest">Billing Blueprint</h5>
          </div>
          <div className="space-y-3 font-mono text-xs border-b border-gray-900 pb-4">
            <div className="flex justify-between text-gray-500"><span>SUBTOTAL:</span><span className="text-gray-300 font-bold">৳ {subTotal}</span></div>
            <div className="flex justify-between text-gray-500"><span>SHIPPING:</span><span className="text-gray-300 font-bold">৳ {deliveryCharge}</span></div>
          </div>
          <div className="flex justify-between items-center py-4 text-emerald-400 font-black">
            <span>NET_ESTIMATE:</span><span>৳ {grandTotal}</span>
          </div>
          <button 
            onClick={() => handleCheckout(grandTotal)} 
            disabled={cartItems.length === 0}
            className={`w-full py-3.5 rounded-xl font-black italic flex items-center justify-center gap-2 transition-all ${
                cartItems.length === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <CreditCard className="w-4 h-4" /> 
            {cartItems.length === 0 ? 'EMPTY_QUEUE' : 'INITIALIZE_PURCHASE'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCart;