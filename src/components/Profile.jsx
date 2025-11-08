import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaComments,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubscriptionStatus from "./SubscriptionStatus";
import PremiumModal from "./PremiumModal"; // ✅ Import Modal

import {
  fetchUserProfile,
  fetchUserProperties,
  updateUserProfile,
  deleteProperty,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, properties, loading } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [localData, setLocalData] = useState({
    name: "",
    phone: "",
    place: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile()).then((res) => {
      if (res.payload?._id) {
        dispatch(fetchUserProperties(res.payload._id));
        setLocalData({
          name: res.payload.name,
          phone: res.payload.phone,
          place: res.payload.place,
        });
      }
    });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", localData.name);
    formData.append("phone", localData.phone);
    formData.append("place", localData.place);
    if (imageFile) formData.append("profileImage", imageFile);

    dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => {
        toast.success("Profile updated");
        setIsEditing(false);
      })
      .catch((err) => {
        toast.error(err || "Update failed");
      });
  };

  const handleEditClick = () => {
    const sub = profile?.subscription;
    const isSubscribed =
      sub?.active &&
      (!sub?.nextBillingDate || new Date() < new Date(sub.nextBillingDate));

    if (!isSubscribed) {
      setShowModal(true); // 🚫 Subscribed alla → Modal open
      return;
    }

    if (isEditing) handleSave();
    else setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProperty(id))
      .unwrap()
      .then(() => toast.success("Property deleted"))
      .catch(() => toast.error("Delete failed"));
  };

  if (loading || !profile) {
    return <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 mt-24">
      {/* 🔥 Premium Modal */}
      <PremiumModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 text-center lg:col-span-3"
        >
          <label htmlFor="profileImageInput" className="cursor-pointer block">
            <div className="h-28 w-28 mx-auto rounded-full overflow-hidden border-4 border-blue-500 bg-gray-100">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser size={48} className="text-gray-500 m-auto mt-8" />
              )}
            </div>
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files[0])}
            disabled={!isEditing}
          />
          <h2 className="text-lg font-semibold mt-4">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.place}</p>
          <div className="mt-6 space-y-2 text-left text-sm">
            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-500" />
              +91 {profile.phone}
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-500" />
              {profile.email}
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-green-600" />
              {profile.place}
            </div>
          </div>
          <button className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition">
            <FaComments /> Chat
          </button>
        </motion.div>

        {/* Main Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-9 bg-white rounded-xl shadow-md p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Profile Details</h2>
            <button
              onClick={handleEditClick}
              className={`text-sm px-4 py-1 rounded-md shadow ${
                isEditing
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isEditing ? "Save Changes" : "Edit"}
            </button>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={localData.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="p-2 bg-gray-100 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              name="phone"
              value={localData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
            <input
              type="text"
              name="place"
              value={localData.place}
              onChange={handleChange}
              placeholder="Place"
              className="p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </form>
        </motion.div>
      </div>

      {/* Subscription Status */}
      <div className="max-w-6xl mx-auto mt-8">
        <SubscriptionStatus subscription={profile.subscription} />
      </div>

      {/* My Properties */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10"
      >
        <h2 className="text-lg font-semibold mb-4">My Properties</h2>
        {properties.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
            {properties.map((prop) => (
              <div
                key={prop._id}
                className="min-w-[250px] max-w-[250px] rounded-xl overflow-hidden border shadow hover:shadow-lg transition bg-white"
              >
                <img
                  src={prop.images?.[0] || "/house-placeholder.jpg"}
                  alt={prop.place}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-bold text-sm">{prop.place}</h3>
                  <p className="text-xs text-gray-500">₹{prop.price}</p>
                  <p className="text-xs text-gray-400">{prop.type}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => navigate(`/property/edit/${prop._id}`)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prop._id)}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      <FaTrashAlt className="inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No properties added yet.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
