import React from "react";

function DataContent({product}) {
  console.log(product)
  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 px-5 mb-6 md:mb-0 md:px-0">
      <div className="flex flex-col gap-4 text-lg">
        <p className="text-3xl font-semibold">{product?.name}</p>
        <p className="text-gray-700">
          <span className="font-semibold text-black">Price - ₹</span>
          {product?.price}
        </p>
        
        <p className="text-gray-700">
          <span className="font-semibold text-black">Category - </span>
          {product?.category}
        </p>

        <p className="text-gray-700">
          <span className="font-semibold text-black">Description - </span>
          {product?.description}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-black">Sold By - </span>
          {product?.seller?.sellerInfo?.storeName}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-black">Seller Address - </span>
          {product?.sellerInfo?.storeAddress}
        </p>
        {product?.stock === 0 ? <span className="font-semibold text-rose-600">This Product is Out Of Stock !! </span> : <span className="font-semibold text-yellow-500">Only {product?.stock} item left !! </span>}
          
      </div>

      <a href="#" className="w-44">
        <button className="py-2 px-4 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold cursor-pointer hover:opacity-95">Enquire Now !!</button>
      </a>
    </div>
  );
}

export default DataContent;
