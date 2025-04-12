import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserAuthRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser && currentUser.role !== 'user') {
      toast.error('Access Denied! User only.');
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return currentUser.role === 'user' ? <Outlet /> : <p className='flex mt-20 justify-center items-center'>Access Denied !!</p>;
};

export default UserAuthRoute;

