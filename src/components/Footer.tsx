import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 mt-20 border-t-2 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Income Calculator</h3>
            <p className="text-gray-400">
              Empowering businesses with smart financial solutions and accurate tax calculations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-300 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">GDPR Compliance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-blue-400" />
                <span>+358449125794</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-400" />
                <span>eliasars@yahoo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Helsinki, Finland</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Income Calculator. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed with ❤️ by Elias Nahusenay
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;