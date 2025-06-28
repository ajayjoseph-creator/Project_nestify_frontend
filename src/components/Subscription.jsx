import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  createOrder,
  verifyPayment,
} from '../features/subscription/subscriptionSlice'
import { toast } from "react-toastify";

const plans = [
  {
    title: "1 Month Plan",
    duration: "1 Month",
    price: 299,
    planKey: "monthly",
    features: [
      "Add Unlimited Properties",
      "View Contact Details",
      "Premium Support",
      "Non-refundable",
    ],
  },
  {
    title: "5 Month Plan",
    duration: "5 Months",
    price: 999,
    planKey: "fiveMonths",
    features: [
      "Add Unlimited Properties",
      "View Contact Details",
      "Priority Support",
      "Featured Listing",
      "Non-refundable",
    ],
  },
  {
    title: "1 Year Plan",
    duration: "12 Months",
    price: 2000,
    planKey: "yearly",
    features: [
      "Everything in 5 Month Plan",
      "Top Banner Promotion",
      "Early Feature Access",
      "Non-refundable",
    ],
  },
];

const Subscription = () => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (plan) => {
    const res = await loadRazorpayScript();
    if (!res) return toast.warning("Razorpay SDK failed to load");

    try {
      const orderData = await dispatch(createOrder(plan.planKey)).unwrap();
      const { orderId, amount, keyId } = orderData;

      const options = {
        key: keyId,
        amount,
        currency: "INR",
        name: "Nestify Premium",
        description: `Subscribe to ${plan.title}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            await dispatch(
              verifyPayment({
                response,
                planKey: plan.planKey,
                price: plan.price,
              })
            ).unwrap();

            toast.success("Subscription successful! ✅");
            window.location.href = "/";
          } catch (err) {
            toast.error("Verification failed ❌");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error creating order:", err);
      toast.warning("Something went wrong during order creation.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-blue-800 flex items-center justify-center gap-3"
        >
          <FaCrown className="text-blue-500" /> Choose Your Premium Plan
        </motion.h2>
        <p className="text-gray-500 mt-2">
          Upgrade and unlock powerful features ✨
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`rounded-2xl border-2 p-6 shadow-md text-center transition-all duration-300 cursor-pointer ${
              selected === idx
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
            onClick={() => setSelected(idx)}
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-1">
              {plan.title}
            </h3>
            <p className="text-xl font-medium text-gray-700 mb-4">
              ₹{plan.price}
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-green-500" /> {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition"
            >
              Subscribe Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
