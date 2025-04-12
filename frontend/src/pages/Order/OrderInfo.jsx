import React from 'react'

function OrderInfo({ name, itemPrice, shippingPrice, totalPrice, quantity, setQuantity, handleOrder,loading }) {
  return (
    <div className='w-full md:w-1/2 p-3 md:p-6 min-h-[400px] flex flex-col justify-between'>

        <div className='flex flex-col gap-4'>

        
        <h2 className="text-blue-900 text-2xl font-bold mb-4 text-center underline">Order Summary</h2>
        <p className="flex justify-between text-xl md:mt-6"><span className="font-medium">Product Name :</span> {name}</p>
        <p className="flex justify-between text-xl"><span className="font-medium">Price per item :</span> ₹{itemPrice}</p>
        <p className="flex justify-between text-xl"><span className="font-medium">Shipping :</span> ₹{shippingPrice}</p>
        <p className="flex justify-between text-xl"><span className="font-semibold">Total :</span> ₹{totalPrice}</p>

      <div className='flex justify-between items-center'>
        <label className="text-xl font-medium">Quantity :</label>
        <input
          type="number"
          min="1"
          disabled={loading}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-20 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </div>
      </div>

      <button
        onClick={handleOrder}
        disabled={loading}
        className="w-full text-xl mx-auto  bg-blue-900 hover:bg-blue-950 cursor-pointer active:scale-95 transition text-white py-2 rounded-xl font-semibold"
      >
        Place Order
      </button>
    </div>
  );
}

export default OrderInfo;
