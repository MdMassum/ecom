import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function UpdateUserModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/user/${user._id}`, formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success('User updated successfully!');
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user:', error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit user</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" placeholder="Name" required />

          <label htmlFor="email">Email:</label>
          <input disabled type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 mb-2 border rounded bg-gray-200" placeholder="Email" required />

          <label htmlFor="phone">Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 mb-2 border rounded" placeholder="Phone" required />

          <label htmlFor="password">Change Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 mb-2 border rounded" placeholder="New Password (Optional)" />
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserModal;
