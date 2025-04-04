import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';
import { destinations } from '@/data/destinations';

const Footer = () => {
  // Get featured destinations
  const featuredDestinations = destinations.filter(dest => dest.featured);
  
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
              <a href="#" className="text-yellow-500 hover:text-yellow-600 active:text-yellow-600 transition-colors duration-300 no-focus-outline p-1 rounded">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-yellow-500 hover:text-yellow-600 active:text-yellow-600 transition-colors duration-300 no-focus-outline p-1 rounded">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-yellow-500 hover:text-yellow-600 active:text-yellow-600 transition-colors duration-300 no-focus-outline p-1 rounded">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-yellow-500 hover:text-yellow-600 active:text-yellow-600 transition-colors duration-300 no-focus-outline p-1 rounded">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-600 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline p-1 -m-1 rounded transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-slate-600 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline p-1 -m-1 rounded transition-colors duration-300">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-slate-600 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline p-1 -m-1 rounded transition-colors duration-300">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline p-1 -m-1 rounded transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline p-1 -m-1 rounded transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Featured Destinations</h3>
            <ul className="space-y-2">
              {featuredDestinations.map((destination) => (
                <li key={destination.id}>
                  <Link href={`/packages/${destination.id}`} className="text-slate-600 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline p-1 -m-1 rounded transition-colors duration-300">
                    {destination.name}, {destination.location.split(',')[1]?.trim() || destination.location.split(',')[0]?.trim()}
                  </Link>
                </li>
              ))}
              {featuredDestinations.length < 5 && (
                <li>
                  <Link href="/packages" className="text-slate-600 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline p-1 -m-1 rounded transition-colors duration-300">
                    View All Packages
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-yellow-500" />
                <span className="text-slate-600">358 Travel Street, Phool Nagar Tourism City</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-yellow-500" />
                <span className="text-slate-600">+92 3258894708</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-yellow-500" />
                <span className="text-slate-600">infoSafarnama@gmail.com</span>
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