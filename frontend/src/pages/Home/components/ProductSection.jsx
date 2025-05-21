import React, { useEffect, useState } from 'react';
import bgImage from '../../../assets/4.png';
import ProductCard from '../../../components/ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';

const categories = ["Pottery", "Wooden", "Mettalic", "Handicrafts"];

function ProductSection() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

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
    <div id='product' className='relative w-full min-h-screen md:py-10'>
      <div className="absolute inset-0 w-full h-full bg-cover bg-center">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className='z-30 w-full tracking-wide md:tracking-wider relative top-10 md:top-6 flex flex-col text-4xl md:text-5xl items-center justify-center gap-3 mb-20'>
        <p className='flex gap-3'>
          <span className='font-bold text-orange-500 text-stroke'>MADE</span>
          <span className='font-bold text-blue-900 text-stroke'>IN</span>
          <span className='font-bold text-green-500 text-stroke'>INDIA</span>
        </p>
        <p className='font-bold text-blue-900'>PRODUCTS</p>
      </div>

      <div className='relative z-30 pb-8'>
        {loading ? (
          <Loader/>
        ) : (
          categories.map(category => (
            groupedProducts[category]?.length > 0 && (
              <div key={category} className='mb-12 px-6'>
                <div className='flex justify-between items-center mb-4 md:mx-10'>
                <h2 className='text-2xl md:text-4xl font-bold  text-blue-900 md:text-stroke'>{category} Section</h2>
                <Link to={`/search?category=${category}`} className='min-w-20 cursor-pointer px-2 py-2 md:px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-950 hover:opacity-90 text-sm pb-2.5'>See More..</Link>
                </div>
                
                <div className='flex flex-wrap justify-center gap-10'>
                  {groupedProducts[category].map((product, idx) => (
                    <Link key={product._id} to={`/product/${product._id}`}>
                      <ProductCard key={`${product.name}-${idx}`} product={product} />
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}

export default ProductSection;
