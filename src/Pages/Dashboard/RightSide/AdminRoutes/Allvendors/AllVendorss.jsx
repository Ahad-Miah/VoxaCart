import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Phone, Mail, FileText, User, Building, Globe, Award } from 'lucide-react';

const AllVendorss = () => {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/allvendors')
      .then(res => setApps(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAction = async (id, status, email) => {
    try {
      await axios.patch(`http://localhost:5000/vendor-applications/${id}`, { status, email });
      Swal.fire('Success!', `Vendor has been ${status.toLowerCase()}`, 'success');
      setApps(apps.filter(app => app._id !== id));
      setSelectedApp(null);
    } catch (err) { Swal.fire('Error', 'Failed to update', 'error'); }
  };

  return (
    <section className="bg-[#09090d] min-h-screen text-white py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black italic mb-8 text-white">All<span className="text-[#7c74ff]">Vendors</span></h2>

        {/* Slim Table Rows */}
        <div className="bg-[#11131c] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          {apps.map((app) => (
            <div 
              key={app._id} 
              onClick={() => setSelectedApp(app)}
              className="flex items-center justify-between p-5 border-b border-gray-800 hover:bg-indigo-500/5 cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img src={app.profileImage} className="w-12 h-12 rounded-2xl object-cover" />
                <div>
                  <h4 className="text-sm font-bold">{app.shopName}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{app.name}</p>
                </div>
              </div>
              <div className="text-[10px] bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full font-bold uppercase">
                {app.status || 'PENDING'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PREMIUM MODAL --- */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c0e16] border border-gray-700 p-8 rounded-[40px] w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center gap-5 mb-8">
              <img src={selectedApp.profileImage} className="w-24 h-24 rounded-3xl object-cover border-4 border-indigo-500/20" />
              <div>
                <h2 className="text-xl font-black italic">{selectedApp.shopName}</h2>
                <p className="text-[11px] text-indigo-400 font-bold uppercase">{selectedApp.name}</p>
              </div>
            </div>

            {/* Modal Data Grid */}
            <div className="grid grid-cols-1 gap-3 text-xs mb-8">
              <div className="flex items-center gap-4 bg-[#151720] p-4 rounded-2xl"><Phone size={16} className="text-indigo-500"/> {selectedApp.phone}</div>
              <div className="flex items-center gap-4 bg-[#151720] p-4 rounded-2xl"><Mail size={16} className="text-indigo-500"/> {selectedApp.email}</div>
              <div className="flex items-center gap-4 bg-[#151720] p-4 rounded-2xl"><FileText size={16} className="text-indigo-500"/> NID: {selectedApp.nidNumber}</div>
              <div className="flex items-center gap-4 bg-[#151720] p-4 rounded-2xl"><Award size={16} className="text-indigo-500"/> License: {selectedApp.tradeLicense}</div>
              <div className="flex items-center gap-4 bg-[#151720] p-4 rounded-2xl"><Globe size={16} className="text-indigo-500"/> {selectedApp.websiteUrl}</div>
              <p className="p-4 text-gray-400 leading-relaxed italic bg-[#151720] rounded-2xl border border-gray-800">
                <span className="text-gray-600 block text-[9px] uppercase mb-1">Description:</span>
                {selectedApp.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button onClick={() => handleAction(selectedApp._id, 'verified', selectedApp.email)} className="flex-1 bg-emerald-600 py-4 rounded-2xl font-black italic uppercase text-xs hover:bg-emerald-500 transition-all">Verify Vendor</button>
              <button onClick={() => handleAction(selectedApp._id, 'rejected', selectedApp.email)} className="flex-1 bg-red-900 py-4 rounded-2xl font-black italic uppercase text-xs hover:bg-red-800 transition-all">Reject</button>
            </div>
            <button onClick={() => setSelectedApp(null)} className="w-full mt-6 text-[10px] text-gray-500 uppercase font-bold hover:text-white transition">Close Detail Panel</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllVendorss