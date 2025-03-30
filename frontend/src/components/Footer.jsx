import { HashLink } from "react-router-hash-link";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaExternalLinkAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { MdOutlineCategory, MdLogin } from "react-icons/md";
import { HiOutlineHome, HiOutlineMail } from "react-icons/hi";
import skillancer from "../assets/skillancer.png";

export default function Footer() {
  const quickLinks = [
    { label: "HOME", href: "#home", icon: <HiOutlineHome /> },
    { label: "ABOUT US", href: "#aboutUs", icon: <FaMapMarkerAlt /> },
    { label: "PRODUCTS", href: "#product", icon: <MdOutlineCategory /> },
    { label: "CONTACT US", href: "#contactUs", icon: <HiOutlineMail /> },
    // { label: "ENQUIRY", href: "/enquiry", icon: <HiOutlineMail /> },
    // { label: "ADMIN LOGIN", href: "/admin/login", icon: <MdLogin /> },
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10 px-5 md:px-12 lg:px-24">
      <div className="grid md:grid-cols-3 md:gap-48 lg:gap-56">
        {/* First Column - Address */}
        <div className="flex flex-col space-y-2 md:min-w-88 lg:min-w-96">
          <h3 className="font-bold text-2xl">Contact Us</h3>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-xl" />
            <div>
              <p className="text-sm">
                Shop No 8 (1st floor), Gayatri Market, Jhokan Bagh,
              </p>
              <p className="text-sm">Jhansi, UP, India 284001</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-xl" />
            <p className="text-sm">info@localforvoal.com</p>
          </div>
          <div className="flex items-center space-x-2 mt-1 md:mt-2">
            <FaPhone className="text-xl" />
            <p className="text-sm">+91 12345678</p>
          </div>
        </div>

        {/* Second Column - Quick Links */}
        <div className="flex flex-col md:ml-10 mt-8 md:mt-0">
          <h3 className="font-bold text-2xl min-w-36">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            {quickLinks.map((link, index) => (
              <li key={index} className="flex items-center space-x-2 min-w-36">
                {link.href.startsWith("#") ? (
                  <HashLink
                    smooth
                    to={`/${link.href}`}
                    className="hover:underline flex items-center space-x-2 transition duration-300 hover:text-gray-300"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </HashLink>
                ) : (
                  <a
                    href={link.href}
                    className="hover:underline flex items-center space-x-2 transition duration-300 hover:text-gray-300"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Third Column - Developer Credit and Social Media */}
        <div className="flex flex-col items-start mt-8 md:mt-0">
          <h3 className="font-bold text-2xl min-w-36">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaInstagram className="text-xl" />
            </a>
          </div>

          <a
            href="https://skillancer.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start cursor-pointer space-y-2 mt-8 md:mt-6"
          >
            <p className="flex items-center space-x-2 min-w-36">
              Developed By <FaExternalLinkAlt className="text-sm ml-1" />
            </p>
            <img src={skillancer} alt="Skillancer Logo" className="h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
