import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-dark text-light relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-dark-light opacity-50" />
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo size="small" animated={false} className="text-white" />
            </div>
            <p className="mb-4 text-light/80">
              Your trusted partner for unforgettable travel experiences. We specialize in creating personalized journeys that match your dreams and preferences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-accent hover:text-secondary transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-accent hover:text-secondary transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-accent hover:text-secondary transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-accent hover:text-secondary transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-light/80 hover:text-accent transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations/bali" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Bali, Indonesia
                </Link>
              </li>
              <li>
                <Link href="/destinations/swiss-alps" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Swiss Alps, Switzerland
                </Link>
              </li>
              <li>
                <Link href="/destinations/tokyo" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Tokyo, Japan
                </Link>
              </li>
              <li>
                <Link href="/destinations/santorini" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Santorini, Greece
                </Link>
              </li>
              <li>
                <Link href="/destinations/machu-picchu" className="text-light/80 hover:text-accent transition-colors duration-300">
                  Machu Picchu, Peru
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-accent" />
                <span className="text-light/80">123 Travel Street, Tourism City, TC 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-accent" />
                <span className="text-light/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-accent" />
                <span className="text-light/80">info@travelease.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/10 mt-10 pt-6 text-center text-light/60">
          <p>&copy; {new Date().getFullYear()} Safarnama. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 