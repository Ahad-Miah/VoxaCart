import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Trash2, Shield, User } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
      setLoading(false);
    } catch (error) { console.error("Error:", error); setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  // রোল পরিবর্তনের ফাংশন
  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(`http://localhost:5000/users/role/${id}`, { role: newRole });
      setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
      Swal.fire('Success!', `User is now ${newRole}`, 'success');
    } catch (err) { Swal.fire('Error', 'Failed to update role', 'error'); }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#111827',
      confirmButtonText: 'Yes, delete it!',
      background: '#09090d',
      color: '#fff',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
        Swal.fire('Deleted!', 'User removed.', 'success');
      }
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none font-mono p-6">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          OVERLORD / <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-400">MANAGE_USERS_GRID</span>
        </h3>
      </div>

      <div className="bg-[#08090e]/60 border border-gray-900 rounded-[24px] p-5 overflow-hidden">
        {loading ? <div className="text-center py-10 text-gray-500">Loading...</div> : (
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
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/[0.01] transition-all">
                    <td className="py-4 pl-2 font-bold text-gray-400">{user._id?.slice(-8)}</td>
                    <td className="py-4">
                      <div className="text-white font-bold">{user.name}</div>
                      <div className="text-gray-600 text-[10px] mt-0.5">{user.email}</div>
                    </td>
                    <td className="py-4">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${user.role === 'ADMIN' ? 'border-red-500/20 bg-red-950/20 text-red-400' : 'border-indigo-500/20 bg-indigo-950/20 text-[#7c74ff]'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`text-[9px] font-bold ${user.status === 'ACTIVE' ? 'text-emerald-400' : 'text-red-500'}`}>● {user.status || 'ACTIVE'}</span>
                    </td>
                    <td className="py-4 text-right pr-2 flex justify-end gap-2">
                      {/* Role Toggle Button */}
                      {user.role === 'ADMIN' ? (
                        <button onClick={() => handleRoleChange(user._id, 'customer')} className="p-2 border border-gray-900 hover:border-indigo-500/20 text-gray-500 hover:text-indigo-400 bg-black/40 rounded-xl transition-all">
                          <User className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button onClick={() => handleRoleChange(user._id, 'admin')} className="p-2 border border-gray-900 hover:border-amber-500/20 text-gray-500 hover:text-amber-400 bg-black/40 rounded-xl transition-all">
                          <Shield className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {/* Delete Button */}
                      <button onClick={() => handleDelete(user._id)} className="p-2 border border-gray-900 hover:border-red-500/20 text-gray-500 hover:text-red-400 bg-black/40 rounded-xl transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;