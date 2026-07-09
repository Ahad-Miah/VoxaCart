import React, { useState, useEffect, useContext } from 'react';
import { ShoppingBag, Calendar, PackageCheck, Layers, CreditCard, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';


const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/orders/${user.email}`)
        .then(res => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Order fetch error:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <div className="text-white text-center mt-20 animate-pulse font-mono tracking-widest">SYNCING SYSTEM LOGS...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      {/* HEADER SECTION */}
      <div className="border-l-4 border-indigo-500 pl-4">
        <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
          Transaction <span className="text-indigo-500">History</span>
        </h3>
        <p className="text-gray-400 text-sm font-medium mt-1">Verified records for account: {user?.email}</p>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div 
              key={order._id} 
              className="group relative bg-[#0c0d14]/80 backdrop-blur-md border border-gray-800 hover:border-indigo-500/50 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
            >
              {/* STATUS INDICATOR BAR */}
              <div className={`absolute top-0 left-0 h-full w-1.5 rounded-l-3xl ${order.status === "DELIVERED" ? "bg-emerald-500" : "bg-amber-500"}`} />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* PRODUCT IMAGE & INFO */}
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-700 bg-black">
                    <img src={order.image} alt={order.productName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white uppercase tracking-wide group-hover:text-indigo-400 transition-colors">
                      {order.productName}
                    </h4>
                    <p className="text-gray-500 font-mono text-xs mt-1">ID: {order._id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>

                {/* METADATA */}
                <div className="flex items-center gap-8 border-t md:border-t-0 border-gray-800 pt-4 md:pt-0">
                  <div className="text-center">
                    <p className="text-[10px] uppercase text-gray-500 font-black">Date</p>
                    <p className="text-sm text-gray-300 font-bold">{order.date}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase text-gray-500 font-black">Price</p>
                    <p className="text-lg text-white font-black italic">৳{order.price}</p>
                  </div>
                </div>

                {/* STATUS & ACTION */}
                <div className="flex items-center justify-between md:flex-col gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {order.status || "PROCESSING"}
                  </span>
                  <button className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-white transition-all">
                    View <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl text-gray-600 font-black uppercase tracking-widest">
            No Transaction Logs Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;