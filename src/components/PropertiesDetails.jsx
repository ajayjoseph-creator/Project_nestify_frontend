import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyById, clearProperty } from "../features/properties/singlePropertySlice";
import { FiPhone } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { property, loading, error } = useSelector((state) => state.singleProperty);

  useEffect(() => {
    dispatch(fetchPropertyById(id));

    return () => {
      dispatch(clearProperty());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center mt-24 text-xl font-semibold">
        Loading property details...
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="text-center mt-24 text-xl font-semibold text-red-600">
        {error || "No active subscription plan"}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24 relative">
      <h1 className="text-3xl font-bold">
        {property.type} In {property.place}
      </h1>
      <p className="text-blue-600 text-xl mt-2">₹{property.price}</p>

      {/* 🔥 Property Status Badge */}
<p
  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium 
    ${
      property.status === "available"
        ? "bg-green-900 text-white"
        : property.status === "booked"
        ? "bg-yellow-900 text-white"
        : property.status === "confirmed"
        ? "bg-blue-100 text-blue-700"
        : "bg-red-100 text-red-700"
    }`}
>
  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
</p>


      {/* Owner Info */}
      {property.owner && (
        <div
          className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md flex items-center gap-4 cursor-pointer"
          onClick={() => navigate(`/profile/${property.owner._id}`)}
        >
          <img
            src={property.owner.profileImage || "/default.png"}
            alt="owner"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-lg">{property.owner.name}</p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <FiPhone size={16} />
              {property.owner.phone}
            </p>
          </div>
        </div>
      )}

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {property.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`img-${idx}`}
            className="rounded-lg h-48 object-cover w-full"
          />
        ))}
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 mt-10 text-center gap-4 text-sm">
        <div>
          <strong>{property.bhk}</strong>
          <br />
          Bedrooms
        </div>
        <div>
          <strong>{property.bathrooms}</strong>
          <br />
          Bathrooms
        </div>
        <div>
          <strong>{property.parking}</strong>
          <br />
          Parking
        </div>
        <div>
          <strong>{property.size} sqft</strong>
          <br />
          Size
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h3 className="font-semibold text-lg">Description</h3>
        <p className="text-gray-600 mt-2">{property.description}</p>
      </div>

      {/* Floor Plan */}
      {property.floorPlan && (
        <div className="mt-10">
          <h3 className="font-semibold text-lg">Floor Plan</h3>
          <img
            src={property.floorPlan}
            alt="floor"
            className="rounded-lg mt-2 max-h-[400px]"
          />
        </div>
      )}

      {/* Map */}
      {property.coordinates && (
        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-2">Map Location</h3>
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              parseFloat(property.coordinates.lng) - 0.001
            }%2C${
              parseFloat(property.coordinates.lat) - 0.001
            }%2C${
              parseFloat(property.coordinates.lng) + 0.001
            }%2C${
              parseFloat(property.coordinates.lat) + 0.001
            }&layer=mapnik&marker=${parseFloat(
              property.coordinates.lat
            )},${parseFloat(property.coordinates.lng)}`}
            width="100%"
            height="300"
            className="rounded-lg border"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
