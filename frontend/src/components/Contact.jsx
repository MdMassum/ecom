import { FaInstagram, FaFacebookF, FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

import contact from "../assets/contact1.png";
import bgImage from "../assets/4.png";

const Contact = () => {
  return (

    <div
      id="contactUs"
      className="relative w-full md:pl-28 flex flex-col md:flex-row mx-auto p-5 items-center justify-between md:gap-0 gap-3 md:py-6 overflow-hidden min-h-[667px] md:min-h-screen"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center z-0">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Contact Image Section */}
      <div className="relative flex items-center justify-center w-92 md:min-w-[550px]">
        <img src={contact} alt="Contact" className="w-full" />
      </div>

      {/* Contact Details Section */}
      <div className="relative md:ml-28 z-10 flex flex-col w-full text-blue-900 text-left">
        <div className="w-full flex items-center mb-7 md:mb-12">
          <div className="flex flex-row md:flex-col tracking-wider items-center justify-center md:justify-start gap-2 md:gap-0 font-bold">
            <h2 className="text-6xl md:text-8xl text-left md:-ml-8 md:text-stroke">Get in</h2>
            <h2 className="text-6xl md:text-8xl md:text-stroke md:-mt-3">touch!</h2>
          </div>
        </div>

        {/* Contact Links */}
        <div className="space-y-3 text-gray-500">
          <a
            href="https://www.instagram.com/axis_international_exports/"
            target="_blank"
            className="flex items-center space-x-4 cursor-pointer"
          >
            <FaInstagram className="text-pink-500 text-3xl md:text-4xl" />
            <span className="font-bold text-lg md:text-2xl">vocal_for_local</span>
          </a>
          <a
            href="https://www.facebook.com/people/Axis-International-Exports/61573413671024/"
            target="_blank"
            className="flex items-center space-x-4 cursor-pointer"
          >
            <FaFacebookF className="text-blue-500 text-3xl md:text-4xl" />
            <span className="font-bold text-lg md:text-2xl">Vocal For Local</span>
          </a>
          <a
            href="https://wa.me/910000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 cursor-pointer"
          >
            <FaWhatsapp className="text-green-500 text-3xl md:text-4xl" />
            <span className="font-bold text-lg md:text-2xl">+91 000000000</span>
          </a>
          <a
            href="mailto:info@axisinternationalexports.com"
            className="flex items-center space-x-4 cursor-pointer"
          >
            <MdAttachEmail className="text-blue-500 text-3xl md:text-4xl" />
            <span className="font-bold text-lg md:text-2xl">info@orgs.com</span>
          </a>
          <a
            href="tel:+910000000000"
            className="flex items-center space-x-4 cursor-pointer"
          >
            <FaPhone className="text-gray-500 text-3xl md:text-4xl" />
            <span className="font-bold text-lg md:text-2xl">+91 000000000</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
