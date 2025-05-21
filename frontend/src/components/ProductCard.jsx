import React from "react";
import defaultProd from '../assets/defaultProd.png'

function ProductCard({ product }) {
  return (
    <div className="bg-blue-800 text-white rounded-xl p-3 px-2 pb-5 w-80 md:w-64 shadow-lg hover:scale-105 transition-transform">
      <div className="bg-gradient-to-b from-blue-200 to-green-200 h-56 rounded-lg mb-4 overflow-hidden">
        <img src={product?.images[0] || defaultProd} alt={product?.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>{product?.name}</span>
        <span>₹{product?.price}</span>
      </div>
      <div className="flex items-center justify-between gap-2 mt-1">
        <p className="text-sm opacity-80 w-full truncate">
          {product?.description}
        </p>
        <button className="min-w-24 bg-blue-800 text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-black transition cursor-pointer">
          Enquire !
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
