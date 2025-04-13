import React from "react";
import { FaSpinner } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

function Loader() {
  return (
    <div className="w-full flex justify-center mt-20">
      <FaSpinner className="animate-spin text-4xl text-blue-600" />
    </div>
  );
}

export default Loader;
