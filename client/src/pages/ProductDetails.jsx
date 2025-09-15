//src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import Loader from "../components/Loader";
import formatPrice from "../utils/formatPrice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load product. {message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {product && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.brand}</p>
            <p className="text-2xl font-semibold text-pink-600 mb-4">
              ₹{formatPrice(product.price)}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Stock & Quantity */}
            {product.countInStock > 0 ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <label htmlFor="qty" className="font-medium">
                    Qty:
                  </label>
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="border px-2 py-1 rounded-lg"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg w-full"
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <p className="text-red-500 font-semibold">Out of Stock</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
