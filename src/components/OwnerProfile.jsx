import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHome,
  FaUserShield,
  FaRegPaperPlane,
} from "react-icons/fa";
import moment from "moment";
import ChatRoomModal from "../components/ChatRoomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOwnerById,
  fetchOwnerProperties,
} from "../features/owner/ownerSlice";
import LoadingSpinner from "./LoadingSpinner";

const OwnerProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentUserId = localStorage.getItem("userId");

  const { owner, properties, loading, error } = useSelector((state) => state.owner);

  useEffect(() => {
    if (id) {
      dispatch(fetchOwnerById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (owner?._id) {
      dispatch(fetchOwnerProperties(owner._id));
    }
  }, [owner, dispatch]);

  if (loading || !owner) return <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>;;

  const propertyCount = properties.length;
  const subscriptionActive = owner?.subscription?.active;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-12 px-4 mt-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200 relative">
        <div className="text-center">
          <img
            src={owner.profileImage || "/default.png"}
            alt="Owner"
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-pink-400 shadow-md"
          />
          <h2 className="text-3xl font-bold mt-4 text-gray-800">{owner.name}</h2>
          <p className="text-sm text-gray-400">@{owner.name?.toLowerCase().replace(/\s+/g, "_")}</p>

          <button
            onClick={() => setIsChatOpen(true)}
            className="absolute top-4 right-4 inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-pink-600 transition"
          >
            <FaRegPaperPlane /> Message
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2 justify-center">
            <FaPhone className="text-blue-500" /> +91 {owner.phone}
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FaEnvelope className="text-red-400" /> {owner.email}
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FaMapMarkerAlt className="text-green-500" /> {owner.place}
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FaHome className="text-yellow-600" /> {propertyCount} Properties
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FaUserShield className={subscriptionActive ? "text-green-600" : "text-gray-500"} />
            {subscriptionActive ? "Premium Member" : "Free User"}
          </div>
          <div className="text-center text-gray-500 col-span-2 md:col-span-1">
            Joined: {moment(owner.createdAt).format("MMM Do, YYYY")}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Posts by @{owner.name?.toLowerCase().replace(/\s+/g, "_")}
        </h3>

        {properties.length === 0 ? (
          <p className="text-gray-500">No properties posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white border border-gray-100 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <img
                  src={property.images?.[0] || "/house-placeholder.jpg"}
                  alt={property.place}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h4 className="text-lg font-semibold text-gray-800">{property.place}</h4>
                  <p className="text-sm text-gray-500">
                    ₹ {property.price} | {property.type}
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <Link
                      to={`/property/${property._id}`}
                      className="text-sm text-indigo-600 font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ChatRoomModal
        isOpen={isChatOpen}
        senderId={currentUserId}
        receiverId={owner._id}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default OwnerProfile;
