// src/pages/admin/ProductManager.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAdmin,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";
import formatPrice from "../../utils/formatPrice";

const ProductManager = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getAllProductsAdmin());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createProduct(newProduct));
    setNewProduct({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });
  };

  const handleUpdate = (id, field, value) => {
    dispatch(updateProduct({ id, updates: { [field]: value } }));
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 text-center mt-4">{message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Product Manager</h1>

      {/* Add Product Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add Product
        </button>
      </form>

      {/* Products Table */}
      {products && products.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">Image</th>
                <th className="py-3 px-4 border-b text-left">Name</th>
                <th className="py-3 px-4 border-b text-left">Price</th>
                <th className="py-3 px-4 border-b text-left">Category</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <input
                      value={p.name}
                      onChange={(e) => handleUpdate(p._id, "name", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) => handleUpdate(p._id, "price", e.target.value)}
                      className="border rounded px-2 py-1 w-full mb-1"
                    />
                    <span className="text-sm text-gray-500">
                      {formatPrice(Number(p.price))}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <input
                      value={p.category}
                      onChange={(e) => handleUpdate(p._id, "category", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="py-3 px-4 border-b space-x-2">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductManager;
