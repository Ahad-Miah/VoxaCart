import React from 'react';
import { CheckSquare, Check, X, Building, Link2 } from 'lucide-react';

const VendorApplications = () => {
  const applications = [
    { id: "APP-09", shopName: "Apex Tech Bangladesh", applicant: "Rashedul Islam", date: "08-07-2026", docs: "NID_Verified" }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto select-none font-mono">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          OVERLORD / <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">VENDOR_APPLICATIONS</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">Review legal vendor profile validation and handshake authentication tokens.</p>
      </div>

      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app.id} className="bg-[#08090e]/60 border border-gray-900 rounded-[22px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl hover:border-gray-800 transition-all duration-300">
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 bg-amber-950/20 border border-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
                  <Building className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[8px] font-bold text-gray-600 block uppercase tracking-widest">App Node: {app.id}</span>
                  <h4 className="text-xs font-bold text-white truncate">{app.shopName}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">By: {app.applicant} | {app.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-900/40">
                <div className="text-left sm:text-right">
                  <span className="text-[8px] text-gray-600 block uppercase tracking-widest">Legal Document</span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><Link2 className="w-3 h-3" /> {app.docs}</span>
                </div>
                
                <div className="flex gap-2 pl-4">
                  <button className="p-2.5 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl transition-all">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="border border-dashed border-gray-900 rounded-2xl p-12 text-center text-gray-600 text-xs uppercase">
            No pending registration application packets found.
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorApplications;