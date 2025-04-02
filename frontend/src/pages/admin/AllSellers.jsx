import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import toast from "react-hot-toast";

function AllSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/sellers`, {
        withCredentials: true
      });
      console.log(response)
      if (response?.data?.success) {
        setSellers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching sellers:", error);
      toast.error("Error fetching sellers. Try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this seller?')) return;

    setDeleting(id);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/user/${id}`, { withCredentials: true });
      if (response?.data?.success) {
        setSellers((prevSellers) => prevSellers.filter((seller) => seller._id !== id));
        toast.success("Seller Deleted Successfully");
      }
    } catch (error) {
      console.error("Error deleting seller:", error);
      toast.error("Error deleting seller. Try again.");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="flex-1 flex-col min-h-screen">

      <div className='flex justify-between'>

      <div className="flex items-center justify-between mb-4 mt-2 pr-10">
        <h1 className="text-3xl font-bold text-blue-600">All Sellers</h1>
      </div>
      </div> 

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-blue-700 text-4xl" />
        </div>
      ) : sellers.length === 0 ? (
        <p className="text-center text-gray-500">No Seller Found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">StoreName</th>
                <th className="p-3 text-left">BusinessType</th>
                <th className="p-3 text-left">GstNumber</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Joined On</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id} className="border-b hover:bg-blue-50">
                  <td className="p-3">{seller.name}</td>
                  <td className="p-3">{seller.email}</td>
                  <td className="p-3">{seller.phone}</td>
                  <td className="p-3">{seller.sellerInfo.storeName}</td>
                  <td className="p-3">{seller.sellerInfo.businessType}</td>
                  <td className="p-3">{seller.sellerInfo.gstNumber}</td>
                  <td className="p-3">{seller.sellerInfo.storeAddress}</td>
                  <td className="p-3">{seller.createdAt.split('T')[0]}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(seller._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
                      disabled={deleting === seller._id}
                    >
                      {deleting === seller._id ? (
                        <FiLoader className="animate-spin text-red-500" />
                      ) : (
                        <FiTrash2 />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllSellers;
