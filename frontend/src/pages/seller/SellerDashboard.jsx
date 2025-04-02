import React, { useEffect, useState } from "react";
import Card from "../../components/admin/Card";
import AddProductModal from "../../components/admin/AddProductModal";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerDashboard = () => {

  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser);
  if(!currentUser || !currentUser.role === 'seller'){
    navigate('/login')
    return;
  }
  const sellerId = currentUser._id;
  console.log(sellerId)

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/seller/products/${sellerId}`,
        { withCredentials: true }
      );

      if (response?.data?.success === true) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex-1 flex-col px-4  min-h-screen">
      <div className="flex items-center gap-10 mb-8 pr-10">
        <h1 className="text-3xl font-bold text-[#4a5396]">My Products</h1>

        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg hover:opacity-90 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add Product
        </button>
        {isOpen && <AddProductModal setIsOpen={setIsOpen} products={products} setProducts={setProducts} fetchProduct={fetchProduct} />}
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-80">
          <FiLoader className="animate-spin text-green-600 text-4xl" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center w-full text-xl text-gray-500">No Products Found</div>
      ) : (
        <div className="flex flex-wrap items-center gap-8">
          {products.map((product, index) => (
            <Card key={index} product={product} setProducts={setProducts} setLoading={setLoading}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
