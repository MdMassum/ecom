import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import OrderCard from './OrderCard';
import Loader from '../../components/Loader';

function MyOrders() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ordersPerPage = 2;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const fetchOrders = async () => {
    if (!currentUser) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/orders/me`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err?.response?.data?.message || 'Something went wrong.');
      toast.error(err?.response?.data?.message || 'Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate the orders to display on the current page
  const displayedOrders = orders.slice((page - 1) * ordersPerPage, page * ordersPerPage);

  return (
    <div className='w-full md:w-2/3 bg-white px-6 py-2 md:p-6 ml-0 md:ml-6 rounded-xl'>
      <h2 className='text-3xl font-bold text-center text-blue-900 mb-8'>My Orders</h2>

      {loading ? (
        <Loader/>
        // <p className='text-center'>Loading orders...</p>
      ) : error ? (
        <p className='text-center text-red-600'>{error}</p>
      ) : orders.length === 0 ? (
        <p className='text-center text-gray-600'>No orders found.</p>
      ) : (
        <div className='flex flex-col gap-6'>

          <div className='flex flex-col md:flex-row md:flex-wrap justify-center gap-4'>
            {displayedOrders.map((order) => (
              <OrderCard key={order._id} order={order}/>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className='flex justify-center items-center gap-4 mt-6'>
            <button
              className={`px-4 py-2 rounded-lg shadow-sm ${
                page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            <span className='font-medium'>
              Page {page} of {totalPages || 1}
            </span>

            <button
              className={`px-4 py-2 rounded-lg shadow-sm ${
                page === totalPages || totalPages === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default MyOrders;
