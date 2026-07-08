import React, { useContext, useState } from 'react';
import { Mail, Lock, Terminal, ArrowRight, ShieldCheck, KeyRound, ScanEye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/Authprovider/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const {login,setLoading }=useContext(AuthContext);
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password)
            .then(res => {
                e.target.reset();
                // console.log(res);
                toast.success("Logged in! Congratulations!");
                navigate(location?.state ? location.state : "/");
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
                toast.error("Error !Invalid Email or Password!");
            });
    
  };

  return (
    <div className="bg-[#030305] text-gray-300 min-h-screen font-sans selection:bg-[#7c74ff]/30 selection:text-white flex items-center justify-center p-4 md:p-8 relative overflow-hidden select-none">
      
     
      <style>{`
        @keyframes lock-float {
          0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 0 15px rgba(124,116,255,0.2)); }
          50% { transform: translateY(-8px) scale(1.03); filter: drop-shadow(0 0 25px rgba(124,116,255,0.4)); }
        }
        @keyframes pulse-scan {
          0% { transform: scale(0.98); opacity: 0.1; }
          50% { opacity: 0.3; border-color: #34d399; }
          100% { transform: scale(1.08); opacity: 0.05; }
        }
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes data-stream {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-lock { animation: lock-float 4s ease-in-out infinite; }
        .animate-scan { animation: pulse-scan 2.5s ease-in-out infinite; }
        .animate-spin-fast { animation: spin-clockwise 8s linear infinite; }
        .animate-spin-slow-rev { animation: spin-counter 16s linear infinite; }
        .animate-stream-1 { animation: data-stream 5s linear infinite; }
        .animate-stream-2 { animation: data-stream 7s linear infinite; animation-delay: 2s; }
      `}</style>

      
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full pointer-events-none" />

      
      <div className="w-full max-w-6xl flex flex-col-reverse lg:grid lg:grid-cols-12 bg-[#08090e]/60 border border-gray-900 rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl relative z-10">
        
        {/* ================= LEFT COLUMN: CLEAN LOGIN FORM ================= */}
        <div className="w-full lg:col-span-6 p-6 md:p-12 xl:p-16 flex flex-col justify-between space-y-10 bg-gradient-to-b from-transparent to-black/20">
          
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-500/20 px-3 py-1 rounded-md-md">
              <Terminal className="w-3.5 h-3.5 text-[#7c74ff]" />
              <span className="text-[9px] font-mono tracking-widest text-indigo-300 uppercase">Secure Auth Tunnel</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black font-mono text-white tracking-tight uppercase">
                INITIALIZE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">SESSION</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                Provide credentials to decrypt and authorize your core grid profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block pl-1">Email</label>
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
                <div className="flex justify-between items-center pl-1">
                  <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block">Passkey</label>
                  <span className="text-[10px] text-gray-600 hover:text-indigo-400 cursor-pointer font-mono font-medium transition-colors">Forgot?</span>
                </div>
                <div className="flex items-center gap-3 bg-black/40 border border-gray-900 focus-within:border-[#7c74ff]/40 px-4 py-3.5 rounded-xl transition-all duration-300">
                  <Lock className="w-4 h-4 text-gray-600 group-focus-within:text-[#7c74ff] transition-colors" />
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

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-[#5046e5] hover:bg-[#6359e9] text-white py-3.5 rounded-xl font-mono text-xs font-black italic tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 mt-6 group"
              >
                EXECUTE SIGN_IN
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className="w-full h-[1px] bg-gray-900" />
              <span className="absolute bg-[#08090e] px-3 font-mono text-[9px] text-gray-600 tracking-widest">OR INTERACTION</span>
            </div>

            {/* Google Login */}
            <button className="w-full bg-black/40 border border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white py-3.5 rounded-xl font-mono text-[10px] font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group">
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 duration-300" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.415 1.156 15.58.5 12.24.5c-6.353 0-11.5 5.147-11.5 11.5s5.147 11.5 11.5 11.5c6.63 0 11.033-4.663 11.033-11.2 0-.756-.082-1.334-.185-1.815H12.24z"/>
              </svg>
              AUTHENTICATE VIA GOOGLE
            </button>
          </div>

         
          <div className="text-center pt-6 border-t border-gray-900/40">
            <p className="text-xs text-gray-500 font-medium">
              New to the system grid?{' '}
              <Link 
                to={'/register'}
                className="text-[#7c74ff] hover:text-purple-400 font-bold underline underline-offset-4 cursor-pointer transition-colors font-mono tracking-wide ml-1"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>

        {/* ================= RIGHT/TOP COLUMN: INTERACTIVE LOCK ANIMATION ================= */}
        
        <div className="w-full lg:col-span-6 bg-[#05060a] p-8 lg:p-12 border-b lg:border-b-0 lg:border-l border-gray-900/60 relative flex flex-col justify-center items-center overflow-hidden min-h-[350px] lg:min-h-[550px]">
          
         
          <div className="absolute left-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent overflow-hidden">
            <div className="w-full h-24 bg-gradient-to-b from-transparent to-[#7c74ff] animate-stream-1" />
          </div>
          <div className="absolute right-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent overflow-hidden">
            <div className="w-full h-32 bg-gradient-to-b from-transparent to-purple-400 animate-stream-2" />
          </div>

         
          <div className="relative w-80 h-80 flex items-center justify-center scale-75 sm:scale-90 md:scale-100 transition-transform">
            
           
            <div className="absolute inset-0 border border-indigo-500/5 rounded-full animate-scan" />
            <div className="absolute inset-4 border border-dashed border-gray-800 rounded-full animate-spin-slow-rev" />
            <div className="absolute inset-10 border-2 border-dashed border-[#7c74ff]/20 rounded-full animate-spin-fast" />
            <div className="absolute inset-16 border border-purple-500/10 rounded-full" />
            
           
            <div className="w-32 h-32 rounded-[28px] bg-gradient-to-tr from-[#0b0c16] to-[#141629] border border-gray-800/80 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.05)] relative animate-lock z-10">
              
             
              <div className="w-14 h-14 bg-black/60 rounded-full border border-gray-900 flex items-center justify-center shadow-inner relative">
                <Lock className="w-6 h-6 text-[#7c74ff] drop-shadow-[0_0_8px_rgba(124,116,255,0.7)]" />
               
                <div className="absolute left-0 right-0 h-[2px] bg-emerald-400/70 shadow-[0_0_8px_#34d399] top-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              
              
              <div className="absolute bottom-3 flex gap-1">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                <span className="w-1 h-1 bg-indigo-500 rounded-full" />
              </div>

            </div>

           
            <div className="absolute top-10 left-10 w-8 h-8 bg-black/80 border border-gray-900 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
              <KeyRound className="w-4 h-4 text-purple-400" />
            </div>
            <div className="absolute bottom-12 right-8 w-8 h-8 bg-black/80 border border-gray-900 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <ScanEye className="w-4 h-4 text-emerald-400" />
            </div>

          </div>

          
          <div className="text-center max-w-xs space-y-1.5 mt-2 lg:mt-0 relative z-10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#7c74ff]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold tracking-widest uppercase">AWAITING CREDENTIALS</span>
            </div>
            <p className="text-[10px] font-mono text-gray-600 leading-relaxed">
              Verify biometric key or email payload tokens to pass the identity validation layer.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;