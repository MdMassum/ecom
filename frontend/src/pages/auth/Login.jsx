import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../../assets/loginImg.png";
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import toast from "react-hot-toast";


const Login = () => {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [msg, setmsg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      dispatch(signInStart());

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/login`, {
        email,
        password,
      },{withCredentials:true});
      if(response.data.success === false){
        dispatch(signInFailure(response.data.message))
        toast.error(response.data.message)
        return;
      }
      dispatch(signInSuccess(response.data.user))
      console.log("Login Success:", response.data);
      toast.success("Login Successfull")
      const userRole = response.data.user.role;
      if (userRole === "admin") navigate('/admin/product');
      else if (userRole === "seller") navigate('/seller/product');
      else navigate('/');

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "An error occurred");
      dispatch(signInFailure(err.response?.data?.message))
    } finally {
      setLoading(false);
    }
  };

//   const handleForgotPassword = async () => {
//     if (!email) {
//       setError("Please enter your email.");
//       return;
//     }
  
//     setLoading(true);
//     setError(null);
//     setmsg(null);
  
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/forgot-password`, {
//         email,
//       });
  
//       console.log("Forgot Password Success:", response.data);
//       setmsg("Password reset link sent to your email.");
//       alert("Password reset link sent to your email.");
//     } catch (err) {
//       console.error("Forgot Password Error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "An error occurred while sending the reset link.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center justify-center bg-white gap-3 p-4 md:p-8 rounded-lg shadow-sm w-[700px] md:w-[800px] h-[500px]">
        {isLogin ? <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">WELCOME BACK</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {msg && <p className="text-green-500 text-sm text-center">{msg}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg focus:outline-none"
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 font-bold text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4">
          <p className="text-black text-sm">Don't have an account?</p>
          <div className="flex gap-3 items-center">
          <Link to='/signup/user' className="text-blue-500 font-semibold">Signup as User</Link>
          <span>|</span>
           <Link to='/signup/seller' className="text-blue-500 font-semibold">Signup as Seller</Link>
          </div>
          </div>
           
           {/*
          <p className="mt-2 text-sm text-blue-500 cursor-pointer" onClick={()=>setIsLogin(false)}>Forgot Password</p> */}
          <p className="text-black mt-2 text-sm">Go to <Link to='/' className="text-blue-500 font-semibold">Home Page?</Link></p>
        </div>
        :
          <div className="flex flex-col pr-4 mb-4 min-w-40">
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <label className="block text-gray-700 text-sm font-semibold mb-1 w-full pl-1" htmlFor="username">Enter Your Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 mb-7 py-2 text-gray-700 border bg-transparent rounded-lg focus:outline-none"
              placeholder="Enter your email"
              required
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center" onClick={handleForgotPassword}>{loading ? "Sending..." : "Send Link"}</button>
            <p className="mt-2 text-sm text-blue-500 cursor-pointer" onClick={()=>setIsLogin(true)}>Go to Login Page ?</p>
          </div>
        }
        <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-100 rounded-r-xl">
          <img src={img} alt="Placeholder" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
