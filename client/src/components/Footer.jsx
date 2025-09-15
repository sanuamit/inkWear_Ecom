// client/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-G.png"; // Import PNG logo

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
          {/* Brand & About */}
          <div>
            <Link to="/" className="flex items-center mb-4 group">
              <img
                src={logo}
                alt="InkWear"
                className="h-14 object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ maxHeight: "100px", width: "auto" }}
              />
              <span className="text-2xl font-bold text-white ml-3 tracking-wide group-hover:text-pink-400 transition-colors">
                𝐼𝓃𝓀𝒲𝑒𝒶𝓇
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              InkWear is your one-stop destination for trendy, customizable
              printed apparel. Express your style with premium quality prints.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-pink-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-pink-400 transition-colors">Products</Link></li>
              <li><Link to="/design-uploader" className="hover:text-pink-400 transition-colors">Upload Design</Link></li>
              <li><Link to="/cart" className="hover:text-pink-400 transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/order-tracking" className="hover:text-pink-400 transition-colors">Order Tracking</Link></li>
              <li><Link to="/order-history" className="hover:text-pink-400 transition-colors">Order History</Link></li>
              <li><Link to="/profile" className="hover:text-pink-400 transition-colors">My Account</Link></li>
              <li><Link to="/contact" className="hover:text-pink-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-3">Newsletter</h3>
            <p className="text-sm mb-4 text-gray-400">
              Subscribe to get the latest updates and offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row sm:items-center"
            >
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full sm:w-auto sm:flex-1 mb-2 sm:mb-0"
              />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md text-white text-sm font-medium sm:ml-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-5">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} InkWear. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-3 sm:mt-0 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
