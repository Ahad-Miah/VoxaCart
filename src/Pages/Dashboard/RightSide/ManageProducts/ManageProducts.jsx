import React, { useContext, useEffect, useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';
import { Link } from 'react-router-dom';

const ManageProducts = () => {

  const [vendorProducts, setVendorProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/myProduct/${user?.email}`);
        setVendorProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    if(user?.email){
      fetchVendorProducts();
    }

  }, [user]);

  // update product 


  return ( 
    
    <div className="space-y-8 max-w-5xl mx-auto select-none font-mono">

      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          INVENTORY / <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">MY_PRODUCTS_GRID</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">
          Modify status operational matrix or wipe depleted product tokens.
        </p>
      </div>


      <div className="space-y-4">


        {/* Loading Skeleton */}

        {loading && (
          <>
            {[1,2,3].map((item)=>(
              <div 
                key={item}
                className="bg-[#08090e]/60 border border-gray-900 rounded-[22px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl animate-pulse"
              >

                <div className="flex items-center gap-4 w-full sm:w-auto">

                  <div className="w-14 h-14 rounded-xl bg-gray-800"></div>

                  <div className="space-y-2">
                    <div className="w-16 h-3 bg-gray-800 rounded"></div>
                    <div className="w-48 sm:w-72 h-3 bg-gray-800 rounded"></div>
                  </div>

                </div>


                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">

                  <div className="space-y-2">
                    <div className="w-16 h-2 bg-gray-800 rounded"></div>
                    <div className="w-20 h-3 bg-gray-800 rounded"></div>
                  </div>


                  <div className="space-y-2">
                    <div className="w-16 h-2 bg-gray-800 rounded"></div>
                    <div className="w-20 h-3 bg-gray-800 rounded"></div>
                  </div>


                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gray-800"></div>
                    <div className="w-10 h-10 rounded-xl bg-gray-800"></div>
                  </div>

                </div>


              </div>
            ))}
          </>
        )}



        {/* Product Data */}

        {!loading && vendorProducts.map((product) => (

          <div 
            key={product.id} 
            className="bg-[#08090e]/60 border border-gray-900 rounded-[22px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl hover:border-gray-800 transition-all duration-300 relative overflow-hidden"
          >
            
            <div className="flex items-center gap-4 w-full sm:w-auto">

              <img 
                src={product.image} 
                alt={product.name} 
                className="w-14 h-14 rounded-xl object-cover border border-gray-800 shrink-0" 
              />


              <div className="overflow-hidden">

                <span className="text-[8px] bg-indigo-950/50 border border-indigo-500/20 text-[#7c74ff] px-1.5 py-0.5 rounded font-bold block w-fit mb-1">
                  {product._id}
                </span>

                <h4 className="text-xs font-bold text-white truncate max-w-[240px] sm:max-w-[300px] md:max-w-[400px]">
                  {product.name}
                </h4>

              </div>

            </div>



            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-900/50 shrink-0">


              <div className="text-left sm:text-right">
                <span className="text-[8px] text-gray-600 block uppercase tracking-widest">
                  Price Token
                </span>

                <span className="text-xs text-white font-black">
                  {product.price}
                </span>
              </div>



              <div className="text-left sm:text-right min-w-[70px]">

                <span className="text-[8px] text-gray-600 block uppercase tracking-widest">
                  Supply Count
                </span>


                {product.stock > 0 ? (

                  <span className="text-xs text-emerald-400 font-bold">
                    {product.stock} Left
                  </span>

                ) : (

                  <span className="text-xs text-red-500 font-bold uppercase">
                    OUT_OF_NODES
                  </span>

                )}

              </div>




              <div className="flex gap-2">

                <Link to={`/dashboard/updateProduct/${product?._id}`}><button  className="p-2.5 bg-black/40 border border-gray-900 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 rounded-xl transition-all">
                  <Edit3 className="w-3.5 h-3.5" />
                </button></Link>
                


                <button className="p-2.5 bg-black/40 border border-gray-900 hover:border-red-500/30 text-gray-400 hover:text-red-400 rounded-xl transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

              </div>


            </div>


          </div>

        ))}



        {/* Empty State */}

        {!loading && vendorProducts.length === 0 && (

          <div className="text-center py-16 border border-gray-900 rounded-[22px] bg-[#08090e]/60">

            <p className="text-gray-500 text-sm uppercase tracking-widest">
              No Products Found
            </p>

          </div>

        )}


      </div>


    </div>

  );
};

export default ManageProducts;