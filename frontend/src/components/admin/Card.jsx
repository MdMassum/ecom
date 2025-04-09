import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit, FiTrash } from "react-icons/fi";
import EditProductModal from "./EditProductModal";

function Card({ product, setProducts }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this Product?")) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/${product._id}`,
        { withCredentials: true }
      );

      if (response?.data?.success === true) {
        setProducts((prevProducts) =>
          prevProducts.filter((currProd) => currProd._id !== product._id)
        );
        toast.success("Product Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Deleting Product");
    }
  };

  return (
    <>
      <div className="bg-blue-800 text-white rounded-xl p-3 pb-5 w-80 md:w-72 shadow-lg relative">
        <div className="bg-gradient-to-b from-blue-200 to-blue-200 h-60 rounded-lg mb-4 relative overflow-hidden">
          <img
            src={product?.images[0]}
            alt={product?.name}
            className="h-full w-full object-cover rounded-lg"
          />

          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              onClick={() => setIsEditOpen(true)}
              className="bg-yellow-400 p-1 rounded-full text-black hover:bg-yellow-500"
              title="Edit"
            >
              <FiEdit />
            </button>
            <button
              onClick={handleDelete}
              className="bg-rose-600 p-1 rounded-full text-white hover:bg-rose-700"
              title="Delete"
            >
              <FiTrash />
            </button>
          </div>
        </div>

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>{product?.name}</span>
          <span>₹{product?.price}</span>
        </div>
        <p className="text-sm text-gray-100"><span className="font-semibold text-white">Sold By : </span>{product?.seller?.name || "unknown"}</p>
        <p className="text-sm text-gray-100 w-full mt-1"><span className="font-semibold text-white">Description : </span>{product?.description}</p>
        <p className="text-sm text-gray-100 w-full mt-1"><span className="font-semibold text-white">Category : </span>{product?.category || "Other"}</p>
      </div>

      {isEditOpen && (
        <EditProductModal product={product} onClose={()=>setIsEditOpen(false)} setProducts={setProducts} />
      )}
    </>
  );
}

export default Card;
