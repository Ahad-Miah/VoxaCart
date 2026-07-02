import React, { useState } from 'react';
import { 
  Fingerprint, ShieldAlert, Cpu, Layers, Network, 
  Terminal, Lock, CheckCircle, Radio, Eye
} from 'lucide-react';

// ১. লেফট সাইডের স্টিকি স্ট্যাক কার্ডের ডেটা (বাস্তবসম্মত ও ডিটেইল্ড ইনফো)
const stickyCards = [
  {
    id: "01",
    phase: "PHASE: INPUT PROCESSING",
    title: "Vocal Tokenization Matrix",
    description:
      "When you speak a command, our system converts your voice into anonymous mathematical vectors within milliseconds.",
    metric: "Latency: <45ms",
    status: "Active Shield",
  },
  {
    id: "02",
    phase: "PHASE: VENDOR ISOLATION",
    title: "Decentralized Node Vaults",
    description:
      "Vendors only receive cryptographic delivery tokens instead of customer identity information.",
    metric: "Isolation: 100%",
    status: "Enforced",
  },
  {
    id: "03",
    phase: "PHASE: FINANCIAL ROUTING",
    title: "Zero-Knowledge Ledger",
    description:
      "Transactions use ephemeral one-time payment tokens and wipe automatically after processing.",
    metric: "Tokens: Ephemeral",
    status: "Verified",
  },
  {
    id: "04",
    phase: "PHASE: DELIVERY CHANNEL",
    title: "Encrypted Route Mesh",
    description:
      "Delivery agents never receive customer identity information directly.",
    metric: "Route TTL: 0s",
    status: "Protected",
  },
  {
    id: "05",
    phase: "PHASE: DATA PURGE",
    title: "Autonomous Data Cleanup",
    description:
      "Sensitive metadata automatically self-destructs after retention periods.",
    metric: "Retention: 0%",
    status: "Purged",
  },
  {
  id: "06",
  phase: "PHASE: ACCESS CONTROL",
  title: "Adaptive Identity Firewall",
  description:
    "Every authentication request passes through an adaptive AI firewall that evaluates device fingerprints, behavioral patterns, and geolocation anomalies before granting access.",
  metric: "Threat Score: <1%",
  status: "Secured",
},
{
  id: "07",
  phase: "PHASE: NETWORK DEFENSE",
  title: "Distributed Traffic Shield",
  description:
    "Incoming traffic is distributed across multiple edge nodes to mitigate DDoS attacks and ensure uninterrupted service availability worldwide.",
  metric: "Uptime: 99.999%",
  status: "Protected",
},
{
  id: "08",
  phase: "PHASE: AUDIT ENGINE",
  title: "Immutable Compliance Logs",
  description:
    "Every system event and transaction is permanently recorded in tamper-proof audit chains, enabling complete traceability and regulatory compliance.",
  metric: "Integrity: 100%",
  status: "Archived",
},
  
];

const protocolLayers = [
  {
    id: 'layer-1',
    tabLabel: 'L1: Neural Guard',
    title: 'Biometric Anti-Spoofing Detection',
    subtitle: 'Deepfake & AI Voice Cloning Prevention',
    details: 'Our neural networks analyze background harmonics and physical air-vibration frequencies. If someone plays a recorded audio or an AI-generated clone of your voice, the transaction freezes instantly and flags a Level-3 security alert.',
    codeSnippet: 'SYS_AUTH // CLONE_DETECTION_ACTIVE // ACCURACY: 99.98%'
  },
  {
    id: 'layer-2',
    tabLabel: 'L2: Node Firewall',
    title: 'Automated Vendor Compliance Audit',
    subtitle: 'Real-Time Fraud & NID Verification',
    details: 'Every shop on VoxaCart undergoes a continuous background compliance check. Our AI models monitor merchant delivery rates, customer feedback, and legal entity status. Non-compliant nodes are soft-locked dynamically within 3 seconds.',
    codeSnippet: 'NODE_MONITOR // COMPLIANCE_OK // DRIFT_FACTOR: 0.00'
  },
  {
    id: 'layer-3',
    tabLabel: 'L3: Quantum Safe',
    title: 'Post-Quantum Data Encryption',
    subtitle: 'Future-Proof Cryptographical Standards',
    details: 'All archived system logs, metadata, and communication bridges utilize advanced lattice-based cryptography. This ensures that even future quantum computers cannot intercept or decrypt the historical state of the marketplace.',
    codeSnippet: 'CRYPT_ENG // LATTICE_MODE_ON // ALGO_KYBER_1024'
  }
];

