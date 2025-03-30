import React from "react";
import bgImage from "../assets/4.png";
import img2 from "../assets/5.png";
import logo from "../assets/logo-demo1.png";
import man from "../assets/9.png";

function HeroSection() {
  return (
    <div id="home" className="relative w-full min-h-[667px] md:min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-cover bg-center">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute lg:w-[50%] top-0 lg:bottom-0 md:left-8 z-30">
        <img src={logo} alt="" className="w-full" />
      </div>

      <div className="absolute w-[120%] md:w-[60%] lg:w-[45%] bottom-0 -right-10 md:right-12 z-50">
        <img src={man} alt="" className="w-full" />
      </div>

      <div className="absolute bottom-0">
        <img src={img2} alt="" />
      </div>
    </div>
  );
}

export default HeroSection;
