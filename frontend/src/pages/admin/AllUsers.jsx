import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import toast from "react-hot-toast";

function AllUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users`, {
        withCredentials: true
      });
      console.log(response)
      if (response?.data?.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users. Try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    setDeleting(id);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/user/${id}`, { withCredentials: true });
      if (response?.data?.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success("user Deleted Successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Try again.");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex-1 flex-col px-4 min-h-screen">

      <div className='flex justify-between'>

      <div className="flex items-center justify-between mb-4 mt-2 pr-10">
        <h1 className="text-3xl font-bold text-blue-600">All users</h1>
      </div>
      </div> 

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-blue-700 text-4xl" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No User Found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Joined On</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-blue-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.createdAt.split('T')[0]}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
                      disabled={deleting === user._id}
                    >
                      {deleting === user._id ? (
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

export default AllUsers;
