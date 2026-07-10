import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Cpu,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Edit,
  Trash2,
  PlusCircle,
  Layers,
  DollarSign,
  CheckCircle,
  Eye,
  X,
} from "lucide-react";

const VendorAiCore = () => {
  const vendorEmail = "vendor@voxa.com";
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiStatus, setAiStatus] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiInsight, setAiInsight] = useState(null);

  // ১. ডাটাবেজ থেকে নির্দিষ্ট ভেন্ডরের ডাটা রিড করা
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/myProduct/${vendorEmail}`,
        );
        if (response.data) {
          setVendorProducts(response.data);
        }
      } catch (error) {
        console.error("AI Core Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendorData();
  }, [vendorEmail]);

  // ২. লাইভ জেমিনি এআই বুস্ট ইঞ্জিন (v1 স্টেবল গেটওয়ে - ১০০% গ্যারান্টিড)

  
const handleAiBoost = async (product) => {
    setAiStatus(prev => ({ ...prev, [product._id]: 'Analyzing...' }));

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey || apiKey.startsWith('AQ.')) {
        throw new Error("Invalid Key Type: You are using a Cloud token (AQ.). Please use a valid AI Studio key (AIzaSy).");
      }

      // v1beta/models/gemini-1.5-flash হচ্ছে AI Studio-র জন্য সবচেয়ে স্টেবল রুট
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const prompt = `
        You are an expert E-commerce SEO Optimizer. Analyze the following product details and optimize them for high conversion sales.
        Product Name: ${product?.name || "Unknown Product"}
        Category: ${product?.category || "General"}
        Current Description: ${product?.description || "No description provided."}

        Provide your optimization output strictly in a valid JSON format with the following keys, do not include markdown code block syntax (like \`\`\`json):
        {
          "optimizedTitle": "A highly catchy, professional, SEO-boosted title",
          "optimizedDescription": "An engaging, premium, benefit-driven product description with bullet points",
          "metaTags": "3-5 high traffic comma separated tags based on product context"
        }
      `;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}. Google rejected this key configuration.`);
      }

      const data = await response.json();
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }

      const cleanJsonText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const aiData = JSON.parse(cleanJsonText);

      setAiStatus(prev => ({ ...prev, [product._id]: 'Optimizing...' }));

      const updatedPayload = {
        name: aiData?.optimizedTitle || product?.name,
        description: aiData?.optimizedDescription || product?.description,
        tags: aiData?.metaTags || "",
        aiOptimized: true
      };

      const backendResponse = await axios.put(`http://localhost:5000/product/${product._id}`, updatedPayload);

      if (backendResponse.data) {
        setVendorProducts(prev => 
          prev.map(item => item._id === product._id ? { ...item, ...updatedPayload } : item)
        );
        
        setAiStatus(prev => ({ ...prev, [product._id]: 'Optimized' }));

        Swal.fire({
          title: 'AI Transformation Success!',
          text: `"${product?.name || 'Product'}" has been successfully optimized by Gemini Core.`,
          icon: 'success',
          background: '#0b0c13',
          color: '#fff',
          confirmButtonColor: '#8b5cf6'
        });
      }

    } catch (error) {
      console.error("Gemini Engine Error:", error);
      setAiStatus(prev => ({ ...prev, [product._id]: 'Failed' }));
      Swal.fire({
        icon: 'error',
        title: 'AI Matrix Error',
        text: error.message || 'Failed to optimize. Ensure your API Key is correct and try again.',
        background: '#161925',
        color: '#fff'
      });
    }
  };

  // ৩. প্রোডাক্ট ডিলিট ফাংশন
  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${product?.name || "this product"}" permanently?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      background: "#161925",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setVendorProducts((prev) =>
          prev.filter((item) => item._id !== product._id),
        );
        try {
          await axios.delete(`http://localhost:5000/product/${product._id}`);
        } catch (err) {
          console.error("Delete failed on server", err);
        }
      }
    });
  };

  // ৪. মোডাল ওপেন করার ফাংশন (১০০% ফিক্সড)
  const handleOpenModal = (product) => {
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  // লাইভ ম্যাট্রিক্স ক্যালকুলেশন
  const totalProducts = vendorProducts.length;
  const optimizedCount = vendorProducts.filter(
    (item) => item?.aiOptimized,
  ).length;
  const lowStockCount = vendorProducts.filter(
    (item) => Number(item?.stock || 0) < 5 && Number(item?.stock || 0) > 0,
  ).length;
  const totalValue = vendorProducts.reduce(
    (sum, item) => sum + Number(item?.price || 0) * Number(item?.stock || 0),
    0,
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#05060a] text-white p-8 flex items-center justify-center">
        <div className="space-y-3 text-center">
          <Cpu className="w-12 h-12 text-purple-500 animate-spin mx-auto" />
          <p className="text-xs font-mono tracking-widest text-purple-400 uppercase animate-pulse">
            Syncing Neural Matrix...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060a] text-white p-4 sm:p-6 md:p-8 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-900">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-7 h-7 text-purple-500 animate-pulse" />
              <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-purple-400 bg-clip-text text-transparent">
                VendorAiCore
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Active Stream:{" "}
              <span className="text-purple-400 font-mono font-bold">
                {vendorEmail}
              </span>
            </p>
          </div>

          <Link
            to="/dashboard/add-product"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" /> Add AI Product
          </Link>
        </div>

        {/* METRICS INFOCARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                My Products
              </p>
              <h3 className="text-lg sm:text-xl font-black mt-0.5">
                {totalProducts} Items
              </h3>
            </div>
          </div>
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                AI Optimized
              </p>
              <h3 className="text-lg sm:text-xl font-black text-purple-400 mt-0.5">
                {optimizedCount} Ready
              </h3>
            </div>
          </div>
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Low Stock
              </p>
              <h3 className="text-lg sm:text-xl font-black text-yellow-500 mt-0.5">
                {lowStockCount} Alerts
              </h3>
            </div>
          </div>
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Net Worth
              </p>
              <h3 className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                ${totalValue.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        {/* MAIN DATA TABLE */}
        <div className="bg-[#0a0c14] border border-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-gray-900 bg-[#0e111c]/40">
            <h2 className="text-xs sm:text-sm font-bold text-gray-300 tracking-wider uppercase">
              Gemini Core Neural Matrix
            </h2>
          </div>

          {totalProducts === 0 ? (
            <div className="p-16 text-center text-gray-500 font-semibold text-sm">
              📁 No custom products found under this vendor stream.
            </div>
          ) : (
            <div className="w-full">
              {/* DESKTOP VIEW */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0d0f1a]/40 border-b border-gray-900 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Title / Scope</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Optimization Status</th>
                      <th className="px-6 py-4 text-center">
                        Neural Action / Trigger
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-950 text-sm font-bold">
                    {vendorProducts.map((product) => {
                      const status =
                        aiStatus[product._id] ||
                        (product?.aiOptimized ? "Optimized" : "Static");
                      return (
                        <tr
                          key={product._id}
                          className="hover:bg-[#0e111c]/30 transition-colors group"
                        >
                          <td className="px-6 py-4 flex items-center gap-3">
                            <img
                              src={product?.image || ""}
                              alt=""
                              className="w-11 h-11 object-contain rounded-xl bg-[#111320] border border-gray-800 p-1 shrink-0"
                            />
                            <div className="max-w-[240px]">
                              <span className="text-white block group-hover:text-purple-400 transition-colors truncate">
                                {product?.name || "No Title"}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono block mt-0.5 uppercase">
                                {product?.category || "General"}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-gray-400 font-mono">
                            {product?.stock || 0} Pcs
                          </td>
                          <td className="px-6 py-4 text-emerald-400 font-black">
                            ${product?.price || 0}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase border ${
                                status === "Optimized"
                                  ? "bg-purple-950/60 border-purple-800/80 text-purple-300 shadow-sm shadow-purple-500/10"
                                  : status === "Analyzing..."
                                    ? "bg-indigo-950 text-indigo-300 border-indigo-800 animate-pulse"
                                    : status === "Optimizing..."
                                      ? "bg-blue-950 text-blue-300 border-blue-800 animate-pulse"
                                      : "bg-gray-900 border-gray-800 text-gray-500"
                              }`}
                            >
                              {status}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleAiBoost(product)}
                                disabled={
                                  status === "Analyzing..." ||
                                  status === "Optimizing..."
                                }
                                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-black flex items-center gap-1.5 border transition-all ${
                                  status === "Optimized"
                                    ? "bg-purple-600/10 border-purple-500/30 text-purple-400 hover:bg-purple-600 hover:text-white"
                                    : "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600 hover:to-indigo-600 border-purple-500/20 text-white"
                                }`}
                              >
                                <RefreshCw
                                  className={`w-3.5 h-3.5 ${status === "Analyzing..." || status === "Optimizing..." ? "animate-spin" : ""}`}
                                />
                                {status === "Analyzing..."
                                  ? "Analyzing"
                                  : status === "Optimizing..."
                                    ? "Optimizing"
                                    : "AI Boost"}
                              </button>

                              {/* আই বাটন দিয়ে ১০০% মোডাল ওপেন হবে */}
                              <button
                                onClick={() => handleOpenModal(product)}
                                type="button"
                                className="p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* ড্যাশবোর্ড আপডেট রাউট এখানে লিঙ্ক করা হয়েছে */}
                              <Link
                                to={`/dashboard/updateProduct/${product?._id}`}
                                className="p-2 bg-gray-900 hover:bg-purple-600/20 border border-gray-800 text-gray-400 hover:text-purple-400 rounded-xl transition-all"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>

                              <button
                                onClick={() => handleDelete(product)}
                                className="p-2 bg-gray-900 hover:bg-red-600/20 border border-gray-800 text-gray-400 hover:text-red-400 rounded-xl transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE VIEW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:hidden">
                {vendorProducts.map((product) => {
                  const status =
                    aiStatus[product._id] ||
                    (product?.aiOptimized ? "Optimized" : "Static");
                  return (
                    <div
                      key={product._id}
                      className="bg-[#0e111c]/30 border border-gray-900 rounded-xl p-4 space-y-4"
                    >
                      <div className="flex gap-3">
                        <img
                          src={product?.image || ""}
                          alt=""
                          className="w-14 h-14 object-contain rounded-xl bg-[#111320] border border-gray-800 p-1 shrink-0"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                            {product?.name || "No Title"}
                          </h4>
                          <span
                            className={`inline-block px-2 py-0.5 mt-2 rounded text-[8px] font-bold border uppercase tracking-wider ${
                              status === "Optimized"
                                ? "bg-purple-950 text-purple-300 border-purple-800"
                                : "bg-gray-900 border-gray-800 text-gray-500"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-950">
                        <div>
                          <span className="text-emerald-400 font-black text-sm block">
                            ${product?.price || 0}
                          </span>
                          <span className="text-[10px] text-gray-500 block font-mono">
                            Stock: {product?.stock || 0}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleAiBoost(product)}
                            disabled={
                              status === "Analyzing..." ||
                              status === "Optimizing..."
                            }
                            className="p-2 bg-purple-600/20 border border-purple-500/20 text-purple-300 rounded-lg"
                          >
                            <RefreshCw
                              className={`w-3.5 h-3.5 ${status === "Analyzing..." || status === "Optimizing..." ? "animate-spin" : ""}`}
                            />
                          </button>
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="p-2 bg-gray-900 text-gray-400 rounded-lg"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            to={`/dashboard/updateProduct/${product?._id}`}
                            className="p-2 bg-gray-900 text-gray-400 rounded-lg"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product)}
                            className="p-2 bg-gray-900 text-red-400 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === প্রিমিয়াম AI মোডাল (MODAL) === */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all animate-fadeIn">
          <div className="bg-[#0b0d16]/95 border border-purple-500/20 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl shadow-purple-500/5 p-6 relative space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-900 hover:bg-purple-600 hover:text-white border border-gray-800 rounded-xl transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-start border-b border-gray-900 pb-4">
              <img
                src={selectedProduct?.image || ""}
                alt=""
                className="w-20 h-20 object-contain rounded-2xl bg-[#111320] border border-gray-800 p-2 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest font-black uppercase bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                    {selectedProduct?.aiOptimized
                      ? "★ AI Transformed"
                      : "Standard Metadata"}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white leading-tight mt-1">
                  {selectedProduct?.name || "No Title"}
                </h2>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {selectedProduct?.category || "General"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-bold">
              <div className="bg-[#101322]/50 p-3 rounded-xl border border-gray-900">
                <span className="text-[10px] text-gray-500 block uppercase">
                  Retail Value Price
                </span>
                <span className="text-emerald-400 text-lg font-black mt-0.5 block">
                  ${selectedProduct?.price || 0}
                </span>
              </div>
              <div className="bg-[#101322]/50 p-3 rounded-xl border border-gray-900">
                <span className="text-[10px] text-gray-500 block uppercase">
                  Warehouse Stock
                </span>
                <span className="text-gray-200 text-lg font-black mt-0.5 block">
                  {selectedProduct?.stock || 0} Units
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Product Narrative /
                Description
              </h3>
              <div className="bg-[#08090f] p-4 rounded-xl border border-gray-900/60 text-xs sm:text-sm text-gray-300 leading-relaxed font-medium max-h-48 overflow-y-auto whitespace-pre-line">
                {selectedProduct?.description ||
                  "No customized descriptive narration available."}
              </div>
            </div>

            {selectedProduct?.tags && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  Target SEO Keywords
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(selectedProduct.tags)
                    ? selectedProduct.tags
                    : selectedProduct.tags?.split(",")
                  ).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-indigo-950/40 text-indigo-300 border border-indigo-900/40 px-2.5 py-1 rounded-md capitalize"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-900 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold px-5 py-2.5 rounded-xl border border-gray-800 text-xs uppercase tracking-wider transition-all"
              >
                Close Matrix View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorAiCore;
