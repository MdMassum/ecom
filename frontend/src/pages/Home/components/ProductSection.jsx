// ProductSection.jsx
import React, { useEffect, useState } from 'react';
import bgImage from '../../../assets/4.png';
import ProductCard from '../../../components/ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { ChevronRight, Package2} from "lucide-react";

const categories = ["Pottery", "Wooden", "Metallic", "Handicrafts"];

function ProductSection() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchByCategory = async () => {
      setLoading(true);
      try {
        const promises = categories.map(category =>
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/products?category=${category}&limit=4`)
            .then(res => ({
              category,
              products: res.data.products || []
            }))
            .catch(err => {
              console.error(`Error fetching ${category}:`, err);
              return { category, products: [] };
            })
        );

        const results = await Promise.all(promises);
        const grouped = {};
        results.forEach(({ category, products }) => {
          grouped[category] = products;
        });
        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchByCategory();
  }, []);

  return (
    <div id='product' className='relative w-full min-h-screen py-16'>
      {/* Background with overlay */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
        
      </div>

      {/* Header Section */}
      <div className='relative z-10 mb-16'>
        <div className='flex flex-col items-center justify-center'>
          
          <h2 className='text-4xl md:text-5xl font-bold text-center text-stroke'>
            <span className='text-orange-500'>MADE</span>
            <span className='text-blue-900'> IN </span>
            <span className='text-green-500'>INDIA</span>
            <span className='text-blue-900'> PRODUCTS</span>
          </h2>
          <p className='mt-3 text-lg text-blue-900 max-w-xl text-center px-4'>
            Discover authentic Indian craftsmanship with our handpicked collection
          </p>
          
        </div>
      </div>

      {/* Category Tabs */}
      <div className="relative z-10 mb-8 px-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-0 md:gap-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-800 text-white shadow-md"
                    : "text-blue-800 hover:bg-blue-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className='relative z-10 px-4 pb-16'>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          categories.map(category => (
            <div 
              key={category} 
              className={`transition-all duration-500 ${
                activeCategory === category ? 'opacity-100' : 'hidden opacity-0'
              }`}
            >
              <div className='flex justify-between items-center mb-6 md:px-6'>
                <div className="flex items-center">
                  <Package2 className="text-blue-800 mr-2" size={24} />
                  <h2 className='text-2xl md:text-3xl font-bold text-blue-900'>
                    {category} <span className="text-blue-500">Collection</span>
                  </h2>
                </div>
                <Link 
                  to={`/search?category=${category}`} 
                  className='flex items-center gap-1 text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors'
                >
                  View All
                  <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
                {groupedProducts[category]?.length > 0 ? (
                  groupedProducts[category].map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`} className="w-full flex justify-center">
                      <ProductCard product={product} />
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No products available in this category</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductSection;