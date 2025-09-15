//src/pages/ProductList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load products. {message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Collection</h1>

      {products && products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
