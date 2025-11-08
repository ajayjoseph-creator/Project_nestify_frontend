import React, { useEffect } from "react";
import { FaBed, FaBath, FaRulerCombined, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GlitchText from "./ui/Glitch";
import { fetchFeaturedProperties } from "../features/properties/propertySlice";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedProperties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    featuredProperties: properties,
    loading,
    error,
  } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(fetchFeaturedProperties());
  }, [dispatch]);

  const handleProperty = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="px-4 py-10 bg-[#f5f7fa] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          <span className="border-b-4 border-red-500 inline-block">
            <GlitchText text="Featured" />
          </span>{" "}
          Properties
        </h2>
        <button
          onClick={() => navigate("/allProperties")}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md font-medium transition"
        >
          View All Property
        </button>
      </div>

      {/* 🔁 Loading / Error States */}
      {loading && (
         <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* 🏠 Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop, idx) => (
          <div
            onClick={() => handleProperty(prop._id)}
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
          >
            <img
              src={prop.images?.[0]}
              alt="property"
              className="w-full h-56 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="font-semibold text-md text-gray-800">
                {prop.place || "Unknown Location"}
              </h3>
              <p className="text-sm text-gray-500">Home For Sale</p>
              <p className="text-blue-600 font-bold text-lg">
                ₹{prop.price || "0"}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600 pt-2">
                <div className="flex items-center gap-1">
                  <FaBed className="text-gray-500" />
                  {prop.bhk || 0}
                </div>
                <div className="flex items-center gap-1">
                  <FaBath className="text-gray-500" />
                  {prop.bathrooms || 0}
                </div>
                <div className="flex items-center gap-1">
                  <FaRulerCombined className="text-gray-500" />
                  {prop.size || 0} sqft
                </div>




                <div className="flex items-center gap-2">
                  <FaInfoCircle className="text-gray-500" />
                  <span>Status:</span>
                  {/* 🔽 Insert the badge here */}
                  {/** 👆👆 👇👇 **/}
                  <span
                    className={`
      px-2 py-1 text-xs font-semibold rounded-full
      ${
        prop.status === "available"
          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
          : prop.status === "booked"
          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
          : prop.status === "confirmed"
          ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
          : prop.status === "sold"
          ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      }
    `}
                  >
                    {prop.status || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-10">
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded border border-purple-300 text-purple-600 hover:bg-purple-100">
            1
          </button>
          <button className="w-8 h-8 rounded border border-purple-300 text-purple-600 hover:bg-purple-100">
            2
          </button>
          <button className="w-8 h-8 rounded border border-purple-300 text-purple-600 hover:bg-purple-100">
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
