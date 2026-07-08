import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import { Mail, Lock, Terminal, ArrowRight, ShieldCheck, User, Image, UploadCloud, UserPlus, IdCard } from 'lucide-react';
import { AuthContext } from '../../Provider/Authprovider/AuthProvider';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const Register = () => {
  
  const { register, handleUpdateProfile,setLoading,loading,loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [selectedFile, setSelectedFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null);
  // const [loading, setLoading] = useState(false); 

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (formData.password.length < 6) {
      toast.error('Passkey matrix must be at least 6 characters!');
      return;
    }

    setLoading(true);
    let photoURL = '';

    try {
     
      if (selectedFile) {
        const imgData = new FormData();
        imgData.append('image', selectedFile);

        
        // const imgbbApiKey = 'YOUR_IMGBB_API_KEY_HERE'; 
        
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${image_hosting_key}`, {
          method: 'POST',
          body: imgData,
        });
        
        const resData = await response.json();
        
        if (resData.success) {
          photoURL = resData.data.url; 
        } else {
          throw new Error('Identity avatar upload to ImgBB failed.');
        }
      }

      
      await register(formData.email, formData.password);

      
      await handleUpdateProfile(formData.name, photoURL);

      
      toast.success('Identity Created! Session Initialized onto Core Grid.');
      navigate('/'); 
      
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Authentication override failed! Try again.');
    } finally {
      setLoading(false);
    }
  };
  const googleLogin=()=>{
    loginWithGoogle();
    navigate('/');
  }

  return (
    <div className="bg-[#030305] text-gray-300 min-h-screen font-sans selection:bg-[#7c74ff]/30 selection:text-white flex items-center justify-center p-4 md:p-8 relative overflow-hidden select-none">
      
     
      <style>{`
        @keyframes profile-float {
          0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 0 15px rgba(168,85,247,0.2)); }
          50% { transform: translateY(-8px) scale(1.03); filter: drop-shadow(0 0 25px rgba(168,85,247,0.4)); }
        }
        @keyframes pulse-expand {
          0% { transform: scale(0.95); opacity: 0.1; }
          50% { opacity: 0.3; border-color: #a855f7; }
          100% { transform: scale(1.1); opacity: 0.05; }
        }
        @keyframes spin-clock {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter-clock {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes upload-stream {
          0% { transform: translateY(100%); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        .animate-profile-hub { animation: profile-float 4s ease-in-out infinite; }
        .animate-pulse-expand { animation: pulse-expand 2.5s ease-in-out infinite; }
        .animate-spin-fast-sync { animation: spin-clock 10s linear infinite; }
        .animate-spin-slow-rev-sync { animation: spin-counter-clock 18s linear infinite; }
        .animate-upload-stream-1 { animation: upload-stream 6s linear infinite; }
        .animate-upload-stream-2 { animation: upload-stream 8s linear infinite; animation-delay: 3s; }
      `}</style>

      
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />

     
      <div className="w-full max-w-6xl flex flex-col-reverse lg:grid lg:grid-cols-12 bg-[#08090e]/60 border border-gray-900 rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl relative z-10">
        
        {/* ================= LEFT COLUMN: REGISTER FORM ================= */}
        <div className="w-full lg:col-span-6 p-6 md:p-12 xl:p-16 flex flex-col justify-between space-y-10 bg-gradient-to-b from-transparent to-black/20">
          
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-md">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[9px] font-mono tracking-widest text-purple-300 uppercase">Profile Generation System</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black font-mono text-white tracking-tight uppercase">
                CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#7c74ff]">IDENTITY</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                Register a new decentralized profile slot onto the database grid node.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Profile Image Upload Component */}
              <div className="flex flex-col items-center justify-center p-3 border border-dashed border-gray-900 rounded-2xl bg-black/20 group hover:border-purple-500/30 transition-all duration-300 relative">
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2 py-2">
                  {imagePreview ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-purple-950/20 border border-purple-900/40 rounded-full flex items-center justify-center group-hover:bg-purple-950/40 transition-all">
                      <Image className="w-5 h-5 text-purple-400" />
                    </div>
                  )}
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-purple-300 transition-colors">
                    {imagePreview ? "Change Avatar Image" : "Upload Identity Avatar"}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              {/* Full Name Field */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block pl-1">Full Name</label>
                <div className="flex items-center gap-3 bg-black/40 border border-gray-900 focus-within:border-purple-500/40 px-4 py-3.5 rounded-xl transition-all duration-300">
                  <User className="w-4 h-4 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Enter your Name" 
                    className="bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none w-full font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block pl-1">Network Email</label>
                <div className="flex items-center gap-3 bg-black/40 border border-gray-900 focus-within:border-[#7c74ff]/40 px-4 py-3.5 rounded-xl transition-all duration-300">
                  <Mail className="w-4 h-4 text-gray-600 group-focus-within:text-[#7c74ff] transition-colors" />
                  <input 
                    type="email" 
                    placeholder="identity@voxacart.com" 
                    className="bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none w-full font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block pl-1">Generate Passkey</label>
                <div className="flex items-center gap-3 bg-black/40 border border-gray-900 focus-within:border-purple-500/40 px-4 py-3.5 rounded-xl transition-all duration-300">
                  <Lock className="w-4 h-4 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    className="bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none w-full font-medium"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full ${loading ? 'bg-purple-800 opacity-60 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white py-3.5 rounded-xl font-mono text-xs font-black italic tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 mt-6 group`}
              >
                {loading ? "COMPILING REGISTRATION MATRIX..." : "EXECUTE SETUP_ACCOUNT"}
                {!loading && <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-4">
              <div className="w-full h-[1px] bg-gray-900" />
              <span className="absolute bg-[#08090e] px-3 font-mono text-[9px] text-gray-600 tracking-widest">OR INTERACTION</span>
            </div>

            {/* Google Signup */}
            <button onClick={googleLogin} className="w-full bg-black/40 border border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white py-3.5 rounded-xl font-mono text-[10px] font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group">
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 duration-300" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.415 1.156 15.58.5 12.24.5c-6.353 0-11.5 5.147-11.5 11.5s5.147 11.5 11.5 11.5c6.63 0 11.033-4.663 11.033-11.2 0-.756-.082-1.334-.185-1.815H12.24z"/>
              </svg>
              REGISTER VIA GOOGLE
            </button>
          </div>

         
          <div className="text-center pt-6 border-t border-gray-900/40">
            <p className="text-xs text-gray-500 font-medium">
              Already have an active identity?{' '}
              <span 
                onClick={() => navigate('/login')} 
                className="text-purple-400 hover:text-[#7c74ff] font-bold underline underline-offset-4 cursor-pointer transition-colors font-mono tracking-wide ml-1"
              >
                Access System Login
              </span>
            </p>
          </div>
        </div>

        {/* ================= RIGHT/TOP COLUMN: INTERACTIVE PROFILE SYNC ANIMATION ================= */}
        <div className="w-full lg:col-span-6 bg-[#05060a] p-8 lg:p-12 border-b lg:border-b-0 lg:border-l border-gray-900/60 relative flex flex-col justify-center items-center overflow-hidden min-h-[350px] lg:min-h-[550px]">
          
         
          <div className="absolute left-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent overflow-hidden">
            <div className="w-full h-24 bg-gradient-to-b from-purple-400 to-transparent animate-upload-stream-1" />
          </div>
          <div className="absolute right-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent overflow-hidden">
            <div className="w-full h-32 bg-gradient-to-b from-[#7c74ff] to-transparent animate-upload-stream-2" />
          </div>

       
          <div className="relative w-80 h-80 flex items-center justify-center scale-75 sm:scale-90 md:scale-100 transition-transform">
            
            <div className="absolute inset-0 border border-purple-500/5 rounded-full animate-pulse-expand" />
            <div className="absolute inset-4 border border-dashed border-gray-800 rounded-full animate-spin-slow-rev-sync" />
            <div className="absolute inset-10 border-2 border-dashed border-purple-500/20 rounded-full animate-spin-fast-sync" />
            <div className="absolute inset-16 border border-indigo-500/10 rounded-full" />
            
            <div className="w-32 h-32 rounded-[28px] bg-gradient-to-tr from-[#0c0816] to-[#1a1429] border border-gray-800/80 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.05)] relative animate-profile-hub z-10">
              
              <div className="w-14 h-14 bg-black/60 rounded-full border border-gray-900 flex items-center justify-center shadow-inner relative">
                <UserPlus className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
                <div className="absolute left-0 right-0 h-[2px] bg-purple-400/50 shadow-[0_0_8px_#a855f7] top-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              
              <div className="absolute bottom-3 flex gap-1">
                <span className="w-1 h-1 bg-purple-400 rounded-full animate-ping" />
                <span className="w-1 h-1 bg-purple-400 rounded-full" />
                <span className="w-1 h-1 bg-indigo-500 rounded-full" />
              </div>

            </div>

            <div className="absolute top-10 right-10 w-8 h-8 bg-black/80 border border-gray-900 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '3.5s' }}>
              <UploadCloud className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="absolute bottom-12 left-8 w-8 h-8 bg-black/80 border border-gray-900 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
              <IdCard className="w-4 h-4 text-purple-400" />
            </div>

          </div>

          <div className="text-center max-w-xs space-y-1.5 mt-2 lg:mt-0 relative z-10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-purple-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold tracking-widest uppercase">READY FOR DATA INTAKE</span>
            </div>
            <p className="text-[10px] font-mono text-gray-600 leading-relaxed">
              Injecting account nodes into the network architecture. Provide valid token assets to register.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;