import React from "react";
// import defaultImg from '../../assets/products/product1.png'
import axios from "axios";
import toast from "react-hot-toast";

function Card({product, setProducts}) {
  console.log(product)

  const handleDelete = async() =>{

    if (!window.confirm('Are you sure you want to delete this Product?')) return;

    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/product/${product._id}`,
      { withCredentials: true })

      if(response?.data?.success === true){

        setProducts((prevProducts) =>
        prevProducts.filter((currProd) => currProd._id !== product._id));
        toast.success("Product Deleted Successfully")
      }
      console.log(response);

    } catch (error) {
      console.log(error);
      toast.error("Error Deleting Product :",error);
    }
  }
  return (
    <div className="bg-blue-800 text-white rounded-xl p-3 pb-5 w-80 md:w-72 shadow-lg">
      <div className="bg-gradient-to-b from-blue-200 to-blue-200 h-56 rounded-lg mb-4">
        <img src={product?.images[0]} alt={product?.name} />
      </div>
      <div className="flex justify-between font-bold text-lg mt-12">
        <span>{product?.name}</span>
        <span>${product?.price}</span>
      </div>
      <p className="text-sm">Sold By: {product?.seller?.name  || 'unknown'}</p>
      <div className="flex items-center justify-between gap-2 mt-1">

      <p className="text-sm opacity-80 w-full ">
        {product?.description}
      </p>
      <button 
      onClick={handleDelete}
      className="min-w-24 bg-white text-rose-700 font-bold rounded-xl border-2 border-white hover:bg-rose-700 hover:text-white transition cursor-pointer">
        Delete
      </button>
      </div>
    </div>
  );
}

export default Card;