const SecurityPage = () => {
  const [activeLayer, setActiveLayer] = useState(protocolLayers[0]);

  return (
    <div className="bg-[#030305] text-gray-300 min-h-screen font-sans selection:bg-[#7c74ff]/30 selection:text-white overflow-x-clip py-20">
      
     
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f111a_1px,transparent_1px),linear-gradient(to_bottom,#0f111a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HERO HEADER --- */}
      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-500/30 px-3 py-1 rounded-md mb-4">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase">Live Security Matrix v2.4</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase font-mono">
          SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">PROTOCOLS</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl mt-3 font-medium">
          A deeply detailed breakdown of the cryptographic primitives, multi-tenant node isolation, and real-time neural protection guarding the VoxaCart AI ecosystem.
        </p>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* LEFT COLUMN:*/}
 <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-purple-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">Data Lifecycle Pipeline</h2>
          </div>
          
          <div className="space-y-[12vh] pb-[20vh]">
            {stickyCards.map((card, index) => {
              return (
                <div 
                  key={card.id}
                  
                  className="sticky bg-[#090a10] border border-gray-900/80 rounded-2xl p-6 md:p-8 shadow-[0_-20px_40px_rgba(0,0,0,0.9)] transition-all duration-300 group hover:border-[#7c74ff]/30"
                  style={{ 
                    top: `${100 + index * 60}px`, 
                    zIndex: index + 1 
                  }}
                >
              
                  <div className="flex justify-between items-center border-b border-gray-900 pb-3 mb-4">
                    <span className="text-[10px] font-mono text-purple-400 font-bold tracking-widest">{card.phase}</span>
                    <span className="text-xl font-mono text-gray-800 font-black group-hover:text-indigo-500/30 transition-colors">{card.id}</span>
                  </div>

               
                  <h3 className="text-lg font-bold text-white mb-2 tracking-wide flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7c74ff] rounded-full group-hover:scale-125 transition-transform" />
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-5 font-medium">
                    {card.description}
                  </p>

                 
                  <div className="flex justify-between items-center bg-black/40 border border-gray-950 px-4 py-2 rounded-xl text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{card.metric}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                      <span className="text-[9px] uppercase tracking-wider">{card.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* RIGHT COLUMN: I*/}
        <div className="lg:col-span-6 lg:h-[75vh] lg:sticky lg:top-[120px] mt-12 lg:mt-0">
          <div className="inline-flex items-center gap-2 mb-6">
            <Terminal className="w-4 h-4 text-[#7c74ff]" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">Interactive Security Lab</h2>
          </div>

          <div className="bg-[#090a10] border border-gray-900 rounded-2xl p-6 md:p-8 flex flex-col h-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c74ff]/5 blur-3xl rounded-full pointer-events-none" />

        
            <div className="grid grid-cols-3 gap-2 bg-black/40 p-1.5 rounded-xl border border-gray-950 mb-8">
              {protocolLayers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer)}
                  className={`py-2.5 px-2 rounded-lg font-mono text-[11px] md:text-xs font-bold transition-all duration-300 ${
                    activeLayer.id === layer.id
                      ? 'bg-[#151624] text-[#7c74ff] border border-[#7c74ff]/20 shadow-lg'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                  }`}
                >
                  {layer.tabLabel}
                </button>
              ))}
            </div>

            
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md w-fit">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Interactive Diagnostics</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight transition-all duration-300">
                    {activeLayer.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-500 font-semibold">{activeLayer.subtitle}</p>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed pt-2 font-medium">
                  {activeLayer.details}
                </p>
              </div>

              <div className="bg-black/60 border border-gray-950 rounded-xl p-4 font-mono text-[11px] text-emerald-400/90 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-gray-600 shrink-0">$</span>
                  <span className="truncate tracking-wide">{activeLayer.codeSnippet}</span>
                </div>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold shrink-0 ml-2">
                  SECURE
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* --- BOTTOM REALISTIC AUDIT FOOTER --- */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="border-t border-gray-950 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs font-mono text-gray-600">
          <p>VoxaCart AI Cryptographic Core Architecture • Compliance Verified 2026</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Encryption Audit Log</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Node Directory</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SecurityPage;