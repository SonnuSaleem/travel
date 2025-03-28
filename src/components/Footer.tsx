import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-700 relative border-t border-slate-200">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 via-white to-yellow-100/30 opacity-50" />
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo size="small" animated={false} className="text-slate-800" />
            </div>
            <p className="mb-4 text-slate-600">
              Your trusted partner for unforgettable travel experiences. We specialize in creating personalized journeys that match your dreams and preferences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations/bali" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Bali, Indonesia
                </Link>
              </li>
              <li>
                <Link href="/destinations/swiss-alps" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Swiss Alps, Switzerland
                </Link>
              </li>
              <li>
                <Link href="/destinations/tokyo" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Tokyo, Japan
                </Link>
              </li>
              <li>
                <Link href="/destinations/santorini" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Santorini, Greece
                </Link>
              </li>
              <li>
                <Link href="/destinations/machu-picchu" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">
                  Machu Picchu, Peru
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-yellow-500" />
                <span className="text-slate-600">123 Travel Street, Tourism City, TC 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-yellow-500" />
                <span className="text-slate-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-yellow-500" />
                <span className="text-slate-600">info@travelease.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Safarnama. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 