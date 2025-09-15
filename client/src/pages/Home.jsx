// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { getProducts } from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ✅ Make sure products is always an array in UI logic
  const safeProducts = Array.isArray(products) ? products : [];

  const categories = [
    "all",
    ...Array.from(
      new Set(safeProducts.map((p) => p.category).filter(Boolean))
    ),
  ];

  const filtered = safeProducts.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesQuery =
      query.trim() === "" ||
      p.name?.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner / Hero */}
      <section
        className="relative h-64 md:h-96 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(/src/assets/banner-4.png)`,
        }}
      >
        <div className="bg-black bg-opacity-40 w-full h-full absolute inset-0" />
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              InkWear — Make it yours.
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-200">
              Custom tees, hoodies & merch printed with love. Upload your
              design or choose from curated styles.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/products"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-lg shadow"
              >
                Shop Now
              </Link>
              <Link
                to="/design-uploader"
                className="inline-block bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-lg"
              >
                Upload Design
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <div className="container mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-80 border rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border transition ${
                  category === cat
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat === "all" ? "All" : capitalize(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Featured / Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link to="/products" className="text-pink-600 hover:underline">
            View all
          </Link>
        </div>

        {isError ? (
          <div className="text-center text-red-500">{message}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default Home;
