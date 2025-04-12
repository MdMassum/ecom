import React from 'react';
import MyInfo from './MyInfo';
import MyOrders from './MyOrders';


function Profile() {

  return (
    <div className='min-h-screen md:w-[85%] py-5 flex flex-col justify-between md:flex-row mx-auto mt-20'>
      <MyInfo/>
      <MyOrders/>
    </div>
  );
}

export default Profile;