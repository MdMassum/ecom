import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ContactForm from "./ContactForm";
import OrderInfo from "./OrderInfo";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const Order = () => {

  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    phoneNo: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/product/${productId}`,
          { withCredentials: true }
        );
        if (!data.success) {
          setLoading(false);
          return;
        }
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!product) return;

    const { address, city, state, phoneNo, pincode } = shippingInfo;
    const fields = { address, city, state, phoneNo, pincode };
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        toast.error(`${key} cannot be empty!`);
        return;
      }
    }

    const itemPrice = product.price;
    const shippingPrice = 0;
    const totalPrice = itemPrice * quantity + shippingPrice;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/order/new`,
        {
          shippingInfo,
          itemPrice,
          shippingPrice,
          totalPrice,
          quantity,
          productId,
          sellerId: product.seller._id
        },
        { withCredentials: true }
      );
      if(data.success === false){
        toast.error(data.message);
        console.log(data.message);
        return;
      }
      toast.success(data.message);
      navigate('/me')
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Order failed");
    }
  };

  if (loading) return <div className="min-h-screen pt-20"><Loader/></div>
  if (!product) return <p className="text-2xl text-center mt-28 text-red-500 min-h-screen">Product not found!</p>;

  const shippingPrice = 0;
  const totalPrice = (product.price * quantity + shippingPrice).toFixed(2);

  return (
    <div className="flex flex-col min-h-screen mt-20 md:w-[85%] mx-auto px-4">
      <div onSubmit={handleOrder} className="flex flex-col md:flex-row gap-6">
        <ContactForm
          shippingInfo={shippingInfo}
          handleChange={handleChange}
          loading={loading}
        />
        <OrderInfo
          name={product.name}
          itemPrice={product.price}
          shippingPrice={shippingPrice}
          totalPrice={totalPrice}
          quantity={quantity}
          setQuantity={setQuantity}
          handleOrder={handleOrder}
          loading={loading}
        />
      </div>
      
    </div>
  );
};

export default Order;
