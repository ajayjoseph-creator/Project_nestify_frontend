// PremiumModal.jsx

import React from "react";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PremiumModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl border border-blue-300"
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 text-xl"
        >
          <IoClose />
        </button>

        {/* 👑 Icon + Title */}
        <div className="flex flex-col items-center text-center gap-4">
          <FaCrown className="text-blue-600 text-4xl" />
          <h2 className="text-2xl font-bold text-zinc-800">Upgrade to Premium</h2>
          <p className="text-sm text-zinc-600">
            Experience the best we have to offer — ad-free and unlimited.
          </p>
        </div>

        {/* 🚀 Select Plan Button */}
        <button
          onClick={() => {
            onClose();
            navigate("/subscription");
          }}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold shadow-md transition"
        >
          Select Plan
        </button>
      </motion.div>
    </div>
  );
};

export default PremiumModal;
