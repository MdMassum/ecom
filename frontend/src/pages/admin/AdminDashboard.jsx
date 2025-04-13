import React, { useEffect, useState } from "react";
import Card from "../../components/admin/Card";
import AddProductModal from "../../components/admin/AddProductModal";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import SearchInput from "../../components/SearchInput";
import useDebounce from "../../hooks/useDebounce";

const AdminDashboard = () => {

  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  
  const debouncedSearch = useDebounce(search, 500);


  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/products?searchKey=${search}&category=${category}`,
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
  }, [debouncedSearch,category]);

  return (
    <div className="flex-1 flex-col px-4  min-h-screen">
      <div className="flex items-center gap-10 mb-8 pr-10">
        <h1 className="text-3xl font-bold text-blue-900">All Products</h1>

        <div>
          <SearchInput 
            value={search} 
            onChange={(e)=>setSearch(e.target.value)} 
            onClear={()=>setSearch("")}
            isLoading={loading}
          />
        </div>

        <div className="flex flex-col w-40 gap-1">
              <select
                id="category"
                className="rounded-lg border p-2 w-full"
                onChange={(e)=>setCategory(e.target.value)}
                value={category}
              >
                <option value="all">Select Category</option>
                <option value="Pottery">Pottery</option>
                <option value="Wooden">Wooden</option>
                <option value="Mettalic">Mettalic</option>
                <option value="Handicrafts">Handicrafts</option>
                <option value="Other">Other</option>
              </select>
            </div>

        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg hover:opacity-90 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add Product
        </button>
        {isOpen && <AddProductModal setIsOpen={setIsOpen} products={products} setProducts={setProducts} fetchProduct={fetchProduct} admin={true}/>}
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-80">
          <FiLoader className="animate-spin text-blue-600 text-4xl" />
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

export default AdminDashboard;
