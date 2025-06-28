import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MapPicker from "./MapPicker";
import PremiumModal from "./PremiumModal";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadProperty,
  resetPropertyUpload,
} from '../features/properties/propertyUploadSlice'
import { toast } from "react-toastify";

const Sell = () => {
  const [coords, setCoords] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSubscribed = localStorage.getItem("subscribed") === "true";
  const token = localStorage.getItem("token");

  const { success } = useSelector((state) => state.propertyUpload);

  const [property, setProperty] = useState({
    place: "",
    price: "",
    size: "",
    type: "Home for Rent",
    id: "",
    year: "",
    phone: "",
    floorPlan: null,
    floorPlanPreview: "",
    description: "",
    bhk: "",
    bathrooms: "",
    parking: "",
    images: [],
  });

  useEffect(() => {
    if (success) {
      dispatch(resetPropertyUpload());
      toast.success("Property uploaded successfully!");
      navigate("/");
    }
  }, [success]);

  const inputStyle =
    "w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-2xl px-4 py-3 text-sm placeholder-gray-400 shadow-sm transition-all duration-300";

  const fetchPlaceName = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const placeName = res.data.display_name;
      setProperty((prev) => ({ ...prev, place: placeName }));
    } catch (err) {
      console.error("Failed to fetch place name", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setProperty((prev) => ({
            ...prev,
            images: [...prev.images, ...previews].slice(0, 6),
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFloorPlanUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProperty((prev) => ({
          ...prev,
          floorPlan: file,
          floorPlanPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  const handleSubmit = async () => {
    if (!isSubscribed) {
      setShowModal(true);
      return;
    }

    try {
      const formData = new FormData();

      property.images.forEach((image, index) => {
        const blob = dataURLtoBlob(image);
        formData.append("images", blob, `image${index}.png`);
      });

      if (property.floorPlan) {
        formData.append("floorPlan", property.floorPlan);
      }

      const propertyData = { ...property, coordinates: coords };
      delete propertyData.images;
      delete propertyData.floorPlan;
      delete propertyData.floorPlanPreview;

      formData.append("propertyData", JSON.stringify(propertyData));

      await dispatch(uploadProperty({ formData, token }));
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Error submitting property");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#ffffff] py-20 px-6 mt-24">
      <PremiumModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <motion.div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-[2rem] border border-gray-300 p-10 space-y-12">
        <motion.h2 className="text-4xl font-extrabold text-center text-gray-800">
          Add Your Property Details
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="place" value={property.place} readOnly placeholder="Auto-filled place name" className={inputStyle} />
          <input name="price" value={property.price} onChange={handleChange} placeholder="Price" className={inputStyle} />
          <input name="size" value={property.size} onChange={handleChange} placeholder="Area Size (sqft)" className={inputStyle} />
          <select name="type" value={property.type} onChange={handleChange} className={inputStyle}>
            <option>Home for Rent</option>
            <option>Home for Sale</option>
          </select>
          <input name="id" value={property.id} onChange={handleChange} placeholder="Property ID" className={inputStyle} />
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <input name="year" value={property.year} onChange={handleChange} type="date" className={inputStyle} />
          </div>
          <input name="phone" value={property.phone} onChange={handleChange} placeholder="Mobile Number" className={inputStyle} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input name="bhk" value={property.bhk} onChange={handleChange} placeholder="BHK" className={inputStyle} />
          <input name="bathrooms" value={property.bathrooms} onChange={handleChange} placeholder="Bathrooms" className={inputStyle} />
          <input name="parking" value={property.parking} onChange={handleChange} placeholder="Parking" className={inputStyle} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Add Location on Map</h3>
            <MapPicker
              setCoords={(location) => {
                setCoords(location);
                fetchPlaceName(location.lat, location.lng);
              }}
            />
            {coords && (
              <p className="text-sm mt-2 text-gray-500">
                Selected: Latitude {coords.lat}, Longitude {coords.lng}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Upload Floor Plan</h3>
            <div className="h-56 bg-gray-100 border border-gray-300 rounded-xl shadow-inner flex items-center justify-center">
              {property.floorPlanPreview ? (
                <img src={property.floorPlanPreview} alt="Floor Plan" className="h-full object-contain rounded-xl" />
              ) : (
                <FaPlus className="text-gray-400 text-2xl" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleFloorPlanUpload} className={`${inputStyle} mt-2`} />
            <input type="text" name="description" value={property.description} onChange={handleChange} placeholder="Add Description" className={`${inputStyle} mt-2`} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-700">Upload Property Image</h3>
          <label className="w-48 h-48 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition">
            <FaPlus className="text-2xl text-gray-400 hover:text-blue-600 transition" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" multiple />
          </label>
          <div className="flex flex-wrap gap-4 mt-4">
            {property.images.map((img, idx) => (
              <motion.div
                key={idx}
                className="relative w-32 h-32 overflow-hidden rounded-lg shadow border border-gray-300"
              >
                <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                <button
                  onClick={() =>
                    setProperty((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== idx),
                    }))
                  }
                  className="absolute top-1 right-1 bg-white text-red-500 border border-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white transition"
                  title="Remove image"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-end">
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl font-semibold shadow-xl transition-all duration-300"
          >
            Add Property
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sell;
