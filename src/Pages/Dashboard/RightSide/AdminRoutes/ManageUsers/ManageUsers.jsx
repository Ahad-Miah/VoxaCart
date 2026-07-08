import React from 'react';
import { Users, ShieldCheck, ShieldAlert, UserX, UserCheck } from 'lucide-react';

const ManageUsers = () => {
  const usersList = [
    { uid: "USR-8821", name: "Sabbir Rahman", email: "sabbir@voxa.com", role: "VENDOR", state: "ACTIVE" },
    { uid: "USR-7402", name: "Asif Iqbal", email: "asif@voxa.com", role: "USER", state: "ACTIVE" },
    { uid: "USR-1109", name: "Tanvir Ahmed", email: "tanvir@voxa.com", role: "USER", state: "SUSPENDED" }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none font-mono">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          OVERLORD / <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-400">MANAGE_USERS_GRID</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">Alter permissions matrix or terminate accounts access tokens.</p>
      </div>

      <div className="bg-[#08090e]/60 border border-gray-900 rounded-[24px] p-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-900 text-gray-600 text-[10px] uppercase tracking-wider">
                <th className="pb-3 pl-2">Node_UID</th>
                <th className="pb-3">Identity</th>
                <th className="pb-3">Role Matrix</th>
                <th className="pb-3">State</th>
                <th className="pb-3 text-right pr-2">Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900/40">
              {usersList.map((user) => (
                <tr key={user.uid} className="hover:bg-white/[0.01] transition-all">
                  <td className="py-4 pl-2 font-bold text-gray-400">{user.uid}</td>
                  <td className="py-4">
                    <div className="text-white font-bold">{user.name}</div>
                    <div className="text-gray-600 text-[10px] mt-0.5">{user.email}</div>
                  </td>
                  <td className="py-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${user.role === 'VENDOR' ? 'border-amber-500/20 bg-amber-950/20 text-amber-400' : 'border-indigo-500/20 bg-indigo-950/20 text-[#7c74ff]'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`text-[9px] font-bold ${user.state === 'ACTIVE' ? 'text-emerald-400' : 'text-red-500'}`}>
                      ● {user.state}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-2">
                    {user.state === 'ACTIVE' ? (
                      <button className="p-2 border border-gray-900 hover:border-red-500/20 text-gray-500 hover:text-red-400 bg-black/40 rounded-xl transition-all">
                        <UserX className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button className="p-2 border border-gray-900 hover:border-emerald-500/20 text-gray-500 hover:text-emerald-400 bg-black/40 rounded-xl transition-all">
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;