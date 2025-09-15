// client/src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../features/auth/authSlice";
import logo from "../assets/logo-G.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const cartCount =
    cart?.items?.reduce((sum, it) => sum + (it.qty || 1), 0) || 0;
  const user = auth?.user || null;

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Logo"
              className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              𝐼𝓃𝓀𝒲𝑒𝒶𝓇
            </span>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-1 md:gap-6">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/design-uploader", label: "Upload Design" },
              ...(user?.isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-all duration-200
                  ${isActive ? "text-pink-600 dark:text-pink-400" : "text-gray-700 dark:text-gray-300 hover:text-pink-500"}
                  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center relative">
              <input
                type="search"
                placeholder="Search products..."
                className="pl-9 pr-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = e.target.value.trim();
                    if (q)
                      navigate(`/products?search=${encodeURIComponent(q)}`);
                  }
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-2 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                />
              </svg>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-pink-600 rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center text-sm font-medium text-white shadow">
                    {user.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                  </div>
                  <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-200">
                    {user.name}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 shadow"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 space-y-2 animate-slideDown">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/design-uploader", label: "Upload Design" },
              ...(user?.isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
