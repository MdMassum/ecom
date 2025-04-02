// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Outlet, Navigate } from 'react-router-dom';

// const AdminRoute= () => {
//   const currentUser = useSelector((state) => state.user.currentUser);

//   return currentUser ? <Outlet /> : <Navigate to="/login" />;
// };

// export default AdminRoute;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SellerRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser && currentUser.role !== 'seller') {
      toast.error('Access Denied! Seller only.');
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return currentUser.role === 'seller' ? <Outlet /> : <p className='flex mt-20 justify-center items-center'>Only Seller Can Access This Page!!</p>;
};

export default SellerRoute;

