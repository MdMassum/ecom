import React, { useState } from "react";
import bgImage from '../../../assets/4.png';
import img2 from '../../../assets/5.png';
import woman from '../../../assets/woman.png';
import {useNavigate} from 'react-router-dom'
import { FiSearch } from "react-icons/fi";

function SearchSection() {
    const[search, setSearch] = useState("");
    const navigate = useNavigate()
    console.log(search)
  return (
    <div id="aboutUs" className="w-full relative min-h-screen md:min-h-screen overflow-hidden flex  text-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Heading */}
      <div className="z-50 flex justify-center text-center text-blue-900 font-bold text-2xl md:text-4xl lg:text-5xl pt-10 w-full">
        <p className="md:w-[80%]">400+ <span className="text-orange-500 text-stroke">IND</span><span className="text-green-500 text-stroke">IAN</span> PRODUCTS ON YOUR FINGERTIPS</p>
        {/* <p>FINGERTIPS</p> */}
      </div>

      {/* Search Bar Section */}
      <div className="absolute top-44 w-[95%] md:top-[45%] md:right-56 md:w-[40%] flex ml-3 gap-3 z-50">
        <div className="bg-blue-700/20 w-full px-4 py-2 md:py-3 rounded-full border border-blue-900">
        <input 
          onChange={(e)=>setSearch(e.target.value)}
          type="text" 
          id="search"
          value={search}
          placeholder="Search here....." 
          className="w-full bg-transparent outline-none text-black text-lg px-2"
        />
        </div>
        
        <button 
        onClick={()=>navigate(`/search?searchKey=${search}`)}
        className="bg-blue-900 text-white px-8 py-2 rounded-full text-xl font-semibold cursor-pointer hover:bg-blue-950">Search</button>
      </div>

      {/* Woman Illustration */}
      <div className="absolute bottom-0 left-4 md:left-12 w-full md:w-[32%] z-50">
        <img src={woman} alt="Illustration" className="w-full" />
      </div>

      {/* Foreground Image */}
      <div className="absolute bottom-0 w-full">
        <img src={img2} alt="Foreground" className="w-full" />
      </div>
    </div>
  );
}

export default SearchSection;