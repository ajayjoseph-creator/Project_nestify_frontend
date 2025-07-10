import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    place: "",
    price: "",
    size: "",
    type: "",
    bhk: "",
    bathrooms: "",
    parking: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axiosInstance
      .get(`/property/property/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        toast.error("Failed to fetch property");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/property/${id}`, formData)
      .then(() => {
        toast.success("Property updated");
        navigate("/profile");
      })
      .catch(() => toast.error("Update failed"));
  };

  // No change to logic — only styles updated

return (
  <div className="min-h-screen mt-24 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 px-4">
    <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-10 border border-blue-100">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow">
        ✏️ Edit Property
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Place", name: "place" },
          { label: "Price", name: "price" },
          { label: "Size (sqft)", name: "size" },
          { label: "Type", name: "type" },
          { label: "BHK", name: "bhk" },
          { label: "Bathrooms", name: "bathrooms" },
          { label: "Parking", name: "parking" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder:text-blue-500"
              placeholder={`Enter ${field.label}`}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-blue-900 mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 resize-none"
            placeholder="Enter property description..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-blue-900 mb-2">Status</label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
          >
            <option value="">Select Status</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md"
          >
            🚀 Update Property
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default EditProperty;
