import React from "react";
import {Link} from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa6";


function OrderCard({ order }) {
  console.log(order);
  return (
    <Link to={`/product/${order.product._id}`}
    className="flex  gap-3 w-full md:w-[80%] p-4 text-black bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="w-24 h-20 object-contain shadow-sm object-center">
        <img src={order.product.images[0]} alt="Img" className="mt-1 rounded-sm" />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <span className="font-bold text-xl">{order.product.name}</span>
          <span className="font-bold text-green-700 text-lg">
            ₹{order.totalPrice}
          </span>
        </div>
        <div className="flex justify-between">
          <i className={`font-semibold ${
              order.orderStatus === "Delivered"
                ? "text-green-500"
                : ["Cancelled", "Returned"].includes(order.orderStatus)
                ? "text-rose-500"
                : "text-yellow-500"
            }`}
          > {order.orderStatus} </i>
          <span className="font-semibold text-gray-500">
            Qty:{order.quantity}
          </span>
        </div>

        <span className="font-semibold">
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-center md:pl-2">
      <FaChevronRight />
      </div>
      
    </Link>
  );
}

export default OrderCard;
