import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { toast } from "react-hot-toast";
import img from "../../assets/loginImg.png";

const Signup = () => {
  const { role } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    storeName: "",
    storeDescription: "",
    storeAddress: "",
    gstNumber: "",
    businessType: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(signInStart());
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/register`,
        role === "seller"
          ? { ...formData, role }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              phone: formData.phone,
              role,
            },
        { withCredentials: true }
      );

      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message));
        toast.error(response.data.message);
        return;
      }

      dispatch(signInSuccess(response.data.user));
      toast.success("Signup Successful");
      navigate(role === "seller" ? "/seller/product" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
      dispatch(
        signInFailure(err.response?.data?.message || "An error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center justify-center bg-white gap-3 p-4 md:p-8 rounded-lg md:shadow-sm w-[700px] md:w-[900px] h-screen md:h-[500px]">
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 pt-16 md:pt-0 text-center text-blue-700">
            {role === "seller" ? "Seller Signup" : "User Signup"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className={`flex flex-col ${role === "seller" && "md:flex-row"} gap-2`}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full md:max-w-80 px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                required
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone No"
                value={formData.phone}
                onChange={handleChange}
                className="w-full md:max-w-80  px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                required
              />
            </div>

            <div className={`flex flex-col ${role === "seller" && "md:flex-row"} gap-2`}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full md:max-w-80  px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full md:max-w-80  px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                required
              />
            </div>

            {role === "seller" && (
              <>
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    name="storeName"
                    placeholder="Store Name"
                    value={formData.storeName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                    required
                  />
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                    required
                  >
                    <option value="">Select Business Type</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    name="storeAddress"
                    placeholder="Store Address"
                    value={formData.storeAddress}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                    required
                  />
                </div>

                <textarea
                  name="storeDescription"
                  placeholder="Store Description"
                  value={formData.storeDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg mb-3 focus:outline-none"
                  required
                />
              </>
            )}
            <button
              type="submit"
              className="w-full md:max-w-80  bg-gradient-to-r from-blue-600 to-blue-700 font-bold text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <p className="text-black mt-3 text-sm">Already have an account? <Link to='/login' className="text-blue-500 font-semibold">Login</Link></p>
          {role==="user" ? <p className="text-black mt-3 text-sm">Signup As Seller? <Link to='/signup/seller' className="text-blue-500 font-semibold">Signup Seller</Link></p> : <p className="text-black mt-3 text-sm">Signup As User? <Link to='/signup/user' className="text-blue-500 font-semibold pb-10 md:pb-0">Signup User</Link></p>}
          </form>
          
          
        </div>
        <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-100 rounded-r-xl">
          <img src={img} alt="Signup" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
