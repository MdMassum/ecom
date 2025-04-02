import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaUserTag, FaCalendarAlt } from 'react-icons/fa';
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-xl font-semibold'>No user data available</p>
      </div>
    );
  }

  const handleLogout = async() => {
    try {
      dispatch(signOutStart());
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/logout`, { withCredentials: true });
      if (response.data.success === false) {
        dispatch(signOutFailure(response.data.message));
        toast.error(response.data.message);
        return;
      }
      console.log("Logout Success:", response.data);
      toast.success("Logout Successful");
      dispatch(signOutSuccess());
      navigate('/');
    } catch (error) {
      console.log(error);
      dispatch(signOutFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100 p-4'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>User Profile</h2>
        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <FaUser className='text-gray-600' />
            <p className='text-gray-600 font-semibold'>Name:</p>
            <p className='text-gray-800'>{currentUser.name}</p>
          </div>
          <div className='flex items-center gap-2'>
            <FaEnvelope className='text-gray-600' />
            <p className='text-gray-600 font-semibold'>Email:</p>
            <p className='text-gray-800'>{currentUser.email}</p>
          </div>
          <div className='flex items-center gap-2'>
            <FaPhone className='text-gray-600' />
            <p className='text-gray-600 font-semibold'>Phone:</p>
            <p className='text-gray-800'>{currentUser.phone}</p>
          </div>
          <div className='flex items-center gap-2'>
            <FaUserTag className='text-gray-600' />
            <p className='text-gray-600 font-semibold'>Role:</p>
            <p className='text-gray-800 capitalize'>{currentUser.role}</p>
          </div>
          <div className='flex items-center gap-2'>
            <FaCalendarAlt className='text-gray-600' />
            <p className='text-gray-600 font-semibold'>Joined:</p>
            <p className='text-gray-800'>{new Date(currentUser.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className='mt-6 w-full bg-red-500 cursor-pointer text-white py-2 rounded-lg hover:bg-red-600 transition duration-300'>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;