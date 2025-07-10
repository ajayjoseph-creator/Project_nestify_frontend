import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FaBoxOpen, FaSearch } from "react-icons/fa";

const Products = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProperties = async () => {
    try {
      const res = await axiosInstance.get("/admin/property", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch properties", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filtered = properties.filter((p) =>
    p?.place?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white dark:bg-[#121212] min-h-screen">
      <div className="flex justify-between items-center mb-6 text-white">
        <div className="flex items-center gap-2">
          <FaBoxOpen />
          <h1 className="text-xl font-semibold">Property List</h1>
        </div>
        <div className="relative">
          <input
            type="text"
            className="pl-10 pr-4 py-2 rounded bg-gray-100 dark:bg-[#1e1e1e] text-gray-700 dark:text-white focus:outline-none"
            placeholder="Search by place..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      <div className="overflow-x-auto rounded shadow">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-6">
            No properties found.
          </p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-[#2a2a2a]">
              <tr>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Place</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Size</th>
                <th className="py-2 px-4">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((property) => (
                <tr key={property._id} className="border-b dark:border-[#333]">
                  <td className="py-2 px-4">
                    <img
                      src={
                        property.image ||
                        property.images?.[0] ||
                        "https://via.placeholder.com/80"
                      }
                      alt={property.place || "Property"}
                      className="w-20 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{property.place}</td>
                  <td className="py-2 px-4">₹{property.price}</td>
                  <td className="py-2 px-4">{property.size}</td>
                  <td className="py-2 px-4 capitalize">{property.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
