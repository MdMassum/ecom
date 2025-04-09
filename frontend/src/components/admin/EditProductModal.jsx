import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { categories } from "./AddProductModal";


function EditProductModal({ product, onClose, setProducts }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category || "Other",
    stock: product.stock,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/${product._id}`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === product._id ? { ...p, ...formData } : p
          )
        );
        onClose();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error?.response?.data?.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Name"
            required
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Description"
          />
          <div className="flex md:gap-2 flex-col md:flex-row justify-between ">
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Price"
                required
              />
            </div>

            <div>
              <label htmlFor="stock">Stock:</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Stock"
                required
              />
            </div>
          </div>

          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
