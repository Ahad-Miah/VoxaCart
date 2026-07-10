import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { User, Store, MapPin, FileText, CheckCircle, ChevronRight, ChevronLeft, Loader2, X, CheckCircle2, CircleX } from 'lucide-react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';

const VendorRequest = () => {
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const IMGBB_API_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const [request,Setrequest]=useState("");
  
  const [formData, setFormData] = useState({
    phone: '',
    shopName: '',
    profileImage: '',
    tradeLicense: '',
    nidNumber: '',
    websiteUrl: '',
    description: '',
    address: { district: '', upazila: '', postCode: '', street: '' },
    role: 'vendor',
    status: 'pending',
    rating: 0,
    totalProducts: 0,
    createdAt: new Date().toISOString()
  });

  // চেক করা হচ্ছে ইউজার অলরেডি এপ্লাই করেছে কি না
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/vendor-requests/${user.email}`)
        .then(res => { 
          Setrequest(res.data);
          if (res.data) setHasApplied(true); })
        .catch(err => console.log(err));
    }
  }, [user?.email]);

  const steps = [
    { id: 1, title: 'Personal', icon: <User /> },
    { id: 2, title: 'Business', icon: <Store /> },
    { id: 3, title: 'Identity', icon: <FileText /> },
    { id: 4, title: 'Location', icon: <MapPin /> },
    { id: 5, title: 'Overview', icon: <CheckCircle /> }
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    const data = new FormData();
    data.append('image', file);
    try {
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, data);
      setFormData(prev => ({ ...prev, profileImage: res.data.data.url }));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Upload Failed', background: '#08090e', color: '#fff' });
    } finally { setImgLoading(false); }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);
    const finalData = { ...formData, name: user?.displayName, email: user?.email };
    try {
      await axios.post('http://localhost:5000/vendor-requests', finalData);
      setHasApplied(true);
      Swal.fire({ icon: 'success', title: 'APPLICATION_SUBMITTED', background: '#08090e', color: '#fff' });
    } catch (err) { 
      Swal.fire({ icon: 'error', title: 'Failed', text: 'Something went wrong!', background: '#08090e', color: '#fff' }); 
    } finally { setLoading(false); }
  };

  if (hasApplied) {
    return (
      <div className="max-w-2xl mx-auto p-10 mt-20 text-center bg-[#08090e] border border-gray-900 rounded-[32px]">
        {
          request?.status==="pending"?<CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />:<CircleX  className="w-20 h-20 text-red-400 mx-auto mb-6"  />
        }
        <h2 className="text-2xl font-black text-white uppercase">Application {request?.status}</h2>
        <p className="text-gray-500 mt-4">Your vendor request is under review. Please wait for admin approval.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen">
      <form onSubmit={(e) => { e.preventDefault(); step < 5 ? setStep(step + 1) : handleSubmit(); }}>
        <div className="flex justify-between items-center mb-10 overflow-x-auto gap-2">
          {steps.map((s) => (
            <div key={s.id} className={`flex flex-col items-center gap-2 ${step >= s.id ? 'text-indigo-400' : 'text-gray-600'}`}>
              <div className={`p-3 rounded-full border ${step >= s.id ? 'bg-indigo-900/20 border-indigo-500' : 'border-gray-800'}`}>{s.icon}</div>
              <span className="text-[9px] font-bold uppercase">{s.title}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#08090e] border border-gray-900 rounded-[32px] p-8 md:p-12 shadow-2xl">
          <h2 className="text-xl font-black text-white mb-8 uppercase tracking-tighter">Step {step}: {steps[step-1].title}_INFO</h2>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input className="bg-black border border-gray-800 p-4 rounded-xl text-white opacity-60" value={user?.displayName} disabled />
              <input className="bg-black border border-gray-800 p-4 rounded-xl text-white opacity-60" value={user?.email} disabled />
              <input required type="number" className="bg-black border border-gray-800 p-4 rounded-xl text-white md:col-span-2" placeholder="Phone Number (11 digits)" value={formData.phone} onChange={(e) => { if(e.target.value.length <= 11) setFormData({...formData, phone: e.target.value}) }} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <input required className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white" placeholder="Shop Name" onChange={(e) => setFormData({...formData, shopName: e.target.value})} />
              <div className="flex flex-col items-center gap-4 border border-dashed border-gray-800 p-6 rounded-xl">
                {imgLoading ? <Loader2 className="animate-spin text-indigo-500"/> : formData.profileImage && <img src={formData.profileImage} className="w-20 h-20 rounded-full object-cover"/>}
                <input required type="file" onChange={handleImageUpload} className="text-xs text-gray-400" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input required className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white" placeholder="Trade License Number" onChange={(e) => setFormData({...formData, tradeLicense: e.target.value})} />
              <input required className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white" placeholder="NID Number" onChange={(e) => setFormData({...formData, nidNumber: e.target.value})} />
              <input className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white" placeholder="Website/Social URL" onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})} />
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required className="bg-black border border-gray-800 p-4 rounded-xl text-white" placeholder="Street" onChange={(e) => setFormData({...formData, address: {...formData.address, street: e.target.value}})} />
              <input required className="bg-black border border-gray-800 p-4 rounded-xl text-white" placeholder="District" onChange={(e) => setFormData({...formData, address: {...formData.address, district: e.target.value}})} />
              <input required className="bg-black border border-gray-800 p-4 rounded-xl text-white" placeholder="Upazila" onChange={(e) => setFormData({...formData, address: {...formData.address, upazila: e.target.value}})} />
              <input required className="bg-black border border-gray-800 p-4 rounded-xl text-white" placeholder="Post Code" onChange={(e) => setFormData({...formData, address: {...formData.address, postCode: e.target.value}})} />
            </div>
          )}

          {step === 5 && (
            <textarea required className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white h-40" placeholder="Business Description..." onChange={(e) => setFormData({...formData, description: e.target.value})} />
          )}

          <div className="flex justify-between mt-12">
            <button type="button" disabled={step === 1} onClick={() => setStep(step - 1)} className="text-gray-500 font-bold flex items-center gap-2"><ChevronLeft/> BACK</button>
            <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">{step < 5 ? 'NEXT' : (loading ? <Loader2 className="animate-spin"/> : 'SUBMIT_REQUEST')}</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default VendorRequest;