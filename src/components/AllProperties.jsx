import React, { useEffect, useState } from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GlitchText from "./ui/Glitch";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProperties } from "../features/properties/propertySlice";

const AllProperties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bhk: "",
    bathrooms: "",
  });

  const [searchInputs, setSearchInputs] = useState({
    beds: "",
    baths: "",
    minPrice: "",
    maxPrice: "",
  });

  const { allProperties: properties, loading, error } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    dispatch(fetchAllProperties(filters));
  }, [filters]);

  const handleClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-32 px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          <span className="inline-block mr-2">All</span>
          <span className="text-blue-600 inline-block">
            <GlitchText text="Properties" />
          </span>
        </h2>

        <div className="flex flex-col items-center sm:flex-row sm:items-end gap-3 w-full sm:w-auto justify-center">
          <div className="flex flex-wrap gap-3">
            {[
              { placeholder: "Beds (min)", key: "beds", type: "number" },
              { placeholder: "Baths (min)", key: "baths", type: "number" },
              { placeholder: "Min Price", key: "minPrice", type: "number" },
              { placeholder: "Max Price", key: "maxPrice", type: "number" },
            ].map((input) => (
              <input
                key={input.key}
                type={input.type}
                placeholder={input.placeholder}
                value={searchInputs[input.key]}
                onChange={(e) =>
                  setSearchInputs({
                    ...searchInputs,
                    [input.key]: e.target.value,
                  })
                }
                className="border border-blue-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
            <button
              className="bg-blue-600 text-white font-medium rounded px-5 py-2 text-sm hover:bg-blue-700 transition"
              onClick={() => {
                setFilters({
                  bhk: searchInputs.beds,
                  bathrooms: searchInputs.baths,
                  minPrice: searchInputs.minPrice,
                  maxPrice: searchInputs.maxPrice,
                });
              }}
            >
              🔍 Search
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 sm:mt-0">
            * Filters show properties with equal or more beds/baths
          </p>
        </div>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(prop._id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden cursor-pointer border border-gray-100"
            >
              <div className="relative">
                <img
                  src={prop.images?.[0]}
                  alt="property"
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  For Sale
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">
                  {prop.title || "High-Rise Townhouse"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {prop.place || "Location unavailable"}
                </p>
                <div className="flex items-center text-sm text-gray-600 gap-4 py-2">
                  <span className="flex items-center gap-1">
                    <FaBed /> {prop.bhk}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBath /> {prop.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRulerCombined /> {prop.size} sqft
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-bold text-xl">
                    ₹{prop.price}
                  </span>
                  <button className="text-blue-600 border border-blue-300 px-4 py-1 rounded-md text-sm hover:bg-blue-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;
