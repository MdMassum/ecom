import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiLoader, FiTrash2, FiEdit, FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

import UpdateUserModal from "../../components/UpdateUserModal";
import SearchInput from "../../components/SearchInput";
import useDebounce from "../../hooks/useDebounce";

function AllSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [editingSeller, setEditingSeller] = useState(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search,500);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/sellers?searchKey=${search}`,
        {
          withCredentials: true,
        }
      );
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
    if (!window.confirm("Are you sure you want to delete this seller?")) return;

    setDeleting(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/user/${id}`,
        { withCredentials: true }
      );
      if (response?.data?.success) {
        setSellers((prevSellers) =>
          prevSellers.filter((seller) => seller._id !== id)
        );
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
  }, [debouncedSearch]);

  return (
    <div className="flex-1 flex-col min-h-screen">
      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="flex items-center justify-between pr-10">
          <h1 className="text-3xl font-bold text-blue-600">All Sellers</h1>
        </div>
        <div>
          <SearchInput 
            value={search} 
            onChange={(e)=>setSearch(e.target.value)} 
            onClear={()=>setSearch("")}
            isLoading={loading}
          />
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
                <th className="py-3 px-2 text-left">Name</th>
                {/* <th className="py-3 px-2 text-left">Id</th> */}
                <th className="py-3 px-2 text-left">Email</th>
                <th className="py-3 px-2 text-left">Phone</th>
                <th className="py-3 px-2 text-left">StoreName</th>
                <th className="py-3 px-2 text-left">BusinessType</th>
                <th className="py-3 px-2 text-left">GstNumber</th>
                <th className="py-3 px-2 text-left">Address</th>
                <th className="py-3 px-2 text-left">Joined On</th>
                <th className="py-3 px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id} className="border-b hover:bg-blue-50">
                  <td className="py-3 px-2">{seller.name}</td>
                  {/* <td className="py-3 px-2 truncate max-w-[120px]">{seller._id}</td> */}
                  <td className="py-3 px-2">{seller.email}</td>
                  <td className="py-3 px-2">{seller.phone}</td>
                  <td className="py-3 px-2">{seller.sellerInfo.storeName}</td>
                  <td className="py-3 px-2">
                    {seller.sellerInfo.businessType}
                  </td>
                  <td className="py-3 px-2">{seller.sellerInfo.gstNumber}</td>
                  <td className="py-3 px-2">
                    {seller.sellerInfo.storeAddress}
                  </td>
                  <td className="py-3 px-2">
                    {seller.createdAt.split("T")[0]}
                  </td>
                  <td className="py-3 px-2 text-center flex justify-center gap-4">
                    {/* Edit button */}
                    <button
                      onClick={() => setEditingSeller(seller)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none cursor-pointer"
                      title='Edit Seller'
                    >
                      <FiEdit />
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(seller._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
                      disabled={deleting === seller._id}
                      title='Delete Seller'
                    >
                      {deleting === seller._id ? (
                        <FiLoader className="animate-spin text-red-500" />
                      ) : (
                        <FiTrash2 />
                      )}
                    </button>
                    {/* Copy Seller id button */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(seller._id);
                        toast.success("Seller ID copied to clipboard!");
                      }}
                      className="text-gray-600 cursor-pointer hover:text-black focus:outline-none"
                      title="Copy Seller ID"
                    >
                      <FiCopy />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingSeller && (
        <UpdateUserModal
          user={editingSeller}
          onClose={() => setEditingSeller(null)}
          onUpdate={fetchSellers}
        />
      )}
    </div>
  );
}

export default AllSellers;
