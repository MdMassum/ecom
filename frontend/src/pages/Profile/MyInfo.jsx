import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaUserTag, FaCalendarAlt } from 'react-icons/fa';
import { signOutFailure, signOutStart, signOutSuccess } from '../../redux/user/userSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyInfo() {
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
        toast.success("Logout Successful");
        dispatch(signOutSuccess());
        navigate('/');
      } catch (error) {
        dispatch(signOutFailure(error.message));
        toast.error(error.message);
      }
    };

    return (
      <div className='w-full md:w-96 bg-white p-6 mb-8 md:mb-0'>
        <h2 className='text-3xl font-bold text-center text-blue-900 mb-8 md:mb-16'>My Profile</h2>
        <div className='space-y-5'>
          <div className='flex items-center gap-3'>
            <FaUser className='text-blue-600' />
            <p className='font-semibold text-gray-600'>Name:</p>
            <p className='text-gray-900'>{currentUser.name}</p>
          </div>
          <div className='flex items-center gap-3'>
            <FaEnvelope className='text-blue-600' />
            <p className='font-semibold text-gray-600'>Email:</p>
            <p className='text-gray-900'>{currentUser.email}</p>
          </div>
          <div className='flex items-center gap-3'>
            <FaPhone className='text-blue-600' />
            <p className='font-semibold text-gray-600'>Phone:</p>
            <p className='text-gray-900'>{currentUser.phone}</p>
          </div>
          <div className='flex items-center gap-3'>
            <FaUserTag className='text-blue-600' />
            <p className='font-semibold text-gray-600'>Role:</p>
            <p className='capitalize text-gray-900'>{currentUser.role}</p>
          </div>
          <div className='flex items-center gap-3'>
            <FaCalendarAlt className='text-blue-600' />
            <p className='font-semibold text-gray-600'>Joined:</p>
            <p className='text-gray-900'>{new Date(currentUser.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className='mt-8 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md'
        >
          Logout
        </button>
      </div>
    );
}

export default MyInfo;
